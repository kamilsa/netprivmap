---
id: A1
name: "ZK Proof of Validator (ZK-PoV)"
category: identity
maturity: research
---

## Description

An anonymous credential system that allows nodes to prove they are active beacon chain validators without revealing their specific identity or IP address.

## Relationships

| Target | Type | Note |
|--------|------|------|
| [object Object] | benefits | |
| [object Object] | benefits | |
| [object Object] | benefits | |
| [object Object] | hurts | |
| [object Object] | hurts | |
| A2 | complements | ZK-PoV secures the endpoints of the OHTTP shuffle. |
| A3 | benefits from | Anonymous meshes need global rate limiting to prevent DoS. |

## Open questions

- Computational overhead of proof generation on consumer hardware.
- Trusted setup requirements for specific SNARK schemes (e.g. Caulk+).

## References

- [Proof of Validator: A simple anonymous credential scheme](https://ethresear.ch/t/proof-of-validator-a-simple-anonymous-credential-scheme-for-ethereums-dht/16454)
