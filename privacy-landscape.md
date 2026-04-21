# Network privacy landscape survey

## Threat model

To quantify risk of deanonymization or network disruption, we use the formula: **Risk = Damage / Cost**, where **Damage** is the potential impact on the network, and **Cost** is the resources required to execute the attack.

### 1. Damage (Impact Assessment)
Damage describes the systemic impact if a threat scenario is successfully executed. In the context of Ethereum's consensus layer, we categorize damage across the CIA triad:
- **Confidentiality (High Damage):** Deanonymizing a validator (linking IP to Validator Index). This exposes the node to targeted physical coercion, MEV-stealing re-orgs, or network-layer isolation.
- **Integrity (Critical Damage):** Manipulating the attestation routing to split views or censor specific validator sets, fundamentally undermining the Byzantine Fault Tolerance (BFT) consensus.
- **Availability (Medium-High Damage):** Executing Denial of Service (DoS) attacks on specific validators or the broader GossipSub mesh to cause missed slots and lost rewards.

### 2. Cost (Effort and Resources)
The "Cost" represents the operational, economic, and statistical friction an adversary must overcome to execute an attack. By maximizing this cost, we deter all but the most resourced Global Passive Adversaries (GPAs).
- **Statistical Cost (Entropy):** The volume of continuous observations required to shrink the anonymity set to a single node. High-entropy protocols (like decoy traffic) exponentially increase this cost by obscuring "First-to-Hear" timing and volume correlation.
- **Economic Cost:** The capital required to compromise the privacy mechanism, such as Sybiling a mixnet, running thousands of "sentry" nodes across the P2P topology, or staking enough ETH to bias VRF selection.
- **Operational Cost:** The compute, bandwidth, and infrastructure overhead necessary to ingest, store, and correlate global network logs (e.g., cross-referencing ISP traffic with GossipSub traces).

By framing our architectural decisions through this Risk matrix, we can objectively evaluate whether a proposed privacy mechanism (e.g., Dandelion++, OHTTP) introduces sufficient **Cost** to the adversary relative to the **Damage** it mitigates, all while remaining strictly within the 4-second attestation deadline.

### Tradeoffs (Privacy trilemma)

Most networking privacy protocols can only satisfy two of three properties:
1. **Strong Anonymity**: As defined by [Pfitzmann and Hansen (2010)](https://www.maroki.de/pub/verschiedenes/2010_Anon_Terminology_v0.34.pdf), this encompasses **Anonymity** (indistinguishability within a set), **Unlinkability** (attacker cannot distinguish relationship between items of interest), **Undetectability** (attacker cannot tell if an item exists), and **Unobservability** (both anonymous and undetectable).
2. **Low Latency**: real-time propagation
3. **Low Bandwidth**: minimal overhead

## Inventory 

### Techniques

#### OHTTP (IETF)

Oblivious HTTP (RFC 9458) introduces a two-hop proxying architecture designed to separate the knowledge of a client's network identity (IP address) from their requested content. It achieves this by encrypting the HTTP request at the application layer using Hybrid Public Key Encryption (HPKE) with the public key of the final destination (the Target). This encapsulated, encrypted payload is sent to an intermediary (the Relay), which blindly forwards it to the Target. 

##### Attestation Privacy Speculation
Oblivious HTTP relies on a two-hop architecture (client $\rightarrow$ relay $\rightarrow$ gateway $\rightarrow$ target) to decouple the client's IP from the request payload. In the context of Ethereum attestations, a validator could wrap its BLS signature inside an OHTTP request sent to a known public relay, which strips the IP and forwards it to an aggregation gateway. Because OHTTP uses lightweight HPKE (Hybrid Public Key Encryption) and requires only a few network round-trips, the cryptographic overhead is minimal. However, modeling the physical propagation delay is critical: routing an attestation through a geographically disparate Relay-Gateway path introduces roughly ~100-250ms of additional network latency. While this fits within the sub-300ms p90 latency target and remains inside the 4-second slot deadline, it consumes a significant portion of the latency budget before the attestation even enters the broader GossipSub mesh.

#### MASQUE (QUIC standard)
#### Privacy Pass (IETF)
#### Rate Limiting Nullifiers (RLN)
#### FHE (Fully Homomorphic Encryption)
#### Decoy Traffic
#### Distributed Validator Technology (DVT)
