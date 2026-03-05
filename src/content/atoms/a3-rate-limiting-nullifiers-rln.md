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
| [object Object] | benefits | |
| [object Object] | benefits | |
| [object Object] | benefits | |
| [object Object] | hurts | |

## Open questions

- Optimizing Merkle tree updates for high-throughput validators.
- Slashing mechanism automation on-chain.

## References

- [RLN Relay Concepts - Waku Documentation](https://docs.waku.org/learn/concepts/protocols#rln-relay)
- [17/WAKU2-RLN-RELAY Specification](https://lip.logos.co/messaging/standards/core/17/rln-relay.html)
