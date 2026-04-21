---
title: Ethereum Networking Privacy
tags: presentation, revealjs
slideOptions:
  theme: night
  transition: fade
  slideNumber: true
  center: true
---

# Ethereum Networking Privacy
### Mapping the Landscape

---

## The Threat Model
**Goal:** Quantify the *cost to deanonymize* a validator.

**Deanonymization:** Linking a **Validator Index** to a physical **IP Address**.

---

## Privacy trilema

![image](https://hackmd.io/_uploads/SJE3EOz2bx.png)


---

## Adversary Capabilities

- **Local Passive (LPA):** Basic timing/subnet correlation on direct peers. 
- **Global Passive (GPA):** (Tier-1 ISPs) End-to-end timing/volume correlation. 
- **Active Adversary:** Packet tagging, injection, and routing manipulation. 
- **Censor/DPI:** Deep Packet Inspection to block Ethereum signatures. 

---

## Attack Vectors

- **Subnet Leakage:** (IP + Subnet ID) x (Time Window) = Validator identity. 
- **"First-to-Hear" Timing:** The first node to broadcast is likely the source. 
- **Volume Correlation:** Matching traffic bursts across encrypted tunnels. 
- **Sybil Observer:** Path mapping via thousands of "sentry" nodes. 

note:
The 4-second attestation deadline makes timing signatures especially clean for attackers.

---

## Privacy Techniques: The Inventory

- **Layered Proxying:** OHTTP (2-hop), Mixnets (multi-hop + delay), KOR
- **Anonymous Broadcast (ABC):** Flashnet, ZIPNet (low-latency, threshold). 
- **Identity Obfuscation:** Privacy Pass (blind sigs), RLN (ZK-SNARK rate limiting).
- **Distributed Trust:** DVT (threshold signing), TEEs (hardware enclaves). 
- **Traffic Obfuscation:** Decoy Traffic

---

## Layered Proxying?

- **Core Goal:** Decouple "Who you are" (IP) from "What you say" (Payload). 
- **MASQUE:** Proxy UDP/IP traffic over HTTP/3
- **OHTTP (2-hop):** A Relay strips your IP; a Target decrypts your data. Neither knows both. 
- **Mixnets (N+ hops):** Packets are reordered and delayed to defeat timing analysis. 

---

## Layered Proxying Assessment

| Criterion | OHTTP (Relay) | Mixnets (Nym/Tor) |
| :--- | :---: | :---: |
| **Anonymity** | Medium (No delay) | **Strong** (Mixing) |
| **Bandwidth** | **Low** (Efficient) | High (Chaffing) |
| **Latency** | +2 hops | multiple hops |
| **Attack Cost** | Low Statistical | **High** (Statistical) |

---

## ABCs (Anonymous broadcast channels)

- **Anonymous Broadcast Channels:** Optimized for many-to-many communication. 
- **Mechanism:** Threshold trust. Messages are split into shares or processed via TEEs. 
- **Decoy Traffic:** Maintains a constant baseline volume to achieve high **unobservability**. 
- **Property:** Allows a node to broadcast to the entire network without a fixed source IP. 
- **Key Advantage:** Ultra-low latency compared to mixnets—built for the consensus "sound barrier." 

---

## ABC assessment

| Criterion | Flashnet | ZIPNet |
| :--- | :---: | :---: |
| **Anonymity** | **Strong** (Threshold) | **Strong** (TEEs) |
| **Bandwidth** | High | **Low** (Outsourced) |
| **Latency** | **Low** | **Low** |
| **Attack Cost** | **High** (Threshold) | **Low** (Hardware) |

---

## Anonymous credentials

- **Core Goal:** Decouple "Who you are" (PubKey) from "What you do" (Broadcast). 
- **Privacy Pass:** Blind signatures grant "anonymous credentials." You prove you're a validator without revealing *which* one. 
- **Proof of Validator (POV):** ZK-SNARK based proof that you are a validator without revealing your identity. 
- **Rate Limiting Nullifiers (RLN):** ZK-gadget that enforces "one message per slot" anonymously. Spamming reveals your identity. 
- **Sybil Resistance:** Prevents anonymous actors from overwhelming the network. 

---

## Anonymous credentials Assessment

| Criterion | Privacy Pass | RLN (ZK-SNARK) |
| :--- | :---: | :---: |
| **Anonymity** | **Strong** (Unlinkable token) | **Strong** (Conditional) |
| **Bandwidth** | **Low** (Small tokens) | Moderate (+Proof size) |
| **Latency** | **Low** (Fast verification) | Moderate (Proving time) |
| **Attack Cost** | **High** (Threshold Issuer) | **High** (Economic/ZK) |

---


