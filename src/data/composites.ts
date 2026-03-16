export interface Composite {
  id: string;
  name: string;
  maturity: 'research' | 'development' | 'implementation' | 'deployed';
  atoms: string[];
  desc: string;
  keyProps: string;
  limitations: string;
  refs: string[];
}

export const COMPOSITES: Composite[] = [
  {
    id: 'prioritized-meshes',
    name: 'Prioritized Validator Meshes',
    maturity: 'research',
    atoms: ['A1', 'A3', 'A6'],
    desc: 'High-trust overlay networks restricted to active validators, secured by anonymous ZK credentials and global rate limiting.',
    keyProps: 'Sybil resistance, high-speed propagation, identity anonymity.',
    limitations: 'Computational cost of ZK-PoV, potential for validator exclusion if trees are out of sync.',
    refs: ['[Proof of Validator: A simple anonymous credential scheme](https://ethresear.ch/t/proof-of-validator-a-simple-anonymous-credential-scheme-for-ethereums-dht/16454)'],
  },
  {
    id: 'fast-l1-privacy',
    name: 'Fast L1 Privacy Stack',
    maturity: 'research',
    atoms: ['A2', 'A4', 'A6', 'A7'],
    desc: 'A collection of routing and obfuscation techniques designed to support 2-second slot times while maintaining validator and user anonymity.',
    keyProps: 'Extreme low latency, GPA resistance, threshold non-collusion, volumetric obfuscation.',
    limitations: 'High bandwidth overhead from decoy traffic and secret sharing, complexity of TEE-client management.',
    refs: ['[Possible futures of the Ethereum protocol, part 2: The Surge](https://vitalik.eth.limo/general/2024/10/17/futures2.html)'],
  },
  {
    id: 'collaborative-building',
    name: 'Collaborative Decentralized Building',
    maturity: 'research',
    atoms: ['A7', 'A10', 'A11'],
    desc: 'A modular block-building pipeline that leverages TEEs and anonymous broadcast to allow multiple actors to collaboratively produce blocks without centralized gateways.',
    keyProps: 'Censorship resistance, metadata privacy, permissionless building, cross-domain MEV handling.',
    limitations: 'Reliance on hardware trust roots (TEEs), high coordination complexity between co-builders.',
    refs: ['[decentralized building: wat do? (Flashbots)](https://writings.flashbots.net/decentralized-building-wat-do/)'],
  },
];
