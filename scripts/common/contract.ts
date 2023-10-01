import { ethers } from 'ethers'
import {
  getPricingABI 
} from './file'

export const getPricingInstance = (
    address: string,
    wallet: ethers.Wallet
  ): ethers.Contract => {
    const abi = getPricingABI()
    const contract = new ethers.Contract(address, abi, wallet)
    return contract
}