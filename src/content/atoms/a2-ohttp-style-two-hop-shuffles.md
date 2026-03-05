---
id: A2
name: "OHTTP-Style Two-Hop Shuffles"
category: routing
maturity: development
---

## Description

A multi-hop routing primitive inspired by Oblivious HTTP that separates identity (Relay) from application data (Gateway).

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Gateway only sees the Relay IP, not the validator IP. |
| P6 | benefits | Maintains consensus compatibility through low-latency routing. |
| P1 | hurts | Additional network hop adds 50-100ms latency. |
| P7 | hurts | Requires new relay infrastructure and connection management. |

## Open questions

- Managing pre-warmed connections at scale.
- Geographic distribution of reliable relay nodes.

## References

- [RFC 9458: Oblivious HTTP](https://datatracker.ietf.org/doc/rfc9458/)
- [Packetology: Validator Privacy (jrhea)](https://ethresear.ch/t/packetology-validator-privacy/7547)
