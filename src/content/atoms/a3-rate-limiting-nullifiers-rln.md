---
id: A3
name: "Rate Limiting Nullifiers (RLN)"
category: spam
maturity: implementation
---

## Description

A ZK gadget for decentralized spam protection that financially slashes rate-limit violators by revealing their secret key upon double-publishing.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P4 | benefits | Provides Sybil resistance in anonymous overlay networks. |
| P8 | benefits | Economic deterrence against resource exhaustion DoS. |
| P2 | benefits | Prevents gossip flooding without requiring node identities. |
| P7 | hurts | Requires smart contract integration and Merkle tree state tracking. |

## Open questions

- Optimizing Merkle tree updates for high-throughput validators.
- Slashing mechanism automation on-chain.

## References

- [RLN Relay Concepts - Waku Documentation](https://docs.waku.org/learn/concepts/protocols#rln-relay)
- [17/WAKU2-RLN-RELAY Specification](https://lip.logos.co/messaging/standards/core/17/rln-relay.html)
