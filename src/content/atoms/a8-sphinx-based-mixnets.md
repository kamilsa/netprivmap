---
id: A8
name: "Sphinx-based Mixnets"
category: routing
maturity: research
---

## Description

A privacy-preserving routing protocol utilizing the Sphinx packet format to construct mixnets. Targeted by the PSE team for integration into Ethereum's node discovery (discv5) and Private RPCs to provide robust broadcast privacy and metadata protection.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Cryptographically obfuscates the origin IP of discovery and RPC requests. |
| P5 | benefits | Provides strong resistance against Global Passive Adversaries via packet shuffling and uniform sizing. |
| P1 | hurts | Multi-hop routing and intentional mixing delays inherently increase network latency. |
| P2 | hurts | Cryptographic packet framing and mandatory cover traffic significantly increase bandwidth overhead. |
| P7 | hurts | Requires profound changes to the libp2p stack and node discovery mechanisms. |

## Open questions

- Can mixnet latency be tuned to support real-time attestation propagation, or is it strictly for less time-sensitive tasks like RPCs and discovery?
- Incentivization and deployment of independent mix node operators.

## References

- [PSE Roadmap: 2025 and Beyond](https://pse.dev/blog/pse-roadmap-2025)
