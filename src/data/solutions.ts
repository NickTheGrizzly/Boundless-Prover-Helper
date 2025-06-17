import { Solution } from '../types/troubleshooter'

export const solutions: Record<string, Solution[]> = {
  // Existing solutions
  too_many_open_files: [
    {
      title: 'Increase File Descriptor Limits',
      description: 'Modify system limits to allow more open files',
      steps: [
        {
          type: 'instruction',
          content: 'Edit the system limits configuration file'
        },
        {
          type: 'command',
          content: 'nano /etc/security/limits.conf',
          description: 'Open the limits configuration file'
        },
        {
          type: 'instruction',
          content: 'Add the following lines to the file:'
        },
        {
          type: 'command',
          content: '* soft nofile 65535\n* hard nofile 65535'
        },
        {
          type: 'instruction',
          content: 'Edit Docker service configuration'
        },
        {
          type: 'command',
          content: 'nano /lib/systemd/system/docker.service',
          description: 'Open Docker service file'
        },
        {
          type: 'instruction',
          content: 'Add or modify the following under [Service] section:'
        },
        {
          type: 'command',
          content: 'LimitNOFILE=65535'
        },
        {
          type: 'instruction',
          content: 'Reload and restart Docker'
        },
        {
          type: 'command',
          content: 'systemctl daemon-reload\nsystemctl restart docker',
          description: 'Apply changes and restart Docker'
        },
        {
          type: 'instruction',
          content: 'Restart your terminal and re-inject network environment before running broker'
        }
      ],
      additionalNotes: [
        'You may need to log out and log back in for user limits to take effect',
        'Verify the changes with: ulimit -n'
      ]
    }
  ],

  docker_nvidia_runtime: [
    {
      title: 'Install NVIDIA Container Runtime',
      description: 'Set up NVIDIA Docker runtime for GPU access',
      steps: [
        {
          type: 'instruction',
          content: 'Install NVIDIA Container Toolkit'
        },
        {
          type: 'command',
          content: 'distribution=$(. /etc/os-release;echo $ID$VERSION_ID)\ncurl -s -L https://nvidia.github.io/nvidia-docker/gpgkey | sudo apt-key add -\ncurl -s -L https://nvidia.github.io/nvidia-docker/$distribution/nvidia-docker.list | sudo tee /etc/apt/sources.list.d/nvidia-docker.list',
          description: 'Add NVIDIA Docker repository'
        },
        {
          type: 'command',
          content: 'apt update\napt install -y nvidia-docker2',
          description: 'Install NVIDIA Docker runtime'
        },
        {
          type: 'command',
          content: 'systemctl restart docker',
          description: 'Restart Docker service'
        },
        {
          type: 'instruction',
          content: 'Test GPU access in Docker'
        },
        {
          type: 'command',
          content: 'docker run --rm --gpus all nvidia/cuda:11.0-base nvidia-smi',
          description: 'Verify GPU access works in containers'
        }
      ],
      additionalNotes: [
        'Ensure NVIDIA drivers are installed first',
        'Your GPU must support CUDA for this to work'
      ]
    }
  ],

  cuda_out_of_memory: [
    {
      title: 'Reduce Segment Size',
      description: 'Lower SEGMENT_SIZE to fit your GPU memory',
      steps: [
        {
          type: 'instruction',
          content: 'Check your GPU memory with nvidia-smi'
        },
        {
          type: 'command',
          content: 'nvidia-smi',
          description: 'Check available GPU memory'
        },
        {
          type: 'instruction',
          content: 'Edit compose.yml to reduce SEGMENT_SIZE'
        },
        {
          type: 'command',
          content: 'nano compose.yml',
          description: 'Open Docker Compose configuration'
        },
        {
          type: 'instruction',
          content: 'Find the x-exec-agent-common section and modify SEGMENT_SIZE:'
        },
        {
          type: 'command',
          content: 'entrypoint: /app/agent -t exec --segment-po2 ${SEGMENT_SIZE:-20}'
        },
        {
          type: 'warning',
          content: 'Use SEGMENT_SIZE=20 for 8GB GPUs, 19 for 4GB GPUs, 21 for 20GB+ GPUs'
        },
        {
          type: 'instruction',
          content: 'Restart the services'
        },
        {
          type: 'command',
          content: 'just broker down\njust broker',
          description: 'Restart with new configuration'
        }
      ],
      additionalNotes: [
        'Lower segment sizes reduce performance but use less memory',
        'You can also set SEGMENT_SIZE in your .env file'
      ]
    }
  ],

  rust_installation: [
    {
      title: 'Install Rust Toolchain',
      description: 'Complete Rust installation and configuration',
      steps: [
        {
          type: 'instruction',
          content: 'Install Rustup (Rust installer)'
        },
        {
          type: 'command',
          content: 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh',
          description: 'Download and install Rustup'
        },
        {
          type: 'command',
          content: '. "$HOME/.cargo/env"',
          description: 'Load Rust environment'
        },
        {
          type: 'instruction',
          content: 'Update Rust and install Cargo'
        },
        {
          type: 'command',
          content: 'rustup update\napt update\napt install cargo',
          description: 'Update Rust and install Cargo package manager'
        },
        {
          type: 'instruction',
          content: 'Install RISC Zero toolchain'
        },
        {
          type: 'command',
          content: 'curl -L https://risczero.com/install | bash\nsource ~/.bashrc',
          description: 'Install rzup (RISC Zero installer)'
        },
        {
          type: 'command',
          content: 'rzup install rust\ncargo install cargo-risczero\nrzup install cargo-risczero',
          description: 'Install RISC Zero Rust toolchain'
        },
        {
          type: 'instruction',
          content: 'Install Boundless CLI'
        },
        {
          type: 'command',
          content: 'cargo install --locked boundless-cli\nexport PATH=$PATH:/root/.cargo/bin\nsource ~/.bashrc',
          description: 'Install and configure Boundless CLI'
        },
        {
          type: 'instruction',
          content: 'Verify installations'
        },
        {
          type: 'command',
          content: 'cargo --version\nrzup --version\nboundless -h',
          description: 'Check that all tools are properly installed'
        }
      ]
    }
  ],

  docker_compose_failed: [
    {
      title: 'Fix Docker Compose Issues',
      description: 'Troubleshoot common Docker Compose problems',
      steps: [
        {
          type: 'instruction',
          content: 'Check Docker daemon status'
        },
        {
          type: 'command',
          content: 'systemctl status docker',
          description: 'Verify Docker is running'
        },
        {
          type: 'instruction',
          content: 'If Docker is not running, start it'
        },
        {
          type: 'command',
          content: 'systemctl start docker\nsystemctl enable docker',
          description: 'Start and enable Docker service'
        },
        {
          type: 'instruction',
          content: 'Check compose.yml syntax'
        },
        {
          type: 'command',
          content: 'docker compose config',
          description: 'Validate Docker Compose configuration'
        },
        {
          type: 'instruction',
          content: 'Clean up and restart services'
        },
        {
          type: 'command',
          content: 'just broker clean\njust broker',
          description: 'Clean volumes and restart'
        },
        {
          type: 'instruction',
          content: 'Check service logs for specific errors'
        },
        {
          type: 'command',
          content: 'just broker logs',
          description: 'View detailed service logs'
        }
      ],
      additionalNotes: [
        'Make sure you have sufficient disk space',
        'Check that all required environment variables are set'
      ]
    }
  ],

  network_rpc_issues: [
    {
      title: 'Fix RPC Connection Issues',
      description: 'Resolve network and RPC endpoint problems',
      steps: [
        {
          type: 'instruction',
          content: 'Verify your RPC URL supports eth_newBlockFilter'
        },
        {
          type: 'instruction',
          content: 'Test RPC connection manually'
        },
        {
          type: 'command',
          content: 'curl -X POST -H "Content-Type: application/json" --data \'{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}\' $RPC_URL',
          description: 'Test basic RPC connectivity'
        },
        {
          type: 'instruction',
          content: 'Check your .env file configuration'
        },
        {
          type: 'command',
          content: 'cat .env.base',
          description: 'Verify environment variables'
        },
        {
          type: 'instruction',
          content: 'Re-inject environment variables'
        },
        {
          type: 'command',
          content: 'source .env.base',
          description: 'Reload network configuration'
        },
        {
          type: 'instruction',
          content: 'Try alternative RPC providers'
        },
        {
          type: 'instruction',
          content: 'Recommended providers: BlockPi, Alchemy, Chainstack'
        }
      ],
      additionalNotes: [
        'Ensure RPC URL is wrapped in quotes in .env file',
        'Some providers require API keys',
        'Free tier limits may cause connection issues'
      ]
    }
  ],

  stake_deposit_failed: [
    {
      title: 'Fix Stake Deposit Issues',
      description: 'Resolve USDC stake deposit problems',
      steps: [
        {
          type: 'instruction',
          content: 'Check your USDC balance'
        },
        {
          type: 'instruction',
          content: 'For testnets, get USDC from Circle Faucet: https://faucet.circle.com/'
        },
        {
          type: 'instruction',
          content: 'Verify your private key is correctly set'
        },
        {
          type: 'command',
          content: 'echo $PRIVATE_KEY',
          description: 'Check if private key is loaded (should show your key)'
        },
        {
          type: 'instruction',
          content: 'Check current stake balance'
        },
        {
          type: 'command',
          content: 'boundless account stake-balance',
          description: 'View current stake balance'
        },
        {
          type: 'instruction',
          content: 'Attempt deposit with smaller amount first'
        },
        {
          type: 'command',
          content: 'boundless account deposit-stake 10',
          description: 'Try depositing 10 USDC first'
        },
        {
          type: 'instruction',
          content: 'Check transaction on block explorer if it fails'
        }
      ],
      additionalNotes: [
        'Ensure you have enough ETH for gas fees',
        'USDC addresses differ between networks',
        'Wait for transaction confirmation before retrying'
      ]
    }
  ],

  gpu_device_not_found: [
    {
      title: 'Fix GPU Detection Issues',
      description: 'Resolve GPU device detection and access problems',
      steps: [
        {
          type: 'instruction',
          content: 'Check if NVIDIA drivers are installed'
        },
        {
          type: 'command',
          content: 'nvidia-smi',
          description: 'Test NVIDIA driver installation'
        },
        {
          type: 'instruction',
          content: 'If nvidia-smi fails, install NVIDIA drivers'
        },
        {
          type: 'command',
          content: 'apt update\napt install nvidia-driver-470',
          description: 'Install NVIDIA drivers (adjust version as needed)'
        },
        {
          type: 'instruction',
          content: 'Reboot system after driver installation'
        },
        {
          type: 'command',
          content: 'reboot',
          description: 'Restart to load new drivers'
        },
        {
          type: 'instruction',
          content: 'Check GPU device IDs'
        },
        {
          type: 'command',
          content: 'nvidia-smi -L',
          description: 'List all GPU devices and their IDs'
        },
        {
          type: 'instruction',
          content: 'Update compose.yml with correct device IDs'
        },
        {
          type: 'command',
          content: 'nano compose.yml',
          description: 'Edit GPU device assignments'
        }
      ],
      additionalNotes: [
        'GPU device IDs start from 0',
        'Make sure your GPU supports CUDA',
        'Some cloud providers require specific driver versions'
      ]
    }
  ],

  bento_benchmark_failed: [
    {
      title: 'Fix Bento Benchmark Issues',
      description: 'Resolve problems with Bento testing and benchmarking',
      steps: [
        {
          type: 'instruction',
          content: 'Ensure Bento is running'
        },
        {
          type: 'command',
          content: 'just bento',
          description: 'Start Bento services'
        },
        {
          type: 'instruction',
          content: 'Check Bento logs for errors'
        },
        {
          type: 'command',
          content: 'just bento logs',
          description: 'View Bento service logs'
        },
        {
          type: 'instruction',
          content: 'Try a smaller test first'
        },
        {
          type: 'command',
          content: 'RUST_LOG=info bento_cli -c 32',
          description: 'Run minimal test proof'
        },
        {
          type: 'instruction',
          content: 'If successful, gradually increase test size'
        },
        {
          type: 'command',
          content: 'RUST_LOG=info bento_cli -c 1024',
          description: 'Run larger test'
        },
        {
          type: 'instruction',
          content: 'Monitor GPU utilization during tests'
        },
        {
          type: 'command',
          content: 'nvtop',
          description: 'Monitor GPU usage in separate terminal'
        }
      ],
      additionalNotes: [
        'Start with small iteration counts and increase gradually',
        'Check GPU memory usage during benchmarks',
        'Ensure sufficient system RAM is available'
      ]
    }
  ],

  broker_config_issues: [
    {
      title: 'Fix Broker Configuration',
      description: 'Resolve broker.toml configuration problems',
      steps: [
        {
          type: 'instruction',
          content: 'Create broker.toml from template'
        },
        {
          type: 'command',
          content: 'cp broker-template.toml broker.toml',
          description: 'Copy template configuration'
        },
        {
          type: 'instruction',
          content: 'Edit broker configuration'
        },
        {
          type: 'command',
          content: 'nano broker.toml',
          description: 'Open broker configuration file'
        },
        {
          type: 'instruction',
          content: 'Set appropriate mcycle_price (start with 0.000001)'
        },
        {
          type: 'instruction',
          content: 'Configure peak_prove_khz based on your benchmark results'
        },
        {
          type: 'instruction',
          content: 'Set max_concurrent_proofs conservatively (start with 1-2)'
        },
        {
          type: 'warning',
          content: 'Lower mcycle_price increases competition but reduces profit per proof'
        },
        {
          type: 'instruction',
          content: 'Validate configuration syntax'
        },
        {
          type: 'instruction',
          content: 'Restart broker with new configuration'
        },
        {
          type: 'command',
          content: 'just broker down\njust broker',
          description: 'Apply new configuration'
        }
      ],
      additionalNotes: [
        'Monitor broker logs to see if orders are being detected',
        'Adjust mcycle_price based on market competition',
        'Higher max_concurrent_proofs requires more GPU memory'
      ]
    }
  ],

  dependency_installation: [
    {
      title: 'Fix Dependency Installation',
      description: 'Resolve system package installation issues',
      steps: [
        {
          type: 'instruction',
          content: 'Update package repositories'
        },
        {
          type: 'command',
          content: 'apt update && apt upgrade -y',
          description: 'Update system packages'
        },
        {
          type: 'instruction',
          content: 'Install required dependencies manually'
        },
        {
          type: 'command',
          content: 'apt install curl iptables build-essential git wget lz4 jq make gcc nano automake autoconf tmux htop nvme-cli libgbm1 pkg-config libssl-dev tar clang bsdmainutils ncdu unzip libleveldb-dev libclang-dev ninja-build -y',
          description: 'Install all required system packages'
        },
        {
          type: 'instruction',
          content: 'If setup.sh fails, run dependency installation manually'
        },
        {
          type: 'instruction',
          content: 'Check for specific package errors'
        },
        {
          type: 'command',
          content: 'apt list --installed | grep -E "(curl|git|docker)"',
          description: 'Verify key packages are installed'
        },
        {
          type: 'instruction',
          content: 'Install Docker manually if needed'
        },
        {
          type: 'command',
          content: 'curl -fsSL https://get.docker.com -o get-docker.sh\nsh get-docker.sh',
          description: 'Install Docker using official script'
        }
      ],
      additionalNotes: [
        'Some packages may require specific Ubuntu versions',
        'Check available disk space before installation',
        'Reboot may be required after installing certain packages'
      ]
    }
  ],

  private_key_issues: [
    {
      title: 'Fix Private Key Configuration',
      description: 'Resolve wallet private key setup issues',
      steps: [
        {
          type: 'warning',
          content: 'Never share your private key or commit it to version control'
        },
        {
          type: 'instruction',
          content: 'Ensure private key format is correct (64 hex characters without 0x prefix)'
        },
        {
          type: 'instruction',
          content: 'Edit your network environment file'
        },
        {
          type: 'command',
          content: 'nano .env.base',
          description: 'Edit Base network configuration'
        },
        {
          type: 'instruction',
          content: 'Set private key without 0x prefix:'
        },
        {
          type: 'command',
          content: 'export PRIVATE_KEY=your_64_character_hex_private_key'
        },
        {
          type: 'instruction',
          content: 'Ensure RPC URL is properly quoted'
        },
        {
          type: 'command',
          content: 'export RPC_URL="https://your-rpc-endpoint.com"'
        },
        {
          type: 'instruction',
          content: 'Re-inject environment variables'
        },
        {
          type: 'command',
          content: 'source .env.base',
          description: 'Load updated configuration'
        },
        {
          type: 'instruction',
          content: 'Test configuration'
        },
        {
          type: 'command',
          content: 'boundless account stake-balance',
          description: 'Verify wallet connection'
        }
      ],
      additionalNotes: [
        'Use a dedicated wallet for prover operations',
        'Ensure wallet has sufficient ETH for gas fees',
        'Private key should be from the same network you\'re using'
      ]
    }
  ],

  // New solutions from official documentation
  boundless_cli_not_found: [
    {
      title: 'Install Boundless CLI',
      description: 'Install and configure the Boundless command-line interface',
      steps: [
        {
          type: 'instruction',
          content: 'Ensure Rust and Cargo are installed first'
        },
        {
          type: 'command',
          content: 'curl --proto \'=https\' --tlsv1.2 -sSf https://sh.rustup.rs | sh',
          description: 'Install Rust if not already installed'
        },
        {
          type: 'command',
          content: 'source ~/.cargo/env',
          description: 'Load Rust environment'
        },
        {
          type: 'instruction',
          content: 'Install Boundless CLI from crates.io'
        },
        {
          type: 'command',
          content: 'cargo install --locked boundless-cli',
          description: 'Install the latest Boundless CLI'
        },
        {
          type: 'instruction',
          content: 'Add Cargo bin to PATH'
        },
        {
          type: 'command',
          content: 'echo \'export PATH="$HOME/.cargo/bin:$PATH"\' >> ~/.bashrc\nsource ~/.bashrc',
          description: 'Ensure Cargo binaries are in PATH'
        },
        {
          type: 'instruction',
          content: 'Verify installation'
        },
        {
          type: 'command',
          content: 'boundless --help',
          description: 'Test that Boundless CLI is working'
        }
      ],
      additionalNotes: [
        'You may need to restart your terminal after installation',
        'Ensure you have a stable internet connection for the download'
      ]
    }
  ],

  risc_zero_installation: [
    {
      title: 'Install RISC Zero Toolchain',
      description: 'Set up the complete RISC Zero development environment',
      steps: [
        {
          type: 'instruction',
          content: 'Install rzup (RISC Zero installer)'
        },
        {
          type: 'command',
          content: 'curl -L https://risczero.com/install | bash',
          description: 'Download and install rzup'
        },
        {
          type: 'command',
          content: 'source ~/.bashrc',
          description: 'Reload shell configuration'
        },
        {
          type: 'instruction',
          content: 'Install RISC Zero Rust toolchain'
        },
        {
          type: 'command',
          content: 'rzup install rust',
          description: 'Install RISC Zero Rust components'
        },
        {
          type: 'instruction',
          content: 'Install cargo-risczero'
        },
        {
          type: 'command',
          content: 'cargo install cargo-risczero\nrzup install cargo-risczero',
          description: 'Install RISC Zero Cargo extension'
        },
        {
          type: 'instruction',
          content: 'Verify installation'
        },
        {
          type: 'command',
          content: 'rzup --version\ncargo risczero --version',
          description: 'Check RISC Zero tools are working'
        }
      ],
      additionalNotes: [
        'RISC Zero requires Rust to be installed first',
        'Installation may take several minutes depending on your connection'
      ]
    }
  ],

  just_command_not_found: [
    {
      title: 'Install Just Command Runner',
      description: 'Install the Just command runner for project automation',
      steps: [
        {
          type: 'instruction',
          content: 'Install Just using Cargo'
        },
        {
          type: 'command',
          content: 'cargo install just',
          description: 'Install Just command runner'
        },
        {
          type: 'instruction',
          content: 'Alternative: Install via package manager'
        },
        {
          type: 'command',
          content: 'apt update\napt install just',
          description: 'Install Just via apt (Ubuntu/Debian)'
        },
        {
          type: 'instruction',
          content: 'Verify installation'
        },
        {
          type: 'command',
          content: 'just --version',
          description: 'Check that Just is installed correctly'
        },
        {
          type: 'instruction',
          content: 'Test with Boundless project'
        },
        {
          type: 'command',
          content: 'just --list',
          description: 'List available commands in the project'
        }
      ],
      additionalNotes: [
        'Just is used to run predefined commands in the Boundless project',
        'Make sure you\'re in the Boundless project directory when using Just'
      ]
    }
  ],

  insufficient_stake: [
    {
      title: 'Increase Stake Balance',
      description: 'Add more USDC stake to meet minimum requirements',
      steps: [
        {
          type: 'instruction',
          content: 'Check current stake balance'
        },
        {
          type: 'command',
          content: 'boundless account stake-balance',
          description: 'View your current stake'
        },
        {
          type: 'instruction',
          content: 'For testnet: Get USDC from faucet'
        },
        {
          type: 'command',
          content: 'curl -X POST https://faucet.circle.com/api/v1/faucet -H "Content-Type: application/json" -d \'{"address":"YOUR_WALLET_ADDRESS","blockchain":"ETH"}\'',
          description: 'Request test USDC from Circle faucet'
        },
        {
          type: 'instruction',
          content: 'For mainnet: Ensure you have sufficient USDC in your wallet'
        },
        {
          type: 'instruction',
          content: 'Deposit additional stake'
        },
        {
          type: 'command',
          content: 'boundless account deposit-stake 100',
          description: 'Deposit 100 USDC (adjust amount as needed)'
        },
        {
          type: 'instruction',
          content: 'Verify the deposit was successful'
        },
        {
          type: 'command',
          content: 'boundless account stake-balance',
          description: 'Confirm new stake balance'
        }
      ],
      additionalNotes: [
        'Minimum stake requirements may vary by network',
        'Higher stakes may increase your chances of receiving proving jobs',
        'Ensure you have ETH for gas fees when depositing stake'
      ]
    }
  ],

  network_selection_issues: [
    {
      title: 'Configure Correct Network',
      description: 'Set up the proper blockchain network configuration',
      steps: [
        {
          type: 'instruction',
          content: 'Determine which network you want to use'
        },
        {
          type: 'instruction',
          content: 'For Base Mainnet, use the .env.base file'
        },
        {
          type: 'command',
          content: 'cp .env.base.example .env.base',
          description: 'Create Base mainnet configuration'
        },
        {
          type: 'instruction',
          content: 'For Base Sepolia testnet, use .env.base-sepolia'
        },
        {
          type: 'command',
          content: 'cp .env.base-sepolia.example .env.base-sepolia',
          description: 'Create Base Sepolia configuration'
        },
        {
          type: 'instruction',
          content: 'Edit the appropriate environment file'
        },
        {
          type: 'command',
          content: 'nano .env.base',
          description: 'Configure your network settings'
        },
        {
          type: 'instruction',
          content: 'Set your RPC URL and private key'
        },
        {
          type: 'command',
          content: 'export RPC_URL="https://your-base-rpc-url"\nexport PRIVATE_KEY="your_private_key_without_0x"',
          description: 'Configure network connection'
        },
        {
          type: 'instruction',
          content: 'Source the environment file'
        },
        {
          type: 'command',
          content: 'source .env.base',
          description: 'Load network configuration'
        }
      ],
      additionalNotes: [
        'Base Mainnet requires real ETH and USDC',
        'Base Sepolia uses test tokens from faucets',
        'Ensure your wallet is configured for the correct network'
      ]
    }
  ],

  wallet_connection_failed: [
    {
      title: 'Fix Wallet Connection',
      description: 'Resolve wallet connectivity and authentication issues',
      steps: [
        {
          type: 'instruction',
          content: 'Verify your private key format'
        },
        {
          type: 'warning',
          content: 'Private key should be 64 hex characters without 0x prefix'
        },
        {
          type: 'instruction',
          content: 'Check that environment variables are set'
        },
        {
          type: 'command',
          content: 'echo $PRIVATE_KEY\necho $RPC_URL',
          description: 'Verify environment variables are loaded'
        },
        {
          type: 'instruction',
          content: 'Test wallet connection'
        },
        {
          type: 'command',
          content: 'boundless account balance',
          description: 'Check if wallet can connect and read balance'
        },
        {
          type: 'instruction',
          content: 'If connection fails, verify RPC endpoint'
        },
        {
          type: 'command',
          content: 'curl -X POST -H "Content-Type: application/json" --data \'{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":1}\' $RPC_URL',
          description: 'Test RPC connectivity'
        },
        {
          type: 'instruction',
          content: 'Ensure wallet has ETH for gas fees'
        }
      ],
      additionalNotes: [
        'Use a dedicated wallet for prover operations',
        'Keep your private key secure and never share it',
        'Some RPC providers have rate limits that may cause connection issues'
      ]
    }
  ],

  gpu_memory_insufficient: [
    {
      title: 'Address GPU Memory Requirements',
      description: 'Solutions for insufficient GPU memory',
      steps: [
        {
          type: 'instruction',
          content: 'Check your GPU specifications'
        },
        {
          type: 'command',
          content: 'nvidia-smi',
          description: 'View GPU memory and utilization'
        },
        {
          type: 'warning',
          content: 'Boundless Prover requires at least 8GB GPU memory for optimal performance'
        },
        {
          type: 'instruction',
          content: 'If you have less than 8GB, reduce segment size'
        },
        {
          type: 'command',
          content: 'export SEGMENT_SIZE=19',
          description: 'Set smaller segment size for 4GB GPUs'
        },
        {
          type: 'instruction',
          content: 'For 8GB GPUs, use default or slightly reduced size'
        },
        {
          type: 'command',
          content: 'export SEGMENT_SIZE=20',
          description: 'Recommended for 8GB GPUs'
        },
        {
          type: 'instruction',
          content: 'Update your environment file'
        },
        {
          type: 'command',
          content: 'echo "export SEGMENT_SIZE=20" >> .env.base',
          description: 'Persist segment size setting'
        },
        {
          type: 'instruction',
          content: 'Restart services with new configuration'
        },
        {
          type: 'command',
          content: 'just broker down\njust broker',
          description: 'Apply new GPU memory settings'
        }
      ],
      additionalNotes: [
        'Lower segment sizes reduce performance but allow operation on smaller GPUs',
        'Consider upgrading to a GPU with more memory for better performance',
        'Monitor GPU memory usage during operation with nvidia-smi'
      ]
    }
  ],

  docker_permission_denied: [
    {
      title: 'Fix Docker Permissions',
      description: 'Resolve Docker daemon access permissions',
      steps: [
        {
          type: 'instruction',
          content: 'Add your user to the docker group'
        },
        {
          type: 'command',
          content: 'sudo usermod -aG docker $USER',
          description: 'Add current user to docker group'
        },
        {
          type: 'instruction',
          content: 'Log out and log back in, or use newgrp'
        },
        {
          type: 'command',
          content: 'newgrp docker',
          description: 'Activate new group membership'
        },
        {
          type: 'instruction',
          content: 'Test Docker access'
        },
        {
          type: 'command',
          content: 'docker ps',
          description: 'Verify you can access Docker without sudo'
        },
        {
          type: 'instruction',
          content: 'If still having issues, check Docker socket permissions'
        },
        {
          type: 'command',
          content: 'sudo chmod 666 /var/run/docker.sock',
          description: 'Temporarily fix socket permissions'
        },
        {
          type: 'warning',
          content: 'The chmod command is a temporary fix. Adding user to docker group is the proper solution'
        }
      ],
      additionalNotes: [
        'You may need to restart your terminal or log out/in for group changes to take effect',
        'Being in the docker group gives significant system access - use carefully'
      ]
    }
  ],

  port_already_in_use: [
    {
      title: 'Resolve Port Conflicts',
      description: 'Fix issues with ports already being occupied',
      steps: [
        {
          type: 'instruction',
          content: 'Check which process is using the port'
        },
        {
          type: 'command',
          content: 'sudo lsof -i :8080',
          description: 'Find process using port 8080 (adjust port as needed)'
        },
        {
          type: 'instruction',
          content: 'Stop the conflicting service'
        },
        {
          type: 'command',
          content: 'sudo kill -9 <PID>',
          description: 'Kill the process using the port'
        },
        {
          type: 'instruction',
          content: 'Alternative: Stop all Boundless services and restart'
        },
        {
          type: 'command',
          content: 'just broker down\njust bento down',
          description: 'Stop all services'
        },
        {
          type: 'command',
          content: 'docker system prune -f',
          description: 'Clean up Docker resources'
        },
        {
          type: 'instruction',
          content: 'Restart services'
        },
        {
          type: 'command',
          content: 'just broker',
          description: 'Start broker services'
        }
      ],
      additionalNotes: [
        'Common conflicting ports: 8080, 3000, 5432',
        'Check if you have multiple instances of the same service running',
        'Some services may restart automatically after being killed'
      ]
    }
  ],

  git_clone_failed: [
    {
      title: 'Fix Git Repository Access',
      description: 'Resolve issues cloning the Boundless repository',
      steps: [
        {
          type: 'instruction',
          content: 'Ensure Git is installed'
        },
        {
          type: 'command',
          content: 'apt update\napt install git',
          description: 'Install Git if not present'
        },
        {
          type: 'instruction',
          content: 'Clone the repository using HTTPS'
        },
        {
          type: 'command',
          content: 'git clone https://github.com/BoundlessMarket/boundless.git',
          description: 'Clone Boundless repository'
        },
        {
          type: 'instruction',
          content: 'If you get permission errors, check your internet connection'
        },
        {
          type: 'instruction',
          content: 'Navigate to the cloned directory'
        },
        {
          type: 'command',
          content: 'cd boundless',
          description: 'Enter the project directory'
        },
        {
          type: 'instruction',
          content: 'Verify the clone was successful'
        },
        {
          type: 'command',
          content: 'ls -la',
          description: 'List files to confirm repository contents'
        }
      ],
      additionalNotes: [
        'Use HTTPS instead of SSH if you don\'t have SSH keys set up',
        'Ensure you have sufficient disk space for the repository',
        'Check your firewall settings if clone fails'
      ]
    }
  ],

  environment_variables_missing: [
    {
      title: 'Configure Environment Variables',
      description: 'Set up required environment variables for Boundless Prover',
      steps: [
        {
          type: 'instruction',
          content: 'Copy the example environment file'
        },
        {
          type: 'command',
          content: 'cp .env.base.example .env.base',
          description: 'Create environment configuration file'
        },
        {
          type: 'instruction',
          content: 'Edit the environment file'
        },
        {
          type: 'command',
          content: 'nano .env.base',
          description: 'Open environment file for editing'
        },
        {
          type: 'instruction',
          content: 'Set your RPC URL (get from provider like Alchemy, Infura, etc.)'
        },
        {
          type: 'command',
          content: 'export RPC_URL="https://base-mainnet.g.alchemy.com/v2/YOUR_API_KEY"'
        },
        {
          type: 'instruction',
          content: 'Set your wallet private key (without 0x prefix)'
        },
        {
          type: 'command',
          content: 'export PRIVATE_KEY="your_64_character_private_key"'
        },
        {
          type: 'warning',
          content: 'Never share your private key or commit it to version control'
        },
        {
          type: 'instruction',
          content: 'Load the environment variables'
        },
        {
          type: 'command',
          content: 'source .env.base',
          description: 'Apply environment configuration'
        },
        {
          type: 'instruction',
          content: 'Verify variables are set'
        },
        {
          type: 'command',
          content: 'echo $RPC_URL\necho "Private key set: $([ -n "$PRIVATE_KEY" ] && echo "Yes" || echo "No")"',
          description: 'Check environment variables'
        }
      ],
      additionalNotes: [
        'You need an RPC provider account (Alchemy, Infura, etc.)',
        'Use a dedicated wallet for prover operations',
        'Ensure your wallet has ETH for gas fees'
      ]
    }
  ],

  usdc_faucet_issues: [
    {
      title: 'Get Test USDC from Faucet',
      description: 'Obtain test USDC for testnet operations',
      steps: [
        {
          type: 'instruction',
          content: 'Visit the Circle USDC faucet'
        },
        {
          type: 'instruction',
          content: 'Go to: https://faucet.circle.com/'
        },
        {
          type: 'instruction',
          content: 'Connect your wallet or enter your address'
        },
        {
          type: 'instruction',
          content: 'Select the correct network (Base Sepolia for testnet)'
        },
        {
          type: 'instruction',
          content: 'Request test USDC'
        },
        {
          type: 'instruction',
          content: 'Alternative: Use API request'
        },
        {
          type: 'command',
          content: 'curl -X POST https://faucet.circle.com/api/v1/faucet \\\n  -H "Content-Type: application/json" \\\n  -d \'{"address":"YOUR_WALLET_ADDRESS","blockchain":"ETH"}\'',
          description: 'Request USDC via API'
        },
        {
          type: 'instruction',
          content: 'Wait for transaction confirmation'
        },
        {
          type: 'instruction',
          content: 'Verify USDC balance'
        },
        {
          type: 'command',
          content: 'boundless account balance',
          description: 'Check your USDC balance'
        }
      ],
      additionalNotes: [
        'Faucets may have rate limits - wait between requests',
        'Ensure you\'re on the correct network (testnet vs mainnet)',
        'Some faucets require social media verification'
      ]
    }
  ],

  prover_registration_failed: [
    {
      title: 'Register Prover with Boundless',
      description: 'Complete prover registration process',
      steps: [
        {
          type: 'instruction',
          content: 'Ensure you have sufficient stake deposited'
        },
        {
          type: 'command',
          content: 'boundless account stake-balance',
          description: 'Check your current stake'
        },
        {
          type: 'instruction',
          content: 'If stake is insufficient, deposit more USDC'
        },
        {
          type: 'command',
          content: 'boundless account deposit-stake 100',
          description: 'Deposit additional stake'
        },
        {
          type: 'instruction',
          content: 'Run benchmark to determine your prover capabilities'
        },
        {
          type: 'command',
          content: 'just bento\nRUST_LOG=info bento_cli -c 1024',
          description: 'Benchmark your system'
        },
        {
          type: 'instruction',
          content: 'Configure broker.toml with benchmark results'
        },
        {
          type: 'command',
          content: 'cp broker-template.toml broker.toml\nnano broker.toml',
          description: 'Set up broker configuration'
        },
        {
          type: 'instruction',
          content: 'Start the broker to register'
        },
        {
          type: 'command',
          content: 'just broker',
          description: 'Start broker and register prover'
        }
      ],
      additionalNotes: [
        'Registration requires sufficient stake and working GPU',
        'Monitor broker logs to confirm successful registration',
        'Benchmark results determine your proving capabilities'
      ]
    }
  ],

  benchmark_timeout: [
    {
      title: 'Fix Benchmark Timeout Issues',
      description: 'Resolve benchmarks that hang or timeout',
      steps: [
        {
          type: 'instruction',
          content: 'Check GPU utilization during benchmark'
        },
        {
          type: 'command',
          content: 'nvidia-smi',
          description: 'Monitor GPU usage'
        },
        {
          type: 'instruction',
          content: 'Start with smaller benchmark size'
        },
        {
          type: 'command',
          content: 'RUST_LOG=info bento_cli -c 32',
          description: 'Run minimal benchmark first'
        },
        {
          type: 'instruction',
          content: 'If small benchmark works, gradually increase'
        },
        {
          type: 'command',
          content: 'RUST_LOG=info bento_cli -c 128\nRUST_LOG=info bento_cli -c 256',
          description: 'Incrementally test larger sizes'
        },
        {
          type: 'instruction',
          content: 'Check system resources'
        },
        {
          type: 'command',
          content: 'htop',
          description: 'Monitor CPU and memory usage'
        },
        {
          type: 'instruction',
          content: 'Reduce segment size if needed'
        },
        {
          type: 'command',
          content: 'export SEGMENT_SIZE=19',
          description: 'Lower memory requirements'
        },
        {
          type: 'instruction',
          content: 'Restart services and try again'
        },
        {
          type: 'command',
          content: 'just bento down\njust bento',
          description: 'Restart with new settings'
        }
      ],
      additionalNotes: [
        'Timeouts often indicate insufficient GPU memory',
        'System thermal throttling can cause slowdowns',
        'Ensure adequate cooling for sustained GPU workloads'
      ]
    }
  ],

  insufficient_gas: [
    {
      title: 'Fix Gas Issues',
      description: 'Resolve insufficient gas or gas limit problems',
      steps: [
        {
          type: 'instruction',
          content: 'Check your ETH balance'
        },
        {
          type: 'command',
          content: 'boundless account balance',
          description: 'View your ETH balance'
        },
        {
          type: 'instruction',
          content: 'For testnet: Get ETH from faucet'
        },
        {
          type: 'instruction',
          content: 'Base Sepolia faucet: https://www.alchemy.com/faucets/base-sepolia'
        },
        {
          type: 'instruction',
          content: 'For mainnet: Ensure sufficient ETH in wallet'
        },
        {
          type: 'instruction',
          content: 'Check current gas prices'
        },
        {
          type: 'command',
          content: 'curl -X POST -H "Content-Type: application/json" --data \'{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":1}\' $RPC_URL',
          description: 'Get current gas price'
        },
        {
          type: 'instruction',
          content: 'If transaction failed, wait and retry'
        },
        {
          type: 'instruction',
          content: 'Gas prices fluctuate - try during lower network usage'
        },
        {
          type: 'instruction',
          content: 'Verify transaction on block explorer'
        }
      ],
      additionalNotes: [
        'Keep extra ETH in your wallet for gas fees',
        'Gas prices are higher during network congestion',
        'Failed transactions still consume gas'
      ]
    }
  ]
}
