---
id: A17
name: "Whisk (SSLE Protocol)"
category: identity
maturity: research
---

## Description

A privacy-preserving Single Secret Leader Election (SSLE) protocol for Ethereum that uses shuffles and zero-knowledge proofs to hide the identity of the next block proposer until they actually publish a block.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Prevents targeted DoS attacks on upcoming proposers by hiding their IP/identity. |
| P4 | benefits | Maintains Sybil resistance via the existing validator deposit mechanism. |
| P7 | hurts | Requires complex on-chain shuffles and ZK proof verification. |

## Open questions

- Integration with the existing beacon chain fork choice and block production pipeline.

## References

- [Whisk: A practical approach to Proposer Anonymity](https://ethresear.ch/t/whisk-a-practical-approach-to-proposer-anonymity/11863)
