---
id: A7
name: "Flashnet Anonymous Broadcast"
category: routing
maturity: research
---

## Description

A threshold-based anonymous broadcast protocol that uses secret sharing across servers and client-side TEEs to achieve ultra-low latency for mempools and block building.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P1 | benefits | Parallel secret sharing and single-hop reconstruction for minimal delay. |
| P3 | benefits | Threshold non-collusion model severing the sender-to-batch link. |
| P4 | benefits | TEE-enforced liveness prevents client jamming without expensive ZKPs. |
| P2 | hurts | Requires sending multiple secret shares per message, increasing data load. |
| P7 | hurts | Requires managing a set of threshold-honest servers and TEE clients. |
| A2 | complements | Flashnet provides a threshold-based evolution of the OHTTP relay model. |
| A10 | enables | Flashnet provides the anonymous communication layer for decentralized builders. |

## Open questions

- Scalability of synchronous rounds with large participant sets.
- Optimal server threshold for decentralized block building pipelines.

## References

- [Network Anonymized Mempools (Flashbots)](https://writings.flashbots.net/network-anonymized-mempools)
