---
id: A9
name: "ZIPNet Anonymous Broadcast"
category: routing
maturity: research
---

## Description

An anonymous broadcast channel (ABC) designed to scale to hundreds of anytrust servers by minimizing computational costs and reducing server bandwidth through outsourced aggregation to untrusted infrastructure. It uses Trusted Execution Environments (TEEs) to ensure integrity and minimize overhead.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Anytrust model hides sender identity as long as one server is honest. |
| P2 | benefits | Lower bandwidth overhead than traditional ABCs by outsourcing aggregation. |
| P7 | hurts | Requires specialized TEE hardware (e.g., SGX) and managing anytrust server deployments. |
| A7 | evolves | Flashnet iterates on ZIPNet to improve liveness under server failure. |

## Open questions

- Vulnerability to hardware side-channel attacks on TEEs.
- Liveness in scenarios where servers go offline.

## References

- [ZIPNet: Low-bandwidth anonymous broadcast from (dis)Trusted Execution Environments](https://eprint.iacr.org/2024/1227)
