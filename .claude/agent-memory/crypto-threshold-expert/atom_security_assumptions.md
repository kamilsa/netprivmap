---
name: Atom Security Assumptions
description: Security assumptions, known attacks, and threat vectors for each atom A1–A13 in netprivmap
type: project
---

## A1 — ZK-PoV
- Security assumption: DLP hardness in the curve used for the SNARK (e.g., BLS12-381); ROM if Fiat-Shamir heuristic used
- Trusted setup: Groth16 requires per-circuit trusted setup; PLONK is universal; Caulk+ has structured reference string
- Mitigates: Sybil attacks on high-trust meshes (P4), IP-to-identity link (P3)
- Does NOT mitigate: subnet subscription timing leak (AV2/AV11) — hides which validator but not which subnet

## A2 — OHTTP Two-Hop Shuffle
- Security assumption: Relay and Gateway do not collude; encryption via HPKE (X25519, AES-GCM)
- Relay sees originating IP — relay operator is a semi-trusted party
- Vulnerable: relay timing correlation if relay/gateway in same AS (AV7); relay selective drop (AV7, AV15)
- Does NOT mitigate: proposer deanonymization via block-size fingerprinting (AV10)

## A3 — RLN
- Security assumption: DLP hardness for the commitment scheme; Shamir secret sharing for key recovery
- Slashing requires on-chain contract integration; Merkle tree state must be synchronized
- Registration requires stake deposit — raises Sybil cost proportionally
- Open: distributed flooding attacks where many identities each stay below rate limit (AV8)

## A4 — Decoy Traffic Injection
- Burst-flattening only — does NOT provide constant-rate cover traffic (GAP-1)
- A GPA can still correlate first-packet timing even with volumetric obfuscation
- No formal security model or anonymity guarantees — heuristic mitigation only

## A5 — Privacy Pass (RFC 9576)
- Based on blind RSA or blind BLS signatures (IETF VOPRF)
- Issuer-Origin unlinkability under honest issuer; colluding issuer+origin breaks anonymity
- Primarily relevant as a complement to A1 for credential issuance

## A6 — Pre-warmed QUIC/TCP
- Explicitly noted as leaking validator intent (hurts P3): proactive subnet subscription timing
- Static connection sets increase eclipse vulnerability (AV9)
- Conflicts with A18 (VRF peer rotation) — epoch-boundary churn invalidates pre-warmed connections

## A7 — Flashnet
- Security assumption: at most f servers collude (anytrust: any one server honest)
- Critical: clients send shares directly to servers — each server sees originating client IP (AV4, GAP-6)
- TEE-dependent for share confidentiality — TEE compromise (AV5/AV6) breaks anonymity
- Addresses mempool front-running via batch reconstruction timing (AV13)

## A8 — Sphinx Mixnet
- Security assumption: DLP in the Sphinx packet format group (Curve25519); semantic security of the symmetric cipher
- Without constant-rate cover traffic: vulnerable to timing correlation by GPA (GAP-1)
- Sphinx provides payload unlinkability and source hiding per hop; resistant to local adversary
- PSE roadmap target: discv5 and private RPCs — not real-time attestation path (P1 conflict)

## A9 — ZIPNet
- Security assumption: anytrust (any one server honest); TEE provides share confidentiality
- TEE-dependent: SGX side-channels (AV5) can break share confidentiality
- Evolves into A7 (Flashnet): Flashnet improves liveness under server failure
- PVSS complement (A16) would provide cryptographic share verification without TEE

## A10 — TEE-based BuilderNet
- Security assumption: TEE integrity (Intel SGX or AMD SEV-SNP); remote attestation chain
- Broken by: Foreshadow (CVE-2018-3615), CacheOut (CVE-2020-0549), AEPIC Leak (CVE-2022-21233), SGAxe
- Controlled-channel attack (Van Bulck et al., USENIX Sec 2017): OS can leak enclave data via page fault patterns — no hardware bug required
- Relay still sees full block before proposer commitment (AV17 gap)

## A11 — Signal-boost
- Same TEE assumptions as A10 — vulnerable to same attack classes (AV5, AV16)
- Multi-party co-building: cross-enclave side-channels possible if co-builders share physical host (AV16)

## A12 — Dandelion++
- Formal guarantee: O(p) deanonymization probability with fraction p of adversarial nodes
- Static stem graph per epoch: gives adversary time to learn topology (AV3)
- No protection against GPA: Dandelion++ only resists local spy nodes, not global observers

## A13 — Wonderboom
- PVS (Proposer-Validator Separation): severs proposer IP from attestation traffic
- "Largest + Random" forwarding: mathematical guarantee against deterministic censorship (P9)
- Research maturity — requires significant validator client changes
- Addresses AV10 (proposer timing) but needs complementary transport primitive for the isolated proposer process
