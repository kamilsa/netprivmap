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
      '[Proof of Validator: A simple anonymous credential scheme](https://ethresear.ch/t/proof-of-validator-a-simple-anonymous-credential-scheme-for-ethereums-dht/16454)'
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
      '[Packetology: Validator Privacy (jrhea)](https://ethresear.ch/t/packetology-validator-privacy/7547)'
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
      '[Gossipsub’s partial messages extension and cell-level dissemination (Topic 23017)](https://ethresear.ch/t/gossipsub-s-partial-messages-extension-and-cell-level-dissemination/23017)'
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
];
