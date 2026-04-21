---
id: A14
name: "LLARP / Lokinet"
category: routing
maturity: implementation
---

## Description

A decentralized, Layer 3 onion routing protocol (Low-Latency Anonymous Routing Protocol) that uses packet-switching and a blockchain-based directory (Oxen) for Sybil resistance. It enables low-latency, anonymous IP-based communication for all network traffic (TCP, UDP, ICMP), protecting validator discovery and consensus messages.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Provides onion-routing anonymity for any network-layer traffic. |
| P4 | benefits | Financial staking of Service Nodes provides robust Sybil resistance. |
| P1 | benefits | Packet-switching architecture minimizes circuit-setup latency for real-time traffic. |
| P1 | hurts | Multi-hop routing path adds 100-300ms of deterministic latency. |
| P2 | hurts | Layer 3 onion headers and cryptographic encapsulation increase bandwidth overhead. |
| P7 | hurts | Requires running an external Lokinet daemon or deep integration into the p2p stack. |
| A8 | alternative | LLARP/Lokinet provides network-layer onion routing as an alternative to application-layer mixnets like Sphinx. |
| A12 | alternative | LLARP provides stronger cryptographic anonymity than Dandelion++, but with higher latency and bandwidth overhead. |

## Open questions

- Scalability of blockchain-based directory for high-churn P2P networks.
- Optimal path length for Ethereum slot time compliance.

## References

- [Lokinet: A Decentralized, Layer 3 Onion Router](https://lokinet.org/)
- [Quantifying the Privacy Guarantees of Validator Privacy Mechanisms (ethresear.ch)](https://ethresear.ch/t/quantifying-the-privacy-guarantees-of-validator-privacy-mechanisms/15611)
- [Oxen Network (formerly Loki) Whitepaper](https://oxen.io/whitepaper)
