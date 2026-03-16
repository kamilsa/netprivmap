---
id: A11
name: "Signal-boost (Co-building)"
category: routing
maturity: research
---

## Description

A protocol for "secure co-location" that enables untrusted parties to build specific parts of a block collaboratively. It uses sandboxed environments (TEEs) to allow multiple actors to contribute to block production without any single party having total control over the final block structure.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Modular building prevents any single entity from having full metadata visibility. |
| P6 | benefits | Enables parallelized block construction across different domains and geographies. |
| P7 | hurts | High complexity in coordinating and proving valid co-building steps. |
| P1 | hurts | Increased communication overhead between co-building participants. |

## Open questions

- Optimal allocation of block space across untrusted co-builders.
- Fairness and efficiency of co-building auctions.

## References

- [decentralized building: wat do? (Flashbots)](https://writings.flashbots.net/decentralized-building-wat-do/)
