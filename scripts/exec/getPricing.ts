import fs from 'fs';
import { getDeployedPath } from '../common/file';
import { getPricingInstance } from '../common/contract';
import { getWallet } from '../common/wallet';

const network = process.env.NETWORK || 'ganache'
const branch = process.env.BRANCH || 'develop'

async function main() {

  const jsonPath = getDeployedPath(network, branch);
  let content = JSON.parse(fs.readFileSync(jsonPath).toString());

  const adminWallet = getWallet()

  const pricing = getPricingInstance(content.ContractAddress, adminWallet);

  let currentPrice = await pricing.getPricing();

  console.log("Type of currentPrice : ", typeof(currentPrice));

  console.log("currentPrice without toString : ", currentPrice);

  console.log("currentPrice : ", currentPrice.toString());
  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
