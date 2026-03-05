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

- [GPA Resistance through Cover Traffic](https://ethresear.ch/t/gpa-resistance-through-cover-traffic/16723)
