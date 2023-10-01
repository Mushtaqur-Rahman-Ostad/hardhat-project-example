import { ethers, JsonRpcProvider } from 'ethers'


const NETWORK = process.env.NETWORK || 'ganache'
const PRIVATE_KEY = process.env.PRIVATE_KEY_GOERLI || ''
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || ''

const URL = () => {
    if (NETWORK === 'goerli') return `${GOERLI_RPC_URL}`
    return 'http://localhost:7545'
}

export const provider = new JsonRpcProvider(URL());
  
export const createWalletFromPK = () => {
    const wallet = new ethers.Wallet(PRIVATE_KEY, provider)
    return wallet
}
  
export const getWallet = () => {
    return createWalletFromPK()
}