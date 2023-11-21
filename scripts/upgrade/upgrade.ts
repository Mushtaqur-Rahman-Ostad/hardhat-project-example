import { ethers, upgrades } from "hardhat";
import fs from 'fs';
import { getDeployedPath } from '../common/file';
import { provider } from '../common/wallet';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';

const network = process.env.NETWORK || 'ganache'
const branch = process.env.BRANCH || 'develop'

async function main() {

  const jsonPath = getDeployedPath(network, branch);
  let content: any = JSON.parse(fs.readFileSync(jsonPath).toString());

  const proxyAddress = content.ContractAddressWithUpgradability;

  const contract = await ethers.getContractFactory("Pricing");

  console.log("Deploying the smart contract");
  const pricing = await upgrades.upgradeProxy(proxyAddress, contract);

  await pricing.waitForDeployment();

  console.log("Transaction hash: ", pricing);
  

  const currentImplementationAddress = await getImplementationAddress(provider, proxyAddress.toString())
  console.log(`DEPLOYED Implementation Address: ${currentImplementationAddress}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
