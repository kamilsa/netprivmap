---
id: A5
name: "Privacy Pass (RFC 9576)"
category: identity
maturity: standardized
---

## Description

An IETF standard for privacy-preserving authorization using blind signatures to separate client attestation from client identity.

## Relationships

| Target | Type | Note |
|--------|------|------|
| P3 | benefits | Unlinkability between issuer and origin. |
| P4 | benefits | Proof of authorization without identity disclosure. |
| P7 | hurts | Standard is complex and requires specialized blind signature crypto. |
| A1 | complements | Privacy Pass principles inform the ZK-PoV architecture. |

## Open questions

- Integration with Ethereum validator keys.
- Colussion resistance between issuers and origins.

## References

- [RFC 9576: Privacy Pass Architecture](https://datatracker.ietf.org/doc/rfc9576/)
