---
id: A13
name: "Wonderboom Signature Aggregation"
category: routing
maturity: research
---

## Description

A high-performance aggregation protocol that utilizes deep aggregation trees and Proposer-Validator Separation (PVS). It mandated physical isolation of proposer processes to obfuscate their gossip footprint, while using direct P2P channels for million-scale signature aggregation.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | PVS severs the link between the high-value proposer role and high-frequency voting IP. |
| P9 | benefits | Largest + Random forwarding rule provides mathematical guarantees against deterministic censorship. |
| P1 | benefits | Enables two-slot finality by solving the million-scale aggregation bottleneck. |
| P7 | hurts | Requires significant structural changes to the validator client and network topology. |
| A12 | alternative | Wonderboom uses PVS and direct P2P to bypass the latency of gossip-based anonymity protocols like Dandelion++ for voting. |

## Open questions

- Incentivization for committee representatives to remain online and honest.
- Impact of deep tree latency on tight aggregation windows.

## References

- [Wonderboom: Efficient, and Censorship-Resilient Signature Aggregation for Million Scale Consensus](https://arxiv.org/abs/2602.06655)
