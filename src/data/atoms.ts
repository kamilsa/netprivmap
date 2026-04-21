import type { CategoryId } from './categories';
import type { MaturityLevel } from './maturity';

export interface PropertyImpact {
  id: string;
  note?: string;
}

export interface Atom {
  id: string;
  name: string;
  cat: CategoryId;
  maturity: MaturityLevel;
  desc: string;
  benefits: (string | PropertyImpact)[];
  hurts: (string | PropertyImpact)[];
  openQs: string[];
  refs: string[];
}

export const ATOMS: Atom[] = [
  {
    id: 'A1',
    name: 'ZK Proof of Validator (ZK-PoV)',
    cat: 'identity',
    maturity: 'research',
    desc: 'An anonymous credential system that allows nodes to prove they are active beacon chain validators without revealing their specific identity or IP address.',
    benefits: [
      { id: 'P3', note: 'Severing the IP-to-identity link via ZK credentials.' },
      { id: 'P4', note: 'Prevents Sybil attacks by requiring proof of active stake.' },
      { id: 'P6', note: 'Enables high-trust meshes without exposing validator schedules.' }
    ],
    hurts: [
      { id: 'P7', note: 'Requires complex ZK proof generation logic in clients.' },
      { id: 'P1', note: 'Proof generation time can approach slot time limits on low-end hardware.' }
    ],
    openQs: ['Computational overhead of proof generation on consumer hardware.', 'Trusted setup requirements for specific SNARK schemes (e.g. Caulk+).'],
    refs: [
      '[Proof of Validator: A simple anonymous credential scheme](https://ethresear.ch/t/proof-of-validator-a-simple-anonymous-credential-scheme-for-ethereums-dht/16454)',
      '[Anonymity, Unlinkability, Undetectability, and Unobservability: A Proposal for Terminology (v0.34)](https://www.maroki.de/pub/verschiedenes/2010_Anon_Terminology_v0.34.pdf)'
    ],
  },
  {
    id: 'A2',
    name: 'OHTTP-Style Two-Hop Shuffles',
    cat: 'routing',
    maturity: 'development',
    desc: 'A multi-hop routing primitive inspired by Oblivious HTTP that separates identity (Relay) from application data (Gateway).',
    benefits: [
      { id: 'P3', note: 'Gateway only sees the Relay IP, not the validator IP.' },
      { id: 'P6', note: 'Maintains consensus compatibility through low-latency routing.' }
    ],
    hurts: [
      { id: 'P1', note: 'Additional network hop adds 50-100ms latency.' },
      { id: 'P7', note: 'Requires new relay infrastructure and connection management.' }
    ],
    openQs: ['Managing pre-warmed connections at scale.', 'Geographic distribution of reliable relay nodes.'],
    refs: [
      '[RFC 9458: Oblivious HTTP](https://datatracker.ietf.org/doc/rfc9458/)',
      '[Packetology: Validator Privacy (jrhea)](https://ethresear.ch/t/packetology-validator-privacy/7547)',
      '[Anonymity, Unlinkability, Undetectability, and Unobservability: A Proposal for Terminology (v0.34)](https://www.maroki.de/pub/verschiedenes/2010_Anon_Terminology_v0.34.pdf)'
    ],
  },
  {
    id: 'A3',
    name: 'Rate Limiting Nullifiers (RLN)',
    cat: 'spam',
    maturity: 'implementation',
    desc: 'A ZK gadget for decentralized spam protection that financially slashes rate-limit violators by revealing their secret key upon double-publishing.',
    benefits: [
      { id: 'P4', note: 'Provides Sybil resistance in anonymous overlay networks.' },
      { id: 'P8', note: 'Economic deterrence against resource exhaustion DoS.' },
      { id: 'P2', note: 'Prevents gossip flooding without requiring node identities.' }
    ],
    hurts: [
      { id: 'P7', note: 'Requires smart contract integration and Merkle tree state tracking.' }
    ],
    openQs: ['Optimizing Merkle tree updates for high-throughput validators.', 'Slashing mechanism automation on-chain.'],
    refs: [
      '[RLN Relay Concepts - Waku Documentation](https://docs.waku.org/learn/concepts/protocols#rln-relay)',
      '[17/WAKU2-RLN-RELAY Specification](https://lip.logos.co/messaging/standards/core/17/rln-relay.html)'
    ],
  },
  {
    id: 'A4',
    name: 'Decoy Traffic Injection',
    cat: 'obfuscation',
    maturity: 'research',
    desc: 'Algorithmically generating dummy traffic to flatten network profiles and disrupt statistical analysis by Global Passive Adversaries.',
    benefits: [
      { id: 'P5', note: 'Masks attestation timing spikes with dummy packets.' },
      { id: 'P3', note: 'Reduces the correlation between traffic volume and signing events.' }
    ],
    hurts: [
      { id: 'P2', note: 'Sustained injection of dummy packets increases baseline bandwidth usage.' }
    ],
    openQs: ['Finding the optimal ratio between decoy and genuine traffic.', 'Impact on overall network congestion.'],
    refs: [
      '[Privacy Problems in the P2P Network and What They Tell Us (Topic 20463)](https://ethresear.ch/t/privacy-problems-in-the-p2p-network-and-what-they-tell-us/20463)',
      '[Gossipsub’s partial messages extension and cell-level dissemination (Topic 23017)](https://ethresear.ch/t/gossipsub-s-partial-messages-extension-and-cell-level-dissemination/23017)',
      '[Anonymity, Unlinkability, Undetectability, and Unobservability: A Proposal for Terminology (v0.34)](https://www.maroki.de/pub/verschiedenes/2010_Anon_Terminology_v0.34.pdf)'
    ],
  },
  {
    id: 'A5',
    name: 'Privacy Pass (RFC 9576)',
    cat: 'identity',
    maturity: 'standardized',
    desc: 'An IETF standard for privacy-preserving authorization using blind signatures to separate client attestation from client identity.',
    benefits: [
      { id: 'P3', note: 'Unlinkability between issuer and origin.' },
      { id: 'P4', note: 'Proof of authorization without identity disclosure.' }
    ],
    hurts: [
      { id: 'P7', note: 'Standard is complex and requires specialized blind signature crypto.' }
    ],
    openQs: ['Integration with Ethereum validator keys.', 'Colussion resistance between issuers and origins.'],
    refs: ['[RFC 9576: Privacy Pass Architecture](https://datatracker.ietf.org/doc/rfc9576/)'],
  },
  {
    id: 'A6',
    name: 'Pre-warmed QUIC/TCP Connections',
    cat: 'routing',
    maturity: 'implementation',
    desc: 'Maintaining persistent, multiplexed connections to eliminate handshake overhead on the critical path of attestation broadcast.',
    benefits: [
      { id: 'P1', note: 'Eliminates TLS/QUIC handshake latency from propagation path.' },
      { id: 'P6', note: 'Crucial for meeting the 2-second slot time targets.' }
    ],
    hurts: [
      { id: 'P2', note: 'Maintaining many open stateful connections consumes memory.' },
      { id: 'P7', note: 'Requires careful stream management and peer discovery tuning.' },
      { id: 'P3', note: 'Proactive connection to subnets leaks validator intent to peers.' }
    ],
    openQs: ['Resource exhaustion on nodes holding many open streams.', 'Impact on peer discovery churn.'],
    refs: [
      '[Deanonymizing Ethereum Validators (Heimbach et al. 2024)](https://arxiv.org/abs/2305.11095)',
      '[Packetology: Validator Privacy (jrhea)](https://ethresear.ch/t/packetology-validator-privacy/7547)'
    ],
  },
  {
    id: 'A7',
    name: 'Flashnet Anonymous Broadcast',
    cat: 'routing',
    maturity: 'research',
    desc: 'A threshold-based anonymous broadcast protocol that uses secret sharing across servers and client-side TEEs to achieve ultra-low latency for mempools and block building.',
    benefits: [
      { id: 'P1', note: 'Parallel secret sharing and single-hop reconstruction for minimal delay.' },
      { id: 'P3', note: 'Threshold non-collusion model severing the sender-to-batch link.' },
      { id: 'P4', note: 'TEE-enforced liveness prevents client jamming without expensive ZKPs.' }
    ],
    hurts: [
      { id: 'P2', note: 'Requires sending multiple secret shares per message, increasing data load.' },
      { id: 'P7', note: 'Requires managing a set of threshold-honest servers and TEE clients.' }
    ],
    openQs: ['Scalability of synchronous rounds with large participant sets.', 'Optimal server threshold for decentralized block building pipelines.'],
    refs: [
      '[Network Anonymized Mempools (Flashbots)](https://writings.flashbots.net/network-anonymized-mempools)'
    ],
  },
  {
    id: 'A8',
    name: 'Sphinx-based Mixnets',
    cat: 'routing',
    maturity: 'research',
    desc: 'A privacy-preserving routing protocol utilizing the Sphinx packet format to construct mixnets. Targeted by the PSE team for integration into Ethereum\'s node discovery (discv5) and Private RPCs to provide robust broadcast privacy and metadata protection.',
    benefits: [
      { id: 'P3', note: 'Cryptographically obfuscates the origin IP of discovery and RPC requests.' },
      { id: 'P5', note: 'Provides strong resistance against Global Passive Adversaries via packet shuffling and uniform sizing.' }
    ],
    hurts: [
      { id: 'P1', note: 'Multi-hop routing and intentional mixing delays inherently increase network latency.' },
      { id: 'P2', note: 'Cryptographic packet framing and mandatory cover traffic significantly increase bandwidth overhead.' },
      { id: 'P7', note: 'Requires profound changes to the libp2p stack and node discovery mechanisms.' }
    ],
    openQs: ['Can mixnet latency be tuned to support real-time attestation propagation, or is it strictly for less time-sensitive tasks like RPCs and discovery?', 'Incentivization and deployment of independent mix node operators.'],
    refs: [
      '[PSE Roadmap: 2025 and Beyond](https://pse.dev/blog/pse-roadmap-2025)',
      '[Anonymity, Unlinkability, Undetectability, and Unobservability: A Proposal for Terminology (v0.34)](https://www.maroki.de/pub/verschiedenes/2010_Anon_Terminology_v0.34.pdf)'
    ],
  },
  {
    id: 'A9',
    name: 'ZIPNet Anonymous Broadcast',
    cat: 'routing',
    maturity: 'research',
    desc: 'An anonymous broadcast channel (ABC) designed to scale to hundreds of anytrust servers by minimizing computational costs and reducing server bandwidth through outsourced aggregation to untrusted infrastructure. It uses Trusted Execution Environments (TEEs) to ensure integrity and minimize overhead.',
    benefits: [
      { id: 'P3', note: 'Anytrust model hides sender identity as long as one server is honest.' },
      { id: 'P2', note: 'Lower bandwidth overhead than traditional ABCs by outsourcing aggregation.' }
    ],
    hurts: [
      { id: 'P7', note: 'Requires specialized TEE hardware (e.g., SGX) and managing anytrust server deployments.' }
    ],
    openQs: ['Vulnerability to hardware side-channel attacks on TEEs.', 'Liveness in scenarios where servers go offline.'],
    refs: [
      '[ZIPNet: Low-bandwidth anonymous broadcast from (dis)Trusted Execution Environments](https://eprint.iacr.org/2024/1227)'
    ],
  },
  {
    id: 'A10',
    name: 'TEE-based BuilderNet',
    cat: 'identity',
    maturity: 'development',
    desc: 'A decentralized block-building network utilizing Trusted Execution Environments (TEEs) to process and encrypt order flow. It prevents any single entity from acting as a gatekeeper or "landlord" for transaction flow by ensuring that even node operators cannot see the content of the transactions they are building.',
    benefits: [
      { id: 'P3', note: 'Blind building severs the link between the builder and the transaction content/origin.' },
      { id: 'P4', note: 'TEE remote attestation provides a strong root of trust for permissionless joining.' }
    ],
    hurts: [
      { id: 'P7', note: 'Requires managing a complex network of multi-operator TEE instances (e.g., Beaverbuild, Nethermind).' },
      { id: 'P1', note: 'TEE-based computation and attestation checks add overhead to the block building critical path.' }
    ],
    openQs: ['Scalability of blind building with hundreds of simultaneous builders.', 'Resistance to TEE-level side-channel attacks in a multi-tenant builder environment.'],
    refs: [
      '[decentralized building: wat do? (Flashbots)](https://writings.flashbots.net/decentralized-building-wat-do/)'
    ],
  },
  {
    id: 'A11',
    name: 'Signal-boost (Co-building)',
    cat: 'routing',
    maturity: 'research',
    desc: 'A protocol for "secure co-location" that enables untrusted parties to build specific parts of a block collaboratively. It uses sandboxed environments (TEEs) to allow multiple actors to contribute to block production without any single party having total control over the final block structure.',
    benefits: [
      { id: 'P3', note: 'Modular building prevents any single entity from having full metadata visibility.' },
      { id: 'P6', note: 'Enables parallelized block construction across different domains and geographies.' }
    ],
    hurts: [
      { id: 'P7', note: 'High complexity in coordinating and proving valid co-building steps.' },
      { id: 'P1', note: 'Increased communication overhead between co-building participants.' }
    ],
    openQs: ['Optimal allocation of block space across untrusted co-builders.', 'Fairness and efficiency of co-building auctions.'],
    refs: [
      '[decentralized building: wat do? (Flashbots)](https://writings.flashbots.net/decentralized-building-wat-do/)'
    ],
  },
  {
    id: 'A12',
    name: 'Dandelion++',
    cat: 'routing',
    maturity: 'implementation',
    desc: 'A lightweight P2P anonymity protocol designed to obfuscate the source IP of transactions. It splits propagation into two phases: a "stem" phase, where the message is passed along a single randomized path, and a "fluff" phase, where it is broadcast to the rest of the network via standard diffusion.',
    benefits: [
      { id: 'P3', note: 'Breaking symmetry in propagation patterns makes it difficult for spy nodes to triangulate the source IP.' },
      { id: 'P2', note: 'Extremely low bandwidth overhead compared to mixnets or decoy traffic.' }
    ],
    hurts: [
      { id: 'P1', note: 'The "stem" phase adds deterministic hops, increasing the time before a message reaches the whole network.' }
    ],
    openQs: ['Compatibility with strict 12s/2s Ethereum slot times for attestations.', 'Effectiveness against adversaries who can observe large portions of the P2P topology.'],
    refs: [
      '[Dandelion++: Lightweight Cryptocurrency Networking with Formal Anonymity Guarantees](https://arxiv.org/abs/1805.11060)'
    ],
  },
  {
    id: 'A13',
    name: 'Wonderboom Signature Aggregation',
    cat: 'routing',
    maturity: 'research',
    desc: 'A high-performance aggregation protocol that utilizes deep aggregation trees and Proposer-Validator Separation (PVS). It mandated physical isolation of proposer processes to obfuscate their gossip footprint, while using direct P2P channels for million-scale signature aggregation.',
    benefits: [
      { id: 'P3', note: 'PVS severs the link between the high-value proposer role and high-frequency voting IP.' },
      { id: 'P9', note: 'Largest + Random forwarding rule provides mathematical guarantees against deterministic censorship.' },
      { id: 'P1', note: 'Enables two-slot finality by solving the million-scale aggregation bottleneck.' }
    ],
    hurts: [
      { id: 'P7', note: 'Requires significant structural changes to the validator client and network topology.' }
    ],
    openQs: ['Incentivization for committee representatives to remain online and honest.', 'Impact of deep tree latency on tight aggregation windows.'],
    refs: [
      '[Wonderboom: Efficient, and Censorship-Resilient Signature Aggregation for Million Scale Consensus](https://arxiv.org/abs/2602.06655)'
    ],
  },
  {
    id: 'A14',
    name: 'LLARP / Lokinet',
    cat: 'routing',
    maturity: 'implementation',
    desc: 'A decentralized, Layer 3 onion routing protocol (Low-Latency Anonymous Routing Protocol) that uses packet-switching and a blockchain-based directory (Oxen) for Sybil resistance. It enables low-latency, anonymous IP-based communication for all network traffic (TCP, UDP, ICMP), protecting validator discovery and consensus messages.',
    benefits: [
      { id: 'P3', note: 'Provides onion-routing anonymity for any network-layer traffic.' },
      { id: 'P4', note: 'Financial staking of Service Nodes provides robust Sybil resistance.' },
      { id: 'P1', note: 'Packet-switching architecture minimizes circuit-setup latency for real-time traffic.' }
    ],
    hurts: [
      { id: 'P1', note: 'Multi-hop routing path adds 100-300ms of deterministic latency.' },
      { id: 'P2', note: 'Layer 3 onion headers and cryptographic encapsulation increase bandwidth overhead.' },
      { id: 'P7', note: 'Requires running an external Lokinet daemon or deep integration into the p2p stack.' }
    ],
    openQs: ['Scalability of blockchain-based directory for high-churn P2P networks.', 'Optimal path length for Ethereum slot time compliance.'],
    refs: [
      '[Lokinet: A Decentralized, Layer 3 Onion Router](https://lokinet.org/)',
      '[Quantifying the Privacy Guarantees of Validator Privacy Mechanisms (ethresear.ch)](https://ethresear.ch/t/quantifying-the-privacy-guarantees-of-validator-privacy-mechanisms/15611)',
      '[Oxen Network (formerly Loki) Whitepaper](https://oxen.io/whitepaper)'
    ],
  },
  {
    id: 'A15',
    name: 'ZK-Attestations (with RLN)',
    cat: 'identity',
    maturity: 'research',
    desc: 'Replacing raw validator signatures in attestations with succinct ZK proofs of signature possession. It uses Rate-Limiting Nullifiers (RLN) to prevent DoS/spam via equivocation while maintaining full validator-set anonymity.',
    benefits: [
      { id: 'P3', note: 'Full validator-set anonymity by hiding the specific signer identity.' },
      { id: 'P4', note: 'RLN bounds rate to 1 attestation per slot, preventing equivocation spam.' }
    ],
    hurts: [
      { id: 'P1', note: 'Proof generation and recursive aggregation add significant latency to the consensus path.' },
      { id: 'P2', note: 'ZK proofs (e.g., plonky3) are larger than standard signatures, increasing bandwidth load.' },
      { id: 'P7', note: 'Requires complex circuit design for signature verification and Merkle membership.' }
    ],
    openQs: ['Reward distribution mechanism for hidden identities.', 'Recursive proof aggregation performance on consumer hardware.'],
    refs: [
      '[Anonymous Rate-Limited Credentials (draft-irtf-cfrg-arc)](https://datatracker.ietf.org/doc/draft-irtf-cfrg-arc/)'
    ],
  },
  {
    id: 'A16',
    name: 'Walking Onions',
    cat: 'routing',
    maturity: 'research',
    desc: 'A scaling mechanism for onion routing networks that eliminates the need for clients to download a complete directory of all relays. Clients retrieve relay descriptors on-demand during circuit extension using certified indices.',
    benefits: [
      { id: 'P2', note: 'Drastically reduces client directory download bandwidth, scaling linearly with network growth.' },
      { id: 'P1', note: 'Eliminates front-loaded directory download delays for new clients.' }
    ],
    hurts: [
      { id: 'P7', note: 'Requires an Efficient Network Directory with Individually Verifiable Entries (ENDIVE).' }
    ],
    openQs: ['Managing feature parity with Tor\'s current relay selection logic.', 'Security of on-demand descriptor retrieval against statistical attacks.'],
    refs: [
      '[Walking Onions: Scaling and Saving Bandwidth (Tor Proposal 300)](https://gitlab.torproject.org/tpo/core/torspec/-/blob/main/proposals/300-walking-onions.txt)'
    ],
  },
  {
    id: 'A17',
    name: 'Whisk (SSLE Protocol)',
    cat: 'identity',
    maturity: 'research',
    desc: 'A privacy-preserving Single Secret Leader Election (SSLE) protocol for Ethereum that uses shuffles and zero-knowledge proofs to hide the identity of the next block proposer until they actually publish a block.',
    benefits: [
      { id: 'P3', note: 'Prevents targeted DoS attacks on upcoming proposers by hiding their IP/identity.' },
      { id: 'P4', note: 'Maintains Sybil resistance via the existing validator deposit mechanism.' }
    ],
    hurts: [
      { id: 'P7', note: 'Requires complex on-chain shuffles and ZK proof verification.' }
    ],
    openQs: ['Integration with the existing beacon chain fork choice and block production pipeline.'],
    refs: [
      '[Whisk: A practical approach to Proposer Anonymity](https://ethresear.ch/t/whisk-a-practical-approach-to-proposer-anonymity/11863)'
    ],
  },
  {
    id: 'A18',
    name: 'Single Secret Leader Election (SSLE)',
    cat: 'identity',
    maturity: 'research',
    desc: 'A cryptographic primitive that ensures only the elected leader knows they are the leader until they reveal themselves by producing a block. This prevents adversaries from identifying and attacking the leader before the block is broadcast.',
    benefits: [
      { id: 'P3', note: 'Critical for proposer anonymity and preventing adaptive DoS attacks.' }
    ],
    hurts: [
      { id: 'P7', note: 'High implementation complexity depending on the underlying cryptographic primitives (e.g., DDH, shuffles).' }
    ],
    openQs: ['Trade-offs between different SSLE constructions (e.g., Whisk vs. secret-sharing based).'],
    refs: [
      '[Single Secret Leader Election (Boneh et al.)](https://eprint.iacr.org/2020/025)'
    ],
  },
  {
    id: 'A19',
    name: 'Karmic Onion Routing',
    cat: 'routing',
    maturity: 'research',
    desc: 'An incentivized onion routing mechanism that rewards relays for honest behavior and punishes malicious or unreliable nodes using a reputation or "karma" system, often integrated with financial staking.',
    benefits: [
      { id: 'P4', note: 'Provides additional resistance against malicious relay nodes in an onion network.' }
    ],
    hurts: [
      { id: 'P7', note: 'Complexity in designing a tamper-proof and private reputation system.' }
    ],
    openQs: ['Privacy-preserving reputation updates without revealing circuit paths.'],
    refs: [
      '[Karmic: A Reputation System for Onion Routing](https://arxiv.org/abs/2105.10173)'
    ],
  },
  {
    id: 'A20',
    name: 'Onion Routing Flow Control (SENDME)',
    cat: 'routing',
    maturity: 'implementation',
    desc: 'An end-to-end flow control mechanism (like Tor\'s SENDME cells) that prevents senders from overwhelming the buffers of relays or the final recipient in a multi-hop onion circuit. It operates independently of the underlying TCP/UDP flow control.',
    benefits: [
      { id: 'P1', note: 'Maintains predictable latency by preventing bufferbloat at relay nodes.' }
    ],
    hurts: [
      { id: 'P2', note: 'Additional control cells increase bandwidth overhead.' }
    ],
    openQs: ['Optimizing window sizes for the specific latency requirements of Ethereum attestations.'],
    refs: [
      '[Tor Protocol Specification (Section 6.2: Flow Control)](https://gitlab.torproject.org/tpo/core/torspec/-/blob/main/tor-spec.txt)'
    ],
  },
];
