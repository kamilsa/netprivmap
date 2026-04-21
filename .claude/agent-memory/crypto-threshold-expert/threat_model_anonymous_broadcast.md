---
name: Threat Model - Anonymous Broadcast (Ethereum PBS/Mempool)
description: Full structured threat model for Flashnet/BuilderNet/Signal-boost covering 10 threat actors, 17 attack vectors, 8 gaps, and 6 new atom proposals (A14–A19)
type: project
---

Produced in conversation on 2026-04-05. See the full threat model document in the conversation for complete detail.

## Threat Actors (TA1–TA10)
- TA1: Global Passive Adversary (GPA) — passive, global, traffic analysis
- TA2: ISP/AS Observer — regional, partially active, BGP manipulation
- TA3: Malicious Relay/OHTTP Gateway — active, data-path, bid leakage
- TA4: Malicious Validator/Attester — inside anonymity set, valid credentials
- TA5: TEE Platform Vendor — hardware trust root, can forge attestation
- TA6: Eclipse Attacker — active, peer-level monopolization
- TA7: Anytrust Quorum Colluder — f+1 server coalition, share pooling
- TA8: MEV Searcher/Builder — semi-inside, co-location attacks
- TA9: Sybil Attacker — economic barrier depends on A1+A3 cost
- TA10: Proposer/Builder Collusion — application-layer, bypasses blind building

## Attack Severity Summary
- Critical: AV1 (GPA timing), AV2 (subnet subscription), AV4 (anytrust collusion), AV5 (TEE side-channel), AV6 (vendor backdoor), AV10 (proposer timing), AV16 (co-tenant key extraction)
- High: AV3 (Dandelion++ topology), AV7 (relay timing), AV9 (eclipse), AV11 (attester subnet), AV12 (censorship coalition), AV13 (MEV front-running), AV15 (slot DoS), AV17 (OFA bid leakage)
- Medium: AV8 (Sybil on RLN mesh), AV14 (on-chain graph — out of scope)

## Property Risk Summary
- P3 (Identity Unlinkability): Highest risk — Critical attacks AV1, AV2, AV4, AV10 all unmitigated/partially mitigated
- P5 (GPA Resistance): High risk — no production-grade constant-rate cover traffic atom exists
- P9 (Censorship Resilience): High risk — relay layer has no accountability mechanism
- P6 (BFT Compatibility): Medium risk — eclipse (AV9) and relay delay (AV7) are residual threats

## New Atoms Proposed
- A14: Constant-Rate Cover Traffic (cat: obfuscation, research) — Loopix model
- A15: Verifiable Relay (cat: routing, research) — TEE-attested relay transcript
- A16: Threshold ElGamal / PVSS (cat: identity, research) — DDH-based, no TEE dependency
- A17: Subnet Subscription Obfuscation (cat: routing, research) — k-random multi-subscription
- A18: Eclipse-Resistant VRF Peer Selection (cat: routing, research) — RANDAO-seeded VRF peers
- A19: Commit-Reveal Mempool Encryption (cat: spam, research) — BLS time-lock or hash commit-reveal

## Key Tension Patterns
- P1 (latency) vs P5 (GPA resistance): constant-rate cover traffic and mixnet delays fundamentally conflict with 300ms p90 attestation delivery
- P4 (sybil resistance) vs P3 (identity unlinkability): requiring stake for Sybil resistance means validators are identifiable by their stake; privacy requires hiding which staked validator you are
- P7 (complexity) vs P3+P5: the strongest privacy primitives (Sphinx mixnets, threshold decryption, TEE enclaves) are all high-complexity
- A6 (pre-warmed connections) conflicts with A18 (VRF peer rotation) — epoch churn vs persistent connections
