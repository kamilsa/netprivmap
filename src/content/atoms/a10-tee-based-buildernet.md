---
id: A10
name: "TEE-based BuilderNet"
category: identity
maturity: development
---

## Description

A decentralized block-building network utilizing Trusted Execution Environments (TEEs) to process and encrypt order flow. It prevents any single entity from acting as a gatekeeper or "landlord" for transaction flow by ensuring that even node operators cannot see the content of the transactions they are building.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Blind building severs the link between the builder and the transaction content/origin. |
| P4 | benefits | TEE remote attestation provides a strong root of trust for permissionless joining. |
| P7 | hurts | Requires managing a complex network of multi-operator TEE instances (e.g., Beaverbuild, Nethermind). |
| P1 | hurts | TEE-based computation and attestation checks add overhead to the block building critical path. |
| A11 | enables | BuilderNet provides the infrastructure for multi-party modular co-building. |

## Open questions

- Scalability of blind building with hundreds of simultaneous builders.
- Resistance to TEE-level side-channel attacks in a multi-tenant builder environment.

## References

- [decentralized building: wat do? (Flashbots)](https://writings.flashbots.net/decentralized-building-wat-do/)
