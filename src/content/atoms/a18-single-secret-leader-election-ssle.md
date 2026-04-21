---
id: A18
name: "Single Secret Leader Election (SSLE)"
category: identity
maturity: research
---

## Description

A cryptographic primitive that ensures only the elected leader knows they are the leader until they reveal themselves by producing a block. This prevents adversaries from identifying and attacking the leader before the block is broadcast.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Critical for proposer anonymity and preventing adaptive DoS attacks. |
| P7 | hurts | High implementation complexity depending on the underlying cryptographic primitives (e.g., DDH, shuffles). |
| A17 | enables | SSLE is the foundational primitive for Whisk. |

## Open questions

- Trade-offs between different SSLE constructions (e.g., Whisk vs. secret-sharing based).

## References

- [Single Secret Leader Election (Boneh et al.)](https://eprint.iacr.org/2020/025)
