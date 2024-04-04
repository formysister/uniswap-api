import { ethers } from 'ethers'
import { getTokenInfo } from '../../utils/contractHelper';
import CONTRACT_INTERFACE from './../../contracts/abi/index';
import { SWAP_CONSTANT } from '../../config/AppConstraints';

class DexCore {
    constructor(rpcUrl, routerAddress, factoryAddress) {
        this.rpcUrl = rpcUrl
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl)

        this.router = new ethers.Contract(routerAddress, CONTRACT_INTERFACE.V2_ROUTER, this.provider)
        this.factory = new ethers.Contract(factoryAddress, CONTRACT_INTERFACE.V2_FACTORY, this.provider)

        this.provider.getBlock('latest').then((block) => {
            this.networkGas = block.gasLimit
        })
    }

    WETH = async () => {
        try {
            const wethAddress = await this.router.WETH()
            return wethAddress
        }
        catch(error) {
            throw error
        }
    }

    getRouter = async () => {
        return this.router.address
    }

    getFactory = async () => {
        return this.factory.address
    }

    getPair = async (tokenA, tokenB) => {
        try {
            const pair = await this.factory.getPair(tokenA, tokenB);

            return pair
        }
        catch(error) {
            throw error
        }
    }

    approveTokenToRouter = async (tokenAddress, approveAmount) => {
        const token = new ethers.Contract(tokenAddress, CONTRACT_INTERFACE.ERC20, this.provider)

        const tx = await token.populateTransaction['approve'](this.router.address, approveAmount)

        return tx
    }

    getAmountsOut = async (inputAddress, outputAddress, inputAmount, asSafeNumber=false, slippage = SWAP_CONSTANT.DEFAULT_SLIPPAGE) => {
        let inputTokenInfo, outputTokenInfo;

        try {
            inputTokenInfo = await getTokenInfo(inputAddress, this.rpcUrl)
            outputTokenInfo = await getTokenInfo(outputAddress, this.rpcUrl)
        }
        catch (error) {
            throw (error)
        }

        try {
            const amountsOut = await this.router.getAmountsOut(inputAmount, [inputAddress, outputAddress])
            const amountOutSn = this.computeSliipage(ethers.utils.formatUnits(amountsOut[1], outputTokenInfo.decimals), slippage)
            const amountOutBn = ethers.utils.parseUnits(amountOutSn.toFixed().toString(), outputTokenInfo.decimals)

            return asSafeNumber ? amountOutSn : amountOutBn
        } catch (error){
            try {
                const WETH = await this.router.WETH();
                const additionalPath = [inputAddress, WETH, outputAddress];
                const amountsOut = await this.router.getAmountsOut(inputAmount, additionalPath)
                const amountOutSn = this.computeSliipage(ethers.utils.formatUnits(amountsOut[2], outputTokenInfo.decimals), slippage)
                
                const amountOutBn = ethers.utils.parseUnits(amountOutSn.toFixed().toString(), outputTokenInfo.decimals)

                return asSafeNumber ? amountOutSn : amountOutBn
            } catch (error) {
                throw error
            }
        }
    }

    getAmountsIn = async (inputAddress, outputAddress, outputAmount, asSafeNumber=false, slippage = SWAP_CONSTANT.DEFAULT_SLIPPAGE) => {
        let inputTokenInfo, outputTokenInfo;

        try {
            inputTokenInfo = await getTokenInfo(inputAddress, this.rpcUrl)
            outputTokenInfo = await getTokenInfo(outputAddress, this.rpcUrl)
        }
        catch (error) {
            throw (error)
        }

        try {
            const amountsOut = await this.router.getAmountsOut(outputAmount, [outputAddress, inputAddress])
            const amountOutSn = this.computeSliipage(ethers.utils.formatUnits(amountsOut[1], outputTokenInfo.decimals), slippage)
            const amountOutBn = ethers.utils.parseUnits(amountOutSn.toFixed().toString(), outputTokenInfo.decimals)

            return asSafeNumber ? amountOutSn : amountOutBn
        } catch (error){
            try {
                const WETH = await this.router.WETH();
                const additionalPath = [outputAddress, WETH, inputAddress];
                const amountsOut = await this.router.getAmountsOut(outputAmount, additionalPath)
                const amountOutSn = this.computeReverseSlippage(ethers.utils.formatUnits(amountsOut[2], outputTokenInfo.decimals), slippage)
                
                const amountOutBn = ethers.utils.parseUnits(amountOutSn.toFixed().toString(), outputTokenInfo.decimals)

                return asSafeNumber ? amountOutSn : amountOutBn
            } catch (error) {
                throw error
            }
        }
    }

    // getAmountsIn = async (inputAddress, outputAddress, outputAmount, asSafeNumber=false, slippage = SWAP_CONSTANT.DEFAULT_SLIPPAGE) => {
    //     let inputTokenInfo, outputTokenInfo;

    //     try {
    //         inputTokenInfo = await getTokenInfo(inputAddress, this.rpcUrl)
    //         outputTokenInfo = await getTokenInfo(outputAddress, this.rpcUrl)
    //     }
    //     catch (error) {
    //         throw (error)
    //     }

    //     try {
    //         const amountsIn = await this.router.getAmountsOut(outputAmount, [outputAddress, inputAddress])
    //         const amountInSn = this.computeReverseSlippage(ethers.utils.formatUnits(amountsIn[1], inputTokenInfo.decimals), slippage)
    //         const amountInBn = ethers.utils.parseUnits(amountInSn.toFixed().toString(), inputTokenInfo.decimals)

    //         return asSafeNumber ? amountInSn : amountInBn
    //     } catch (error){
    //         try {
    //             const WETH = await this.router.WETH();
    //             const additionalPath = [outputAddress, WETH, inputAddress];
    //             const amountsIn = await this.router.getAmountsOut(outputAmount, additionalPath)
    //             const amountInSn = this.computeReverseSlippage(ethers.utils.formatUnits(amountsIn[2], inputTokenInfo.decimals), slippage)
                
    //             const amountInBn = ethers.utils.parseUnits(amountInSn.toFixed().toString(), inputTokenInfo.decimals)

    //             return asSafeNumber ? amountInSn : amountInBn
    //         } catch (error) {
    //             throw error
    //         }
    //     }
    // }

    swapETHForExactTokens = async (
        payableAmount,
        amountOut,
        path,
        to,
        deadline,
    ) => {

        const tx = await this.router.populateTransaction['swapETHForExactTokens'](payableAmount, amountOut, path, to, deadline, { value: payableAmount })

        return tx
    }

    swapExactETHForExactTokens = async (
        payableAmount,
        amountOutMin,
        path,
        to,
        deadline,
    ) => {
        
        const tx = {
            to: this.router.address,
            data: (await this.router.populateTransaction['swapExactETHForExactTokens']( payableAmount, amountOutMin, path, to, deadline, { value: payableAmount })),
            gasLimit: this.networkGas
        }

        return tx
    }

    swapExactETHForTokensSupportingFeeOnTransferTokens = async (
        payableAmount,
        amountOutMin,
        path,
        to,
        deadline,
    ) => {
        const tx = await this.router.populateTransaction['swapExactETHForTokensSupportingFeeOnTransferTokens'](amountOutMin, path, to, deadline, { value: payableAmount })

        return tx
    }

    swapExactTokensForETH = async (
        amountIn,
        amountOutMin,
        path,
        to,
        deadline,
    ) => {
        const tx= await this.router.populateTransaction['swapExactTokensForETH'](amountIn, amountOutMin, path, to, deadline)

        return tx
    }

    swapExactTokensForETHSupportingFeeOnTransferTokens = async (
        amountIn,
        amountOutMin,
        path,
        to,
        deadline,
    ) => {
        const tx = await this.router.populateTransaction['swapExactTokensForETHSupportingFeeOnTransferTokens'](amountIn, amountOutMin, path, to, deadline)
        
        return tx
    }

    swapExactTokensForTokens = async (
        amountIn,
        amountOutMin,
        path,
        to,
        deadline,
    ) => {
        const tx = await this.router.populateTransaction['swapExactTokensForTokens'](amountIn, amountOutMin, path, to, deadline)

        return tx
    }

    swapExactTokensForTokensSupportingFeeOnTransferTokens = async (
        amountIn,
        amountOutMin,
        path,
        to,
        deadline,
    ) => {
        const tx = await this.router.populateTransaction['swapExactTokensForTokensSupportingFeeOnTransferTokens'](amountIn, amountOutMin, path, to, deadline)

        return tx
    }

    swapTokensForExactETH = async (
        amountOut,
        amountInMax,
        path,
        to,
        deadline,
    ) => {
        const tx = await this.router.populateTransaction['swapTokensForExactETH'](amountOut, amountInMax, path, to, deadline)
        
        return tx
    }

    swapTokensForExactTokens = async (
        amountOut,
        amountInMax,
        path,
        to,
        deadline,
    ) => {
        const tx = await this.router.populateTransaction['swapTokensForExactTokens'](amountOut, amountInMax, path, to, deadline)

        return tx
    }

    addLiquidity = async (tokenA, tokenB, amountA, amountB, amountAMin, amountBMin, to, deadline) => {
        const tx = await this.router.populateTransaction['addLiquidity'](tokenA, tokenB, amountA, amountB, amountAMin, amountBMin, to, deadline)

        return tx
    }

    addLiquidityETH = async (token, amountToken, amountEth, amountTokenMin, amountEthMin, to, deadline) => {
        const tx = await this.router.populateTransaction['addLiquidityETH'](token, amountToken, amountTokenMin, amountEthMin, to, deadline, { value: amountEth })

        return tx
    }

    removeLiquidity = async (tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline) => {
        const tx = await this.router.populateTransaction['removeLiquidity'](tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline)
    
        return tx
    }

    removeLiquidityETH = async (token, liquidity, amountTokenMin, amountEthMin, to, deadline) => {
        const tx = await this.router.populateTransaction['removeLiquidityETH'](token, liquidity, amountTokenMin, amountEthMin, to, deadline)

        return tx
    }

    computeSliipage = (amountOut, slippage = SWAP_CONSTANT.DEFAULT_SLIPPAGE) => {
        const amountOutMin = amountOut - (amountOut * slippage / 100);        
        return amountOutMin
    }

    computeReverseSlippage = (amountOut, slippage = SWAP_CONSTANT.DEFAULT_SLIPPAGE) => {
        const amountOutMin = amountOut + (amountOut * slippage / 100);        
        return amountOutMin
    }
}

export default DexCore