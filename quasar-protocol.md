# Quasar Protocol (QUIC-based Anonymous Secure Attestation Relay)

**Version:** 1.0 (Final Architecture)
**Authors:** P2P Systems Engineer, Lead Networking Architect, Cryptography & QUIC Experts

Quasar is a strict, latency-preserving networking privacy protocol designed for Ethereum attesters. It severs the IP-to-identity link caused by explicit GossipSub subnet subscriptions while maintaining the strict 2-second attestation deadline, protecting against Global Passive Adversaries (GPAs) and DoS attacks.

## 1. Architecture Overview & Onion Routing

Quasar replaces direct, unencrypted GossipSub participation with an Oblivious HTTP (OHTTP) two-hop relay architecture built on pre-warmed QUIC connections. It enforces strict **Stem-and-Fluff** Onion Routing to guarantee that no single entity learns both the validator's IP and their identity.

- **Primary Gateway (The Relay):** Knows the validator's IP. Performs O(1) DoS protection by verifying the cleartext RLN proof. It *cannot* decrypt the attestation payload. To mitigate the O(N) pairing-check compute burden for the Groth16 proofs, the Primary Gateway implements strict connection-level QUIC rate limits.
- **Secondary Gateway (The Injector):** Receives the blinded payload from the Primary Gateway. It knows the payload (the validator's identity) but *not* the validator's IP. It decrypts the attestation and injects it into the public GossipSub network.
- **Aggregator Role:** Aggregators are exempt from this strict privacy routing during their aggregation duties; they must subscribe directly to the explicit GossipSub subnet, temporarily exposing their IP to perform their required P2P role.
- **Identity Layer:** Validators use ZK-PoV (Zero-Knowledge Proof of Validator) combined with RLN (Rate Limiting Nullifiers) to prove active stake without revealing their index to the Primary Gateway.

## 2. Payload Structure & QUIC Transport

To prevent QUIC Datagram fragmentation and head-of-line blocking, the payload strictly adheres to the negotiated `max_datagram_frame_size` (typically bound by the 1280-byte IPv6 MTU). Furthermore, to prevent IP linking during network handovers, clients must strictly enforce QUIC Connection ID (CID) rotation or establish entirely new connections upon IP migration.

**Exact Byte Budget per Quasar Datagram (~948 bytes total):**
*   **IP/UDP/QUIC Headers:** ~80 bytes
*   **Quasar Cleartext Header (For Primary Gateway DoS Protection):**
    *   Session ID (Epoch-specific): 16 bytes
    *   HPKE Encapsulated Key (`enc` / `K_msg`): 32 bytes (Cleartext public input to the RLN proof)
    *   RLN Nullifier: 32 bytes
    *   RLN Proof (Groth16): 192 bytes
    *   Symmetric MAC: 16 bytes (Computed over the ciphertext using a session key established with the Primary Gateway during Pre-Commitment to prevent ciphertext malleability)
    *   *Header Subtotal:* ~288 bytes
*   **Encrypted Payload (HPKE to Secondary Gateway):**
    *   Subnet ID: 2 bytes (The Secondary Gateway must know which subnet to inject the attestation into)
    *   Uncompressed SSZ Attestation: ~480 bytes
    *   Padding (Constant size obfuscation): ~100 bytes
    *   AEAD MAC Tag: 16 bytes
    *   *Payload Subtotal:* ~598 bytes

## 3. Critical Path Compute & Verification Pipeline

Compute is shifted off the critical path to ensure sub-2-second propagation:

1.  **Epoch-Start Pre-Commitment:** Node computes ZK-PoV, opens background connection to the Primary Gateway, and establishes a Session ID and a symmetric MAC session key.
2.  **Continuous Pre-Computation:** Instead of waiting for `t=0s`, the node continuously precomputes all $N$ HPKE encapsulated keys (`K_msg`) and their associated RLN proofs in the background (days/epochs in advance) to avoid MSM bottlenecks.
3.  **Critical Path Execution:** Upon receiving a valid block or reaching `t=4s - max_relay_latency` (to account for the 2-hop relay latency and meet the aggregator deadline), the node signs the SSZ attestation, encrypts it via HPKE to the Secondary Gateway, computes the symmetric MAC, and transmits the QUIC Datagram.
4.  **Primary Gateway DoS Check:** Checks the 32-byte RLN Nullifier against the cache. Verifies the symmetric MAC and the 192-byte Groth16 proof. If valid, forwards to Secondary.
5.  **Secondary Gateway Decryption:** Decrypts payload, validates SSZ attestation, reads the Subnet ID, and injects into the corresponding GossipSub subnet.

## 4. Multi-Validator Volume & Stealth Obfuscation

To defeat ISP volume analysis and timing correlation, Quasar implements **Attestation-Window Chaffing**:

*   **Decoupled Multiplexing:** Multiplexing 64 validators over a single QUIC connection fingerprints the operator. Quasar decouples attestation volume from connection identity by distributing validator traffic across multiple distinct connections.
*   **Congestion Control Maintenance:** Bursting packets after an idle slot will cause the QUIC congestion window (cwnd) to drop or pace them. Nodes implement active dummy traffic (e.g., QUIC ping frames) between slots to keep the cwnd inflated.
*   **Volume Padding:** To protect node operators running multiple validators, the node transmits a mix of real attestations and indistinguishable chaff. While chaffing $N$ packets per slot (every 12s) introduces a significant **32x bandwidth overhead** compared to per-epoch attesting, it is a required trade-off to ensure passive observers see identical packet volumes across all slots, preventing intersection analysis.
*   **RLN Limits:** The RLN circuit supports a configurable `message_limit` bound to the node's staked weight. Enforcing this requires a custom ZK circuit taking `weight` as a public input, preventing false slashing for multi-validator operators.

## 5. Liveness & GossipSub Mesh Maintenance

Liveness trumps privacy in BFT consensus. Quasar utilizes a strict fallback mechanism:

*   **Blind Relay Trust:** You cannot monitor a GossipSub mesh you refuse to join. The originating node must rely blindly on the Quasar relays for attestation propagation. Attempting to monitor the local mesh would compromise privacy guarantees, and introducing a fallback timer pushes propagation dangerously close to the `t=8s` aggregation deadline.
*   **Mesh Health:** The node **never** broadcasts its own attestations in the clear just to maintain peer scores. Peer scoring ($P_1, P_2, P_7$) is maintained exclusively by acting as a good relayer—forwarding other peers' valid attestations through the standard GossipSub mesh.