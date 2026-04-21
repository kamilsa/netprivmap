---
name: Critical Gaps in Atom Set
description: Three critical unmitigated threat vectors in netprivmap A1–A13, and five high-priority gaps, with proposed new atoms A14–A19
type: project
---

## Critical Gaps (must address for meaningful privacy guarantees)

### GAP-1: Constant-Rate Cover Traffic
- **Attack mitigated**: AV1 (global timing correlation by GPA)
- **Why A4 is insufficient**: A4 flattens volume bursts but NOT timing. A GPA can still correlate first-packet arrival timing.
- **Reference model**: Loopix (Piotrowska et al., USENIX Security 2017) — continuous fixed-rate transmission
- **Proposed atom**: A14 — Constant-Rate Cover Traffic
- **Key tradeoff**: destroys timing info entirely; mandatory bandwidth overhead even when idle

### GAP-2: Verifiable Relay Accountability
- **Attack mitigated**: AV7 (relay timing/identity attack), AV12 (censorship), AV17 (OFA bid leakage)
- **Why uncovered**: All existing atoms address sender anonymity; none address relay behavior integrity
- **Reference model**: TEE-attested relay transcript or commit-reveal bid scheme
- **Proposed atom**: A15 — Verifiable Relay
- **Key tradeoff**: relay TEE has same hardware trust assumptions as A10; pure crypto alternative uses commit-reveal with public bulletin board

### GAP-3: TEE-Agnostic Threshold Cryptography
- **Attack mitigated**: AV5 (TEE side-channels), AV6 (vendor backdoor), AV16 (co-tenant key extraction)
- **Why critical**: A7, A9, A10, A11 ALL rely on TEE integrity. TEE compromise cascades to break anonymity across the entire collaborative-building composite.
- **Reference model**: Threshold ElGamal (Pedersen, Eurocrypt 1991); PVSS (Schoenmakers, Crypto 1999); Aggregatable DKG (Gurkan et al., Eurocrypt 2021)
- **Proposed atom**: A16 — Threshold ElGamal / PVSS
- **Security assumption**: DDH hardness in the chosen group (BLS12-381 or Ristretto255) — no hardware dependency
- **Key tradeoff**: interactive decryption rounds add 100–500ms; DKG setup complexity; adaptive security requires Canetti-Goldwasser (STOC 1999)

## High-Priority Gaps

### GAP-4: Subnet Subscription Indistinguishability
- **Attack mitigated**: AV2, AV11 (attester deanonymization)
- **Proposed atom**: A17 — Subnet Subscription Obfuscation
- **Mechanism**: Subscribe to k random additional subnets; or PIR-based subscription

### GAP-5: Eclipse-Resistant Peer Selection
- **Attack mitigated**: AV9 (eclipse attack)
- **Proposed atom**: A18 — Eclipse-Resistant VRF Peer Selection
- **Mechanism**: VRF(validator_key, RANDAO_epoch_seed) deterministic peer assignment; AS-diversity filter
- **Conflicts with**: A6 (pre-warmed connections) — epoch churn invalidates pre-warmed sets

### GAP-6: Onion-Layered Share Transmission
- **Attack mitigated**: AV4 (server sees originating client IP in Flashnet)
- **Resolution**: New edge A8 (Sphinx) `requires` A14 (cover traffic) AND new edge A8 `complements` A7 with note about using Sphinx as transport for Flashnet shares

### GAP-7: Proposer Ephemeral IP Rotation
- **Attack mitigated**: AV10 (proposer deanonymization)
- **Resolution**: A13 (Wonderboom PVS) + A2 (OHTTP) + new edge A13 `requires` A2

### GAP-8: Commit-Reveal Mempool Encryption
- **Attack mitigated**: AV13 (MEV front-running) — alternative/complement to A7
- **Proposed atom**: A19 — Commit-Reveal Mempool Encryption
- **Reference**: Shutter Network; BLS threshold time-lock; RANDAO beacon
- **Caveat**: RANDAO is biasable by last few proposers (Schwarz-Schilling et al., AFT 2022)

## TEE Attack CVE Reference (for A9, A10, A11 open questions)
- Foreshadow/L1TF: CVE-2018-3615 (Van Bulck et al., USENIX Security 2018)
- CacheOut/L1D Eviction Sampling: CVE-2020-0549 (Van Schaik et al., SP 2020)
- AEPIC Leak: CVE-2022-21233 (Borrello et al., USENIX Security 2022)
- SGAxe: CVE-2020-0549 variant (Van Schaik et al., 2020) — breaks SGX remote attestation
- Plundervolt: CVE-2019-11157 (Murdock et al., SP 2020) — voltage undervolting
- Controlled-channel: no CVE (structural, Van Bulck et al., USENIX Security 2017) — OS page fault analysis
