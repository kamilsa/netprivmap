---
id: A12
name: "Dandelion++"
category: routing
maturity: implementation
---

## Description

A lightweight P2P anonymity protocol designed to obfuscate the source IP of transactions. It splits propagation into two phases: a "stem" phase, where the message is passed along a single randomized path, and a "fluff" phase, where it is broadcast to the rest of the network via standard diffusion.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Breaking symmetry in propagation patterns makes it difficult for spy nodes to triangulate the source IP. |
| P2 | benefits | Extremely low bandwidth overhead compared to mixnets or decoy traffic. |
| P1 | hurts | The "stem" phase adds deterministic hops, increasing the time before a message reaches the whole network. |
| A8 | complements | Dandelion++ provides a lightweight alternative to mixnets for privacy-preserving broadcast. |

## Open questions

- Compatibility with strict 12s/2s Ethereum slot times for attestations.
- Effectiveness against adversaries who can observe large portions of the P2P topology.

## References

- [Dandelion++: Lightweight Cryptocurrency Networking with Formal Anonymity Guarantees](https://arxiv.org/abs/1805.11060)
