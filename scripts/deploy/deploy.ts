import { ethers } from "hardhat";
import fs from 'fs';
import { getDeployedPath, writeJsonToFile } from '../common/file';

const network = process.env.NETWORK || 'ganache'
const branch = process.env.BRANCH || 'develop'

async function main() {

  const jsonPath = getDeployedPath(network, branch);
  let content: any = JSON.parse(fs.readFileSync(jsonPath).toString());

  let defaultPriceValue: number = 10;

  const pricing = await ethers.deployContract("Pricing", [defaultPriceValue]);

  await pricing.waitForDeployment();

  console.log("Pricing deployed to:", pricing.target);

  if (!content) content = {};

  content.ContractAddress = pricing.target;
  writeJsonToFile(jsonPath, content);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
