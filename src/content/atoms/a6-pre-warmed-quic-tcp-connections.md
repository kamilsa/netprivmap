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
| P1 | benefits | Eliminates TLS/QUIC handshake latency from propagation path. |
| P6 | benefits | Crucial for meeting the 2-second slot time targets. |
| P2 | hurts | Maintaining many open stateful connections consumes memory. |
| P7 | hurts | Requires careful stream management and peer discovery tuning. |
| P3 | hurts | Proactive connection to subnets leaks validator intent to peers. |
| A2 | enables | Pre-warmed connections are required to meet OHTTP latency targets. |

## Open questions

- Resource exhaustion on nodes holding many open streams.
- Impact on peer discovery churn.

## References

- [Deanonymizing Ethereum Validators (Heimbach et al. 2024)](https://arxiv.org/abs/2305.11095)
- [Packetology: Validator Privacy (jrhea)](https://ethresear.ch/t/packetology-validator-privacy/7547)
