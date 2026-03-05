---
id: A4
name: "Decoy Traffic Injection"
category: obfuscation
maturity: research
---

## Description

Algorithmically generating dummy traffic to flatten network profiles and disrupt statistical analysis by Global Passive Adversaries.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P5 | benefits | Masks attestation timing spikes with dummy packets. |
| P3 | benefits | Reduces the correlation between traffic volume and signing events. |
| P2 | hurts | Sustained injection of dummy packets increases baseline bandwidth usage. |

## Open questions

- Finding the optimal ratio between decoy and genuine traffic.
- Impact on overall network congestion.

## References

- [Privacy Problems in the P2P Network and What They Tell Us (Topic 20463)](https://ethresear.ch/t/privacy-problems-in-the-p2p-network-and-what-they-tell-us/20463)
- [Gossipsub’s partial messages extension and cell-level dissemination (Topic 23017)](https://ethresear.ch/t/gossipsub-s-partial-messages-extension-and-cell-level-dissemination/23017)
