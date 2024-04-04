import {
    STATUS_MSG,
} from '../../../config/AppConstraints';
import {
    failActionFunction,
    sendError,
    sendSuccess,
} from '../../../utils/response';
import { LANGUAGE, ROUTE, SWAGGER_RESPONSE_MESSAGE } from '../../../config/AppConstraints'
import Joi from 'joi';
import { logger } from '../../../utils/universalFunctions';
import { DexCoreController, AuthController } from '../../../controllers/V1';

const DEXAPI_ROUTER = [
    {
        method: 'POST',
        path: '/',
        options: {
            handler: async (request, reply) => {
                return sendSuccess(
                    STATUS_MSG.SUCCESS.DEFAULT,
                    'dataToSend',
                    request.headers['accept-language'] || LANGUAGE.EN,
                )
            }
        }
    },
    {
        method: 'GET',
        path: ROUTE.URL_PREFIX + '/quote',
        options: {
            handler: async (request, reply) => {

                try {
                    let dataToSend = await DexCoreController.quote(request.query);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'claim token',
            notes: 'faucet request through ethers api call',
            tags: ['api', 'contest'],
        },
    },
    {
        method: 'GET',
        path: ROUTE.URL_PREFIX + '/pair',
        options: {
            handler: async (request, reply) => {

                try {
                    let dataToSend = await DexCoreController.getPair(request.query);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'get pair',
            notes: 'get pair lptoken',
            tags: ['api', 'pair'],
        },
    },
    {
        method: 'GET',
        path: ROUTE.URL_PREFIX + '/factory',
        options: {
            handler: async (request, reply) => {

                try {
                    let dataToSend = await DexCoreController.getFactory(request.query);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'get factory',
            notes: 'get factory address',
            tags: ['address', 'factory'],
        },
    },
    {
        method: 'GET',
        path: ROUTE.URL_PREFIX + '/router',
        options: {
            handler: async (request, reply) => {

                try {
                    let dataToSend = await DexCoreController.getRouter(request.query);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'get router',
            notes: 'get router address',
            tags: ['address', 'router'],
        },
    },
    {
        method: 'GET',
        path: ROUTE.URL_PREFIX + '/reverseQuote',
        options: {
            handler: async (request, reply) => {

                try {
                    let dataToSend = await DexCoreController.reverseQuote(request.query);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'claim token',
            notes: 'faucet request through ethers api call',
            tags: ['api', 'contest'],
        },
    },
    {
        method: 'POST',
        path: ROUTE.URL_PREFIX + '/swap',
        options: {
            handler: async (request, reply) => {
                try {
                    const authorized = await AuthController.authRequestHeader(request.headers)
                    if (!authorized) {
                        logger.error(JSON.stringify(SWAGGER_RESPONSE_MESSAGE[2]));
                        return sendError(
                            SWAGGER_RESPONSE_MESSAGE[2],
                            request.headers['accept-language'] || LANGUAGE.EN,
                        );
                    }
                }
                catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }

                try {
                    let dataToSend = await DexCoreController.createExchange(request.payload);

                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'create exchange',
            notes: 'create transactions to swap tokens',
            tags: ['transaction', 'exchange'],
            validate: {
                failAction: failActionFunction,
                payload: Joi.object({
                    chainId: Joi.number().required(),
                    inputAddress: Joi.string().required(),
                    outputAddress: Joi.string().required(),
                    fromAddress: Joi.string().required(),
                    inputAmount: Joi.any().required(),
                    slippage: Joi.number()
                }),
            }
        },
    },
    {
        method: 'POST',
        path: ROUTE.URL_PREFIX + '/addLiquidity',
        options: {
            handler: async (request, reply) => {
                try {
                    const authorized = await AuthController.authRequestHeader(request.headers)
                    if (!authorized) {
                        logger.error(JSON.stringify(SWAGGER_RESPONSE_MESSAGE[2]));
                        return sendError(
                            SWAGGER_RESPONSE_MESSAGE[2],
                            request.headers['accept-language'] || LANGUAGE.EN,
                        );
                    }
                }
                catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }

                try {
                    let dataToSend = await DexCoreController.addLiquidity(request.payload);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'add liquidity',
            notes: 'create transactions to add liquidity',
            tags: ['transaction', 'liquidity'],
            validate: {
                failAction: failActionFunction,
                payload: Joi.object({
                    chainId: Joi.number().required(),
                    tokenA: Joi.string().required(),
                    tokenB: Joi.string().required(),
                    fromAddress: Joi.string().required(),
                    amountA: Joi.any().required(),
                    amountB: Joi.any().required(),
                }),
            }
        },
    },
    {
        method: 'POST',
        path: ROUTE.URL_PREFIX + '/removeLiquidity',
        options: {
            handler: async (request, reply) => {
                try {
                    const authorized = await AuthController.authRequestHeader(request.headers)
                    if (!authorized) {
                        logger.error(JSON.stringify(SWAGGER_RESPONSE_MESSAGE[2]));
                        return sendError(
                            SWAGGER_RESPONSE_MESSAGE[2],
                            request.headers['accept-language'] || LANGUAGE.EN,
                        );
                    }
                }
                catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }

                try {
                    let dataToSend = await DexCoreController.removeLiquidity(request.payload);
                    return sendSuccess(
                        STATUS_MSG.SUCCESS.DEFAULT,
                        dataToSend,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                } catch (err) {
                    logger.error(JSON.stringify(err));
                    return sendError(
                        err,
                        request.headers['accept-language'] || LANGUAGE.EN,
                    );
                }
            },
            description: 'add liquidity',
            notes: 'create transactions to add liquidity',
            tags: ['transaction', 'liquidity'],
            validate: {
                failAction: failActionFunction,
                payload: Joi.object({
                    chainId: Joi.number().required(), 
                    tokenA: Joi.string().required(), 
                    tokenB: Joi.string().required(), 
                    liquidity: Joi.any().required(), 
                    amountAMin: Joi.any().required(), 
                    amountBMin: Joi.any().required(), 
                    fromAddress: Joi.string().required()
                }),
            }
        },
    },
];

export default DEXAPI_ROUTER;
