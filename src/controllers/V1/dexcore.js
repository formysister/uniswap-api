import DexCore from '../../lib/dexcore'
import NftDexCore from "../../lib/nft_swap-core";
import { CHAINID_TO_RPC, CHAINID_TO_ADDRESS, IMMUTABLE_ADDRESS, SWAP_CONSTANT } from "../../config/AppConstraints"

export default class DexCoreController {
    
    /**
     * 
     * @param {*} payload 
     * @returns transaction
     */
    static async getFactory(payload) {
        const { chainId } = payload
    
        try{
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['DEXS'][0])

            const factory = await dexCore.getFactory()

            return factory
        }
        catch(error) {
            throw error
        }
    }

    /**
     * 
     * @param {*} payload 
     * @returns transaction
     */
    static async getRouter(payload) {
        const { chainId } = payload
    
        try{
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['DEXS'][0])

            const rouer = await dexCore.getRouter()

            return rouer
        }
        catch(error) {
            throw error
        }
    }

    /**
     * 
     * @param {*} payload 
     * @returns transaction
     */
    static async getPair(payload) {
        const { chainId, tokenA, tokenB } = payload

        try {
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['DEXS'][0])

            const pair = await dexCore.getPair(tokenA, tokenB)

            return pair
        }
        catch(error) {
            throw error
        }
    }

    /**
     *
     * @param {*} payload
     */
    static async quote(payload) {

        const { chainId, inputAddress, outputAddress, inputAmount } = payload;

        console.log(payload)

        try {
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['ROUTER'], CHAINID_TO_ADDRESS[chainId]['FACTORY'])
            const quote = await dexCore.getAmountsOut(inputAddress, outputAddress, inputAmount, true)

            return quote
        }
        catch (_err) {
            throw _err
        }
    }

    /**
     *
     * @param {*} payload
     */
    static async reverseQuote(payload) {
        const { chainId, inputAddress, outputAddress, outputAmount } = payload;

        try {
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['ROUTER'], CHAINID_TO_ADDRESS[chainId]['FACTORY'])
            const quote = await dexCore.getAmountsIn(inputAddress, outputAddress, outputAmount, true)

            return quote
        }
        catch (_err) {
            throw _err
        }
    }

    /**
     * 
     * @param {*} payload 
     * @returns transaction
     */
    static async createExchange(payload) {
        const { chainId, inputAddress, outputAddress, fromAddress, inputAmount, slippage } = payload
        
        try {
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['ROUTER'], CHAINID_TO_ADDRESS[chainId]['FACTORY'])

            if(String(inputAddress).toLowerCase() === IMMUTABLE_ADDRESS.NULL_ADDRESS.toLowerCase()) {
                const outputMinAmount = await dexCore.getAmountsOut(CHAINID_TO_ADDRESS[chainId]['WETH'], outputAddress, inputAmount, false, slippage)
                
                const tx = await dexCore.swapExactETHForTokensSupportingFeeOnTransferTokens(inputAmount, outputMinAmount, [ CHAINID_TO_ADDRESS[chainId]['WETH'], outputAddress ], fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)
                return [tx]
            }
            else if (String(outputAddress).toLowerCase() === IMMUTABLE_ADDRESS.NULL_ADDRESS.toLowerCase()) {
                const outputMinAmount = await dexCore.getAmountsOut(inputAddress, CHAINID_TO_ADDRESS[chainId]['WETH'], inputAmount, false, slippage)

                const tx1 = await dexCore.approveTokenToRouter(inputAddress, inputAmount)
                const tx2 = await dexCore.swapExactTokensForETHSupportingFeeOnTransferTokens(inputAmount, outputMinAmount, [ inputAddress, outputAddress ], fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)
            
                return [tx1, tx2]
            }
            else {
                const outputMinAmount = await dexCore.getAmountsOut(inputAddress, outputAddress, inputAmount, false, slippage)

                const tx1 = await dexCore.approveTokenToRouter(inputAddress, inputAmount)
                const tx2 = await dexCore.swapExactTokensForTokensSupportingFeeOnTransferTokens(inputAmount, outputMinAmount, [ inputAddress, outputAddress ], fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)

                return [tx1, tx2]
            }
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     * 
     * @param {*} payload 
     * @returns transaction
     */
    static async addLiquidity(payload) {
        const { chainId, tokenA, tokenB, fromAddress, amountA, amountB } = payload

        try {
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['ROUTER'], CHAINID_TO_ADDRESS[chainId]['FACTORY'])

            if(String(tokenA).toLowerCase() === IMMUTABLE_ADDRESS.NULL_ADDRESS.toLowerCase()) {
                const tx1 = await dexCore.approveTokenToRouter(tokenB, amountB)
                const tx2 = await dexCore.addLiquidityETH(tokenB, amountB, amountA, 0, 0, fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)
                return [tx1, tx2]
            }
            else if(String(tokenB).toLowerCase() === IMMUTABLE_ADDRESS.NULL_ADDRESS.toLowerCase()) {
                const tx1 = await dexCore.approveTokenToRouter(tokenA, amountA)
                const tx2 = await dexCore.addLiquidityETH(tokenA, amountA, amountB, 0, 0, fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)
                return [tx1, tx2]
            }
            else {
                const tx1 = await dexCore.approveTokenToRouter(tokenA, amountA)
                const tx2 = await dexCore.approveTokenToRouter(tokenB, amountB)
                const tx3 = await dexCore.addLiquidity(tokenA, tokenB, amountA, amountB, 0, 0, fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)
                return [tx1, tx2, tx3]
            }
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }

    /**
     * 
     * @param {*} payload 
     * @returns transaction
     */
    static async removeLiquidity(payload) {
        const { chainId, tokenA, tokenB, liquidity, amountAMin, amountBMin, fromAddress } = payload

        try {
            const dexCore = new DexCore(CHAINID_TO_RPC[chainId], CHAINID_TO_ADDRESS[chainId]['DEXS'][0])

            if (String(tokenA).toLowerCase() === IMMUTABLE_ADDRESS.NULL_ADDRESS.toLowerCase()) {
                const weth = await dexCore.WETH()
                const pair = await dexCore.getPair(tokenB, weth)

                const tx1 = await dexCore.approveTokenToRouter(pair, liquidity)
                const tx2 = await dexCore.removeLiquidityETH(tokenB, liquidity, amountBMin, amountAMin, fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)

                return [tx1, tx2]
            }
            else if (String(tokenB).toLowerCase() === IMMUTABLE_ADDRESS.NULL_ADDRESS.toLowerCase()) {
                const weth = await dexCore.WETH()
                const pair = await dexCore.getPair(tokenA, weth)

                const tx1 = await dexCore.approveTokenToRouter(pair, liquidity)
                const tx2 = await dexCore.removeLiquidityETH(tokenA, liquidity, amountAMin, amountBMin, fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)

                return [tx1, tx2]
            }
            else {
                const pair = await dexCore.getPair(tokenA, tokenB)

                const tx1 = await dexCore.approveTokenToRouter(pair, liquidity)
                const tx2 = await dexCore.removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, fromAddress, SWAP_CONSTANT.DEFAULT_DEADLINE)

                return [tx1, tx2]
            }
        }
        catch (error) {
            console.log(error)
            throw error
        }
    }
}