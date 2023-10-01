import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@typechain/hardhat";
import "hardhat-gas-reporter";
import "solidity-coverage";
import 'hardhat-abi-exporter'
import * as dotenv from "dotenv";

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

const ETH_API_KEY: string = process.env.ETH_API_KEY || 'NA'
const PRIVATE_KEY_GOERLI: string = process.env.PRIVATE_KEY_GOERLI || 'NA'
const PRIVATE_KEY_GANACHE: string = process.env.PRIVATE_KEY_GANACHE || '2e151bc621c81ef883bdf532a59c63ca9cfd135f18179b8cc4dea32b770b9cfa'
const GOERLI_RPC_URL: string = process.env.GOERLI_RPC_URL || 'http://localhost:7545'
const defaultNetwork: string = process.env.NETWORK || 'ganache';

const gasPrice: number = 10000000000; // 10 gwei
const gasLimit: number = 10000000;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.19',
        settings: {
          optimizer: {
            enabled: true,
            runs: 1000,
          },
        },
      },
    ],
  },
  defaultNetwork: defaultNetwork,
  paths: {
    sources: 'contracts',
  },
  abiExporter: {
    path: './abi',
    clear: true, // delete old files before export
    flat: true, // all abi json files directly under path
    only: [
      'Pricing'
    ],
    runOnCompile: true,
  },
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
    },
    ganache: {
      url: 'http://localhost:7545',
      accounts: [`0x${PRIVATE_KEY_GANACHE}`],
    },
    goerli: {
      chainId: 5,
      url: `${GOERLI_RPC_URL}`,
      accounts: [`0x${PRIVATE_KEY_GOERLI}`],
      gasPrice: gasPrice,
      gas: gasLimit
    },
  },
  etherscan: {
    apiKey: {
      goerli: `${ETH_API_KEY}` // https://etherscan.io/apis
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  }
};

export default config;
