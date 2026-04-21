---
id: A19
name: "Karmic Onion Routing"
category: routing
maturity: research
---

## Description

An incentivized onion routing mechanism that rewards relays for honest behavior and punishes malicious or unreliable nodes using a reputation or "karma" system, often integrated with financial staking.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P4 | benefits | Provides additional resistance against malicious relay nodes in an onion network. |
| P7 | hurts | Complexity in designing a tamper-proof and private reputation system. |
| A14 | complements | Karmic reputation systems can be used to incentivize Lokinet service nodes. |

## Open questions

- Privacy-preserving reputation updates without revealing circuit paths.

## References

- [Karmic: A Reputation System for Onion Routing](https://arxiv.org/abs/2105.10173)
