---
id: A16
name: "Walking Onions"
category: routing
maturity: research
---

## Description

A scaling mechanism for onion routing networks that eliminates the need for clients to download a complete directory of all relays. Clients retrieve relay descriptors on-demand during circuit extension using certified indices.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P2 | benefits | Drastically reduces client directory download bandwidth, scaling linearly with network growth. |
| P1 | benefits | Eliminates front-loaded directory download delays for new clients. |
| P7 | hurts | Requires an Efficient Network Directory with Individually Verifiable Entries (ENDIVE). |

## Open questions

- Managing feature parity with Tor's current relay selection logic.
- Security of on-demand descriptor retrieval against statistical attacks.

## References

- [Walking Onions: Scaling and Saving Bandwidth (Tor Proposal 300)](https://gitlab.torproject.org/tpo/core/torspec/-/blob/main/proposals/300-walking-onions.txt)
