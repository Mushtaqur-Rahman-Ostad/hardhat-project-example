import { ethers, upgrades } from "hardhat";
import fs from 'fs';
import { getDeployedPath, writeJsonToFile } from '../common/file';
import { provider } from '../common/wallet';
import { getImplementationAddress } from '@openzeppelin/upgrades-core';

const network = process.env.NETWORK || 'ganache'
const branch = process.env.BRANCH || 'develop'

async function main() {

  const jsonPath = getDeployedPath(network, branch);
  let content: any = JSON.parse(fs.readFileSync(jsonPath).toString());

  let defaultPriceValue: number = 10;

  const contract = await ethers.getContractFactory("Pricing");
  const pricing = await upgrades.deployProxy(contract, [defaultPriceValue], {
    initializer: "setPricing",
  });

  await pricing.waitForDeployment();

  console.log("Transaction hash: ", pricing);
  const proxyAddress = pricing.target
  console.log(`DEPLOYED Contract TO THE ADDRESS: ${proxyAddress}`);

  if (!content) content = {};

  content.ContractAddressWithUpgradability = proxyAddress;

  const currentImplementationAddress = await getImplementationAddress(provider, proxyAddress.toString())
  console.log(`DEPLOYED Implementation Address: ${currentImplementationAddress}`);

  writeJsonToFile(jsonPath, content);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});