import fs from 'fs';
import { getDeployedPath } from '../common/file';
import { getPricingInstance } from '../common/contract';
import { getWallet } from '../common/wallet';

const network = process.env.NETWORK || 'ganache'
const branch = process.env.BRANCH || 'develop'

const gasPrice: number = 5000000000; // 5 gwei
const gasLimit: number = 10000000;

async function main() {

  let newPrice = 50;

  const jsonPath = getDeployedPath(network, branch);
  let content = JSON.parse(fs.readFileSync(jsonPath).toString());

  const adminWallet = getWallet();
  const pricing = getPricingInstance(content.ContractAddress, adminWallet);

  let result = await pricing.setPricing(newPrice, {
    gasPrice: gasPrice,
    gasLimit: gasLimit
  });
  console.log("New Price is set.");
  console.log({result});  
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
