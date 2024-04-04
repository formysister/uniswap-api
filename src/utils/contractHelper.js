import { ethers } from 'ethers';
import CONTRACT_INTERFACE from '../contracts/abi'

export const getTokenInfo = async (address, rpcUrl) => {

    const provider = new ethers.providers.JsonRpcProvider(rpcUrl)
    const contract = new ethers.Contract(address, CONTRACT_INTERFACE.ERC20, provider)

    try {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const decimals = await contract.decimals();

        if(!name || !symbol || !decimals) {
            return null
        }

        return {
            name,
            symbol,
            decimals
        }
    }
    catch(e) {
        throw new Error(e)
    }
}