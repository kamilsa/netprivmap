---
id: A6
name: "Pre-warmed QUIC/TCP Connections"
category: routing
maturity: implementation
---

## Description

Maintaining persistent, multiplexed connections to eliminate handshake overhead on the critical path of attestation broadcast.

## Relationships

| Target | Type | Note |
|--------|------|------|
| [object Object] | benefits | |
| [object Object] | benefits | |
| [object Object] | hurts | |
| [object Object] | hurts | |
| [object Object] | hurts | |
| A2 | enables | Pre-warmed connections are required to meet OHTTP latency targets. |

## Open questions

- Resource exhaustion on nodes holding many open streams.
- Impact on peer discovery churn.

## References

- [Deanonymizing Ethereum Validators (Heimbach et al. 2024)](https://arxiv.org/abs/2305.11095)
- [Packetology: Validator Privacy (jrhea)](https://ethresear.ch/t/packetology-validator-privacy/7547)
