import { ErrorPattern } from '../types/troubleshooter'

export const errorPatterns: ErrorPattern[] = [
  // Existing patterns
  {
    id: 'too_many_open_files',
    patterns: [
      'Too many open files (os error 24)',
      'too many open files',
      'os error 24',
      'file descriptor limit'
    ],
    category: 'setup',
    title: 'Too Many Open Files Error',
    description: 'System file descriptor limit exceeded during build process'
  },
  {
    id: 'docker_nvidia_runtime',
    patterns: [
      'nvidia runtime not found',
      'nvidia-container-runtime',
      'could not select device driver',
      'nvidia-docker',
      'gpu not accessible'
    ],
    category: 'gpu',
    title: 'NVIDIA Docker Runtime Issues',
    description: 'Problems with NVIDIA Docker runtime or GPU access'
  },
  {
    id: 'cuda_out_of_memory',
    patterns: [
      'cuda out of memory',
      'out of memory',
      'insufficient gpu memory',
      'vram',
      'segment_size too large'
    ],
    category: 'gpu',
    title: 'CUDA Out of Memory',
    description: 'GPU memory insufficient for current segment size'
  },
  {
    id: 'rust_installation',
    patterns: [
      'cargo not found',
      'rustc not found',
      'rust toolchain',
      'rustup not installed',
      'cargo install failed'
    ],
    category: 'dependencies',
    title: 'Rust Installation Issues',
    description: 'Problems with Rust toolchain installation or configuration'
  },
  {
    id: 'docker_compose_failed',
    patterns: [
      'docker compose failed',
      'compose.yml',
      'service failed to start',
      'container exited',
      'docker daemon not running'
    ],
    category: 'docker',
    title: 'Docker Compose Issues',
    description: 'Problems with Docker Compose services or configuration'
  },
  {
    id: 'network_rpc_issues',
    patterns: [
      'rpc connection failed',
      'eth_newblockfilter',
      'rpc endpoint',
      'connection refused',
      'network timeout'
    ],
    category: 'network',
    title: 'RPC Network Connection Issues',
    description: 'Problems connecting to RPC endpoints or network configuration'
  },
  {
    id: 'stake_deposit_failed',
    patterns: [
      'deposit stake failed',
      'insufficient usdc',
      'stake balance',
      'boundless account',
      'deposit-stake'
    ],
    category: 'configuration',
    title: 'Stake Deposit Issues',
    description: 'Problems with depositing USDC stake to Boundless Market'
  },
  {
    id: 'gpu_device_not_found',
    patterns: [
      'gpu device not found',
      'nvidia-smi failed',
      'no cuda devices',
      'device_ids',
      'gpu not detected'
    ],
    category: 'gpu',
    title: 'GPU Device Detection Issues',
    description: 'System cannot detect or access GPU devices'
  },
  {
    id: 'bento_benchmark_failed',
    patterns: [
      'bento benchmark failed',
      'bento_cli failed',
      'test proof failed',
      'job failed',
      'proving failed'
    ],
    category: 'runtime',
    title: 'Bento Benchmark Failures',
    description: 'Issues with running Bento benchmarks or test proofs'
  },
  {
    id: 'broker_config_issues',
    patterns: [
      'broker.toml',
      'config file not found',
      'mcycle_price',
      'peak_prove_khz',
      'broker configuration'
    ],
    category: 'configuration',
    title: 'Broker Configuration Issues',
    description: 'Problems with broker.toml configuration file'
  },
  {
    id: 'dependency_installation',
    patterns: [
      'apt update failed',
      'package not found',
      'dependency installation',
      'setup.sh failed',
      'curl failed'
    ],
    category: 'dependencies',
    title: 'System Dependencies Installation',
    description: 'Issues installing required system packages and dependencies'
  },
  {
    id: 'private_key_issues',
    patterns: [
      'private key',
      'invalid private key',
      'wallet configuration',
      'private_key not set',
      'authentication failed'
    ],
    category: 'configuration',
    title: 'Private Key Configuration Issues',
    description: 'Problems with wallet private key setup or format'
  },
  
  // New patterns from official documentation
  {
    id: 'boundless_cli_not_found',
    patterns: [
      'boundless command not found',
      'boundless: not found',
      'boundless cli not installed',
      'cargo install boundless-cli failed'
    ],
    category: 'dependencies',
    title: 'Boundless CLI Not Installed',
    description: 'Boundless CLI is not installed or not in PATH'
  },
  {
    id: 'risc_zero_installation',
    patterns: [
      'rzup not found',
      'risc zero not installed',
      'cargo-risczero not found',
      'rzup install failed',
      'risc zero toolchain'
    ],
    category: 'dependencies',
    title: 'RISC Zero Installation Issues',
    description: 'Problems installing or configuring RISC Zero toolchain'
  },
  {
    id: 'just_command_not_found',
    patterns: [
      'just: command not found',
      'just not found',
      'justfile',
      'cargo install just failed'
    ],
    category: 'dependencies',
    title: 'Just Command Runner Not Found',
    description: 'Just command runner is not installed'
  },
  {
    id: 'insufficient_stake',
    patterns: [
      'insufficient stake',
      'stake too low',
      'minimum stake required',
      'stake balance insufficient',
      'need more usdc'
    ],
    category: 'configuration',
    title: 'Insufficient Stake Balance',
    description: 'Not enough USDC staked to participate in proving'
  },
  {
    id: 'network_selection_issues',
    patterns: [
      'wrong network',
      'network mismatch',
      'base mainnet',
      'base sepolia',
      'chain id mismatch'
    ],
    category: 'network',
    title: 'Network Selection Issues',
    description: 'Problems with blockchain network configuration'
  },
  {
    id: 'wallet_connection_failed',
    patterns: [
      'wallet connection failed',
      'failed to connect wallet',
      'wallet not connected',
      'authentication error',
      'invalid signature'
    ],
    category: 'configuration',
    title: 'Wallet Connection Issues',
    description: 'Problems connecting wallet to Boundless platform'
  },
  {
    id: 'gpu_memory_insufficient',
    patterns: [
      'gpu memory too small',
      'minimum 8gb gpu required',
      'gpu memory insufficient',
      'vram too low',
      'gpu requirements not met'
    ],
    category: 'gpu',
    title: 'GPU Memory Requirements Not Met',
    description: 'GPU does not meet minimum memory requirements'
  },
  {
    id: 'docker_permission_denied',
    patterns: [
      'docker: permission denied',
      'cannot connect to docker daemon',
      'docker socket permission',
      'got permission denied while trying to connect'
    ],
    category: 'docker',
    title: 'Docker Permission Issues',
    description: 'User lacks permissions to access Docker daemon'
  },
  {
    id: 'port_already_in_use',
    patterns: [
      'port already in use',
      'address already in use',
      'bind: address already in use',
      'port 8080 already in use'
    ],
    category: 'runtime',
    title: 'Port Conflicts',
    description: 'Required ports are already occupied by other services'
  },
  {
    id: 'git_clone_failed',
    patterns: [
      'git clone failed',
      'repository not found',
      'permission denied (publickey)',
      'could not read from remote repository'
    ],
    category: 'setup',
    title: 'Git Repository Access Issues',
    description: 'Problems cloning the Boundless repository'
  },
  {
    id: 'environment_variables_missing',
    patterns: [
      'environment variable not set',
      'rpc_url not set',
      'private_key not set',
      'missing environment variables'
    ],
    category: 'configuration',
    title: 'Missing Environment Variables',
    description: 'Required environment variables are not configured'
  },
  {
    id: 'usdc_faucet_issues',
    patterns: [
      'usdc faucet failed',
      'faucet not working',
      'cannot get test usdc',
      'faucet rate limited'
    ],
    category: 'configuration',
    title: 'USDC Faucet Issues',
    description: 'Problems obtaining test USDC from faucet'
  },
  {
    id: 'prover_registration_failed',
    patterns: [
      'prover registration failed',
      'failed to register prover',
      'registration error',
      'prover not registered'
    ],
    category: 'configuration',
    title: 'Prover Registration Issues',
    description: 'Problems registering prover with Boundless platform'
  },
  {
    id: 'benchmark_timeout',
    patterns: [
      'benchmark timeout',
      'benchmark taking too long',
      'benchmark stuck',
      'benchmark not completing'
    ],
    category: 'runtime',
    title: 'Benchmark Timeout Issues',
    description: 'Benchmarks are timing out or taking too long to complete'
  },
  {
    id: 'insufficient_gas',
    patterns: [
      'insufficient gas',
      'out of gas',
      'gas limit exceeded',
      'transaction failed: gas'
    ],
    category: 'network',
    title: 'Insufficient Gas for Transactions',
    description: 'Not enough ETH for gas fees or gas limit too low'
  }
]
