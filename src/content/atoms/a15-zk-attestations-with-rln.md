---
id: A15
name: "ZK-Attestations (with RLN)"
category: identity
maturity: research
---

## Description

Replacing raw validator signatures in attestations with succinct ZK proofs of signature possession. It uses Rate-Limiting Nullifiers (RLN) to prevent DoS/spam via equivocation while maintaining full validator-set anonymity.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Full validator-set anonymity by hiding the specific signer identity. |
| P4 | benefits | RLN bounds rate to 1 attestation per slot, preventing equivocation spam. |
| P1 | hurts | Proof generation and recursive aggregation add significant latency to the consensus path. |
| P2 | hurts | ZK proofs (e.g., plonky3) are larger than standard signatures, increasing bandwidth load. |
| P7 | hurts | Requires complex circuit design for signature verification and Merkle membership. |
| A3 | requires | ZK-Attestations use RLN nullifiers for DoS protection and equivocation slashing. |
| A1 | complements | ZK-Attestations extend the ZK-PoV concept to the actual consensus signing path. |

## Open questions

- Reward distribution mechanism for hidden identities.
- Recursive proof aggregation performance on consumer hardware.

## References

- [Anonymous Rate-Limited Credentials (draft-irtf-cfrg-arc)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-arc/)
