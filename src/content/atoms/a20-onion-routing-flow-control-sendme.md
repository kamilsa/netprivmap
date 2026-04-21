---
id: A20
name: "Onion Routing Flow Control (SENDME)"
category: routing
maturity: implementation
---

## Description

An end-to-end flow control mechanism (like Tor's SENDME cells) that prevents senders from overwhelming the buffers of relays or the final recipient in a multi-hop onion circuit. It operates independently of the underlying TCP/UDP flow control.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P1 | benefits | Maintains predictable latency by preventing bufferbloat at relay nodes. |
| P2 | hurts | Additional control cells increase bandwidth overhead. |
| A8 | complements | Flow control is essential for preventing bufferbloat in multi-hop mixnets. |
| A14 | complements | LLARP uses flow control to manage packet-switched anonymous traffic. |

## Open questions

- Optimizing window sizes for the specific latency requirements of Ethereum attestations.

## References

- [Tor Protocol Specification (Section 6.2: Flow Control)](https://gitlab.torproject.org/tpo/core/torspec/-/blob/main/tor-spec.txt)
