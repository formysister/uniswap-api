import { ethers } from 'ethers'
import { getTokenInfo } from '../../utils/contractHelper';
import CONTRACT_INTERFACE from '../../contracts/abi/index';
import { SWAP_CONSTANT } from '../../config/AppConstraints';

export default class NftDexCore {
    constructor(rpcUrl, factoryAddress) {
        this.rpcUrl = rpcUrl
        this.provider = new ethers.providers.JsonRpcProvider(rpcUrl)

        this.factory = new ethers.Contract(factoryAddress, CONTRACT_INTERFACE.NFTSWAP_FACTORY, this.provider)

        this.provider.getBlock('latest').then((block) => {
            this.networkGas = block.gasLimit
        })
    }

    getAddLiquidityData = (maxCurrency, deadline) => {
        const AddLiquidityType = `tuple(
              uint256[] maxCurrency,
              uint256 deadline
            )`;

        const addLiquidityObj = { maxCurrency, deadline };

        return ethers.utils.defaultAbiCoder.encode(
            ["bytes4", AddLiquidityType],
            ["0x82da2b73", addLiquidityObj]
        );
    };

    getRemoveLiquidityData = (maxCurrency, deadline) => {
        const AddLiquidityType = `tuple(
              uint256[] maxCurrency,
              uint256 deadline
            )`;

        const addLiquidityObj = { maxCurrency, deadline };

        return ethers.utils.defaultAbiCoder.encode(
            ["bytes4", AddLiquidityType],
            ["0x5c0bf259", addLiquidityObj]
        );
    };

    getSellTokenData20 = (
        recipient,
        cost,
        deadline,
        extraFeeRecipients,
        extraFeeAmounts
    ) => {
        const SellTokens20Type = `tuple(
          address recipient,
          uint256 minCurrency,
          address[] extraFeeRecipients,
          uint256[] extraFeeAmounts,
          uint256 deadline
        )`;

        const sellTokenObj = {
            recipient: recipient,
            minCurrency: cost,
            extraFeeRecipients: extraFeeRecipients ? extraFeeRecipients : [],
            extraFeeAmounts: extraFeeAmounts ? extraFeeAmounts : [],
            deadline: deadline,
        };

        return ethers.utils.defaultAbiCoder.encode(
            ["bytes4", SellTokens20Type],
            ["0xade79c7a", sellTokenObj]
        );
    };

    createExchange = async (erc1155Address, erc20Address, lpFee) => {
        const tx = await this.factory.populateTransaction['createExchange'](erc1155Address, erc20Address, lpFee)

        return tx
    }

    tokensToExchange = async (erc1155Address, erc20Address, lpFee, instance) => {
        const exchange = await this.factory.tokensToExchange(erc1155Address, erc20Address, lpFee, instance)

        return exchange
    }

    getCurrencyReserves = async (tokenId, exchangeAddress) => {
        const contract = new ethers.Contract(exchangeAddress, CONTRACT_INTERFACE.NFTSWAP_EXCHANGE, this.provider)
        const reserve = await contract.getCurrencyReserves([tokenId])

        return reserve
    }

    getPrimaryTokenreserves = async (tokenId, exchangeAddress) => {
        const contract = new ethers.Contract(exchangeAddress, CONTRACT_INTERFACE.NFTSWAP_EXCHANGE, this.provider)
        const reserve = await contract.getTotalSupply([tokenId])

        return reserve
    }

    getCurrencyToTokenPrice = async (tokenId, currencyAmount, exchangeAddress) => {
        const contract = new ethers.Contract(exchangeAddress, CONTRACT_INTERFACE.NFTSWAP_EXCHANGE, this.provider)
        const currencyToTokenPrice = await contract.getPrice_currencyToToken([tokenId], [currencyAmount])

        return currencyToTokenPrice
    }

    getTokenToCurrencyPrice = async (tokenId, currencyAmount, exchangeAddress) => {
        const contract = new ethers.Contract(exchangeAddress, CONTRACT_INTERFACE.NFTSWAP_EXCHANGE, this.provider)
        const tokenToCurrencyPrice = await contract.getPrice_tokenToCurrency([tokenId], [currencyAmount])

        return tokenToCurrencyPrice
    }

    approveTokenToExchange = async (tokenAddress, exchangeAddress, amount) => {
        const contract = new ethers.Contract(tokenAddress, CONTRACT_INTERFACE.ERC20, this.provider)
        const tx = await contract.populateTransaction['approve'](exchangeAddress, amount)

        return tx
    }

    addLiquidity = async (erc1155Address, erc20Address, erc1155Amount, erc20Amount, tokenId, exchangeAddress, ownerAddress) => {
        const primaryToken = new ethers.Contract(erc1155Address, CONTRACT_INTERFACE.ERC1155, this.provider)
        const currencyToken = new ethers.Contract(erc20Address, CONTRACT_INTERFACE.ERC20, this.provider)

        const currencyAmountsToAdd = new Array(1)
            .fill("")
            .map((a, i) => erc20Amount);

        const addLiquidityData = this.getAddLiquidityData(
            currencyAmountsToAdd,
            Math.floor(SWAP_CONSTANT.DEFAULT_DEADLINE / 1000) + 100000
        );

        const tx1 = await currencyToken.populateTransaction['approve'](exchangeAddress, erc20Amount);
        const tx2 = await primaryToken.populateTransaction['safeBatchTransferFrom'](ownerAddress, exchangeAddress, [tokenId], [erc1155Amount], addLiquidityData)
        
        return [tx1, tx2]
    }

    buyToken = async (tokenId, buyAmount, currencyAmount, recipient, feeRecipient, feeAmount, exchangeAddress) => {
        const exchange = new ethers.Contract(exchangeAddress, CONTRACT_INTERFACE.NFTSWAP_EXCHANGE, this.provider)
        const tx = await exchange.populateTransaction['buyTokens']([tokenId], [buyAmount], currencyAmount, Math.floor(SWAP_CONSTANT.DEFAULT_DEADLINE / 1000) + 10000, recipient, [feeRecipient], [feeAmount])
        
        return tx
    }

    sellToken = async (tokenAddress, recipient, tokenId, amount, exchangeAddress) => {
        const tokenSellData = this.getSellTokenData20(recipient, 0, Math.floor(SWAP_CONSTANT.DEFAULT_DEADLINE / 1000) + 10000, [], [])
        const contract = new ethers.Contract(tokenAddress, CONTRACT_INTERFACE.ERC1155, this.provider)

        const tx = await contract.populateTransaction['safeBatchTransferFrom'](recipient, exchangeAddress, [tokenId], [amount], tokenSellData)
        return tx
    }
}