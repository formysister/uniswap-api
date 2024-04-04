export const COMMON_STATUS = {
  PENDING: 'PENDING',
  ACTIVE: 'ACTIVE',
  INACTIVE: 'INACTIVE',
  DELETED: 'DELETED',
};

export const MODELS_NAME = {
  USER: 'user',
};

export const NOTIFICATION_TOPIC = {
  ENGLISH: 'ENGLISH',
  ALL: 'ALL',
};

export const SOCKET_EVENTS = {
  CONNECTION: 'connection',
  SOCKET_ERROR: 'socketError',
  SOCKET_CONNECTED: 'socketConnected',
  DISCONNECT: 'disconnect',
  BROADCAST_USER_STATUS: 'boradCastUserStatus',
};

export const DEVICE_TYPE = {
  WEB: 'WEB',
  ANDROID: 'ANDROID',
  IOS: 'IOS',
};

export const DEVICE_CATEGORY = {
  WEB: 'WEB',
  APP: 'APP',
};

export const USER_TYPE = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  SUB_ADMIN: 'SUB_ADMIN',
  USER: 'USER',
};

export const LANGUAGE = {
  EN: 'en',
};

export const STRATEGY = {
  USER: 'user',
};

export const SORTING_SEQUENCE = {
  ASC: 1,
  DESC: -1,
};

export const CONTACT_REQUEST_STATUS = {
  PENDING: 1,
  RESOLVED: 2,
};

export const NOTIFICATION_TYPE = {};

export const SERVER = {
  SALT: 10,
  FCM_SERVER_KEY: 'test',
  FCM_API_LINK: 'https://firebasedynamiclinks.googleapis.com/v1/shortLinks',
  FCM_API_KEY: '',
  SITE_URL: 'https://fanbase.page.link',
  MAX_DISTANCE: 20000,
};

export const SMS_MESSAGES = {
  OTP_VERIFICATION: (otp, language) => {
    switch (language) {
      case LANGUAGE.EN:
        return `Your fanbase verification code is ${otp}. please do not disclose with anyone for security reason`;
      default:
        return `Your fanbase verification code is ${otp}. please do not disclose with anyone for security reason`;
    }
  },

  CONTACT_US_REQUEST_MESSAGE: data => {
    return `<p>Hi ${data.name}<br />
            Your query has been recorded in our queue <br /><br />
            ${data.note},<br />
            Your ticket id is ${data.displayId}.<br />
            Our team will revert you soon <br />
            Thanks and regards<br />
            fanbase Team
            </p>`;
  },

  CONTACT_US_REQUEST_RESOLVED_MESSAGE: data => {
    return `<p>Hi ${data.name}<br />
    Your query has been been resolved with given note <br /><br />
    ${data.resolveNote},<br />
    for your ticket ${data.displayId}.<br />
    Please feel free to contact us if you have still any query <br />
    Thanks and regards<br />
    fanbase Team
    </p>`;
  },

  FORGOT_PASSWORD_OTP: data => {
    return `Hi, ${data.name} \n Please use code ${data.otp} for reset your password. \n
    Please do not share with anyone for security reasons.\n Thanks fanbase`;
  },
};

export const STATUS_MSG = {
  ERROR: {
    ENTER_PHONE_OR_EMAIL_FOR_REGISTRATION: {
      statusCode: 400,
      type: 'ENTER_PHONE_OR_EMAIL_FOR_REGISTRATION',
      customMessage: {
        en: 'Please enter either email or phone number for registration',
      },
    },

    ENTER_PHONE_OR_EMAIL_FOR_LOGIN: {
      statusCode: 400,
      type: 'ENTER_PHONE_OR_EMAIL_FOR_LOGIN',
      customMessage: {
        en: 'Please enter either email or phone number for login',
      },
    },

    INVALID_EMAIL_PROVIDED: {
      statusCode: 400,
      type: 'INVALID_EMAIL_PROVIDED',
      customMessage: {
        en: 'Invalid email provided',
      },
    },

    COUNTRY_NAME_ALREADY_EXISTS: {
      statusCode: 400,
      type: 'COUNTRY_NAME_ALREADY_EXISTS',
      customMessage: {
        en: 'Country name you have entered is already taken',
      },
    },

    ENTER_PHONE_OR_EMAIL_FOR_FORGOT: {
      statusCode: 400,
      type: 'ENTER_PHONE_OR_EMAIL_FOR_FORGOT',
      customMessage: {
        en: 'Please enter either email or phone number for forgot password',
      },
    },

    INVALID_EMAIL_OR_PHONE_NUMBER_PROVIDED: {
      statusCode: 400,
      type: 'INVALID_EMAIL_OR_PHONE_NUMBER_PROVIDED',
      customMessage: {
        en: 'Invalid email or phone number provided',
      },
    },

    INVALID_OTP_PROVIDED: {
      statusCode: 400,
      type: 'INVALID_OTP_PROVIDED',
      customMessage: {
        en: 'Invalid otp provided',
      },
    },

    INVALID_TOKEN: {
      statusCode: 401,
      customMessage: {
        en: 'You are unauthorized or your session has been expired.',
      },
      type: 'INVALID_TOKEN',
    },
    UNAUTHORIZED: {
      statusCode: 401,
      customMessage: {
        en: 'You are not authorized to perform this action',
      },
      type: 'UNAUTHORIZED',
    },
    SOMETHING_WENT_WRONG: {
      statusCode: 400,
      type: 'SOMETHING_WENT_WRONG',
      customMessage: {
        en: 'Something went wrong on server. ',
      },
    },

    NO_ACCESS_OF_ACTION: {
      statusCode: 400,
      type: 'NO_ACCESS_OF_ACTION',
      customMessage: {
        en: 'You have no access to perform this action ',
      },
    },

    INVALID_OR_EXPIRED_OTP_PROVIDED: {
      statusCode: 400,
      type: 'INVALID_OR_EXPIRED_OTP_PROVIDED',
      customMessage: {
        en: 'Invalid or expired otp provided ',
      },
    },

    INVALID_FORGOT_ID_PROVIDED: {
      statusCode: 400,
      type: 'INVALID_FORGOT_ID_PROVIDED',
      customMessage: {
        en: 'Invalid forgot id provided ',
      },
    },

    PHONE_NUMBER_ALREADY_EXISTS: {
      statusCode: 400,
      type: 'PHONE_NUMBER_ALREADY_EXISTS',
      customMessage: {
        en: 'The phone number you have entered is already taken.',
      },
    },

    EMAIL_ALREADY_EXISTS: {
      statusCode: 400,
      type: 'EMAIL_ALREADY_EXISTS',
      customMessage: {
        en: 'The email you have entered is already taken',
      },
    },

    ACCOUNT_NO_LONGER_EXISTS_VERIFY: {
      statusCode: 400,
      type: 'ACCOUNT_NO_LONGER_EXISTS_VERIFY',
      customMessage: {
        en: 'account no longer exists, please contact to fanbase',
      },
    },

    ACCOUNT_SUSPENDED_VERIFY: {
      statusCode: 400,
      type: 'ACCOUNT_SUSPENDED_VERIFY',
      customMessage: {
        en: 'Your account has been suspended by fanbase,  please contact to fanbase',
      },
    },

    ACCOUNT_SUSPENDED: {
      statusCode: 400,
      type: 'ACCOUNT_SUSPENDED',
      customMessage: {
        en: 'Your account has been suspended by fanbase,  please contact to fanbase',
      },
    },

    NO_SESSION_AVAILABLE: {
      statusCode: 400,
      customMessage: {
        en: 'No session available',
      },
      type: 'NO_SESSION_AVAILABLE',
    },

    IMP_ERROR: {
      statusCode: 500,
      customMessage: {
        en: 'Implementation Error',
      },
      type: 'IMP_ERROR',
    },
    EMAIL_NOT_EXISTS: {
      statusCode: 400,
      customMessage: {
        en: 'The email address you have entered is not registered with us',
      },
      type: 'EMAIL_NOT_EXISTS',
    },

    INVALID_PASSWORD_PROVIDED: {
      statusCode: 400,
      customMessage: {
        en: 'Invalid password provided',
      },
      type: 'INVALID_PASSWORD_PROVIDED',
    },

    DB_ERROR: {
      statusCode: 400,
      customMessage: {
        en: 'DB Error : ',
      },
      type: 'DB_ERROR',
    },
    DUPLICATE: {
      statusCode: 400,
      customMessage: {
        en: 'Duplicate Entry',
      },
      type: 'DUPLICATE',
    },
    APP_ERROR: {
      statusCode: 400,
      customMessage: {
        en: 'Application error ',
      },
      type: 'APP_ERROR',
    },
    INVALID_ID: {
      statusCode: 400,
      customMessage: {
        en: 'Invalid id or item is currently unavailable',
      },
      type: 'INVALID_ID',
    },

    ACCOUNT_NO_LONGER_EXISTS: {
      statusCode: 401,
      customMessage: {
        en: 'your account no longer exists, please contact to fanbase',
      },
      type: 'ACCOUNT_NO_LONGER_EXISTS',
    },
  },
  SUCCESS: {
    SOCKET_CONNECTED: {
      statusCode: 200,
      customMessage: {
        en: 'Connected Successfully',
      },
      type: 'SOCKET_CONNECTED',
    },
    CREATED: {
      statusCode: 200,
      customMessage: {
        en: 'Created Successfully',
      },
      type: 'CREATED',
    },
    DEFAULT: {
      statusCode: 200,
      customMessage: {
        en: 'Successfully',
      },
      type: 'DEFAULT',
    },
  },
};

export const SWAGGER_RESPONSE_MESSAGE = [
  { code: 200, message: 'OK' },
  { code: 400, message: 'Bad Request' },
  { code: 401, message: 'Unauthorized' },
  { code: 404, message: 'Data Not Found' },
  { code: 500, message: 'Internal Server Error' },
];

export const NOTIFICATION_MESSAGES = {};

export const CHAINID_TO_RPC = {
  1: 'https://mainnet.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  5: 'https://goerli.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  10: 'https://optimism-mainnet.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  56: 'https://rpc.ankr.com/bsc',
  97: 'https://data-seed-prebsc-1-s3.binance.org:8545/',
  100: 'https://rpc.ankr.com/gnosis',
  122: 'https://fuse-rpc.gateway.pokt.network/',
  137: 'https://optimism-mainnet.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  250: 'https://rpcapi.fantom.network/',
  288: 'https://mainnet.boba.network/',
  420: 'https://optimism-goerli.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  1024: 'https://api-para.clover.finance',
  1285: 'https://rpc.api.moonriver.moonbeam.network/',
  1287: 'https://rpc.api.moonbase.moonbeam.network/',
  42161: 'https://arbitrum-mainnet.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  42220: 'https://celo-mainnet.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  43113: 'https://avalanche-fuji.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  43114: 'https://avalanche-mainnet.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  44787: 'https://celo-alfajores.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  80001: 'https://polygon-mumbai.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  421613: 'https://arbitrum-goerli.infura.io/v3/7a6077ec1ff04e70a21839f56d6a4ca1',
  1313161554: 'https://mainnet.aurora.dev',
  1313161555: 'https://testnet.aurora.dev',
  1666600000: 'https://api.harmony.one/',
  31337: 'http://localhost:8545'
}

// PURE API - Only interact with Fanbase Contracts
export const CHAINID_TO_ADDRESS = {
  1: {
    // Ethereum
    WETH: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    ROUTER: '0x9dcf1ab6107fb4893994CDB8C86e153D3b36efd8',
    FACTORY: '0x16783272aA1fa186AE626182fc698D4BcABa5470',
    NFTDEX_FACTORY: ''
  },
  5: {
    // Ethereum Goerli
    WETH: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
    ROUTER: '0x69EF8a64D1F2Ea751399a54C0688436FE95Dd093',
    FACTORY: '0xFae91Cd68209cc43c78c936F4D3fe98d3479Feaa',
    NFTDEX_FACTORY: ''
  },
  10: {
    // Optimism
    WETH: '0x4200000000000000000000000000000000000006',
    ROUTER: '0xc5Fc1974B4CCBF6b426771B606e7393Bf3B836a0',
    FACTORY: '0x10f8c3F4C1c6f85f0c8Be1B3Fec0429E44DBac2B',
    NFTDEX_FACTORY: ''
  },
  56: {
    // Smart Chain
    WETH: '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c',
    ROUTER: '0xc5Fc1974B4CCBF6b426771B606e7393Bf3B836a0',
    FACTORY: '0x10f8c3f4c1c6f85f0c8be1b3fec0429e44dbac2b',
    NFTDEX_FACTORY: ''
  },
  97: {
    // Smart Chain Testnet
    WETH: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    ROUTER: '0x4AFacEfAD8A539E59558C77cDee3463197EE8711',
    FACTORY: '0xDaAd4D35079cF675E68Fd5685b78789d1343395b'
  },
  100: {
    // Gnosis
    WETH: '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
    ROUTER: '0x507e3722e4420071D7F05f6983596ED4a0AFD006',
    FACTORY: '0xb3A8C0600CE1838E9efB0A8c47B2F6C7ee70f2b5',
    NFTDEX_FACTORY: ''
  },
  122: {
    // FUSE
    WETH: '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629',
    ROUTER: '0x574b817Ce5dC0cfe812198956234051b24f49823',
    FACTORY: '0x19f5d45374618Cc89398511657aCDdcAF69Bb877',
    NFTDEX_FACTORY: ''
  },
  137: {
    // Polygon
    WETH: '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270',
    ROUTER: '0xB5E96c7114D406257fA15Df5cE49E1B80227e80b',
    FACTORY: '0xC90698d6959c7524FE3d5Af3E8385F3a9431A090',
    NFTDEX_FACTORY: ''
  },
  250: {
    // Fantom Opera
    WETH: '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    ROUTER: '0x0961B625D71c23cF841435e80e2220d086a7D94f',
    FACTORY: '0x1AA55D2441A9de6cCe7762Ecf8CD661c5466e789',
    NFTDEX_FACTORY: ''
  },
  288: {
    // Boba
    WETH: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    ROUTER: '0x87694107287D504f184d181b933eC776dF83EcE4',
    FACTORY: '0x47fB69399A13263831F4D1855bAB0573b716Ef64',
    NFTDEX_FACTORY: ''
  },
  420: {
    // Optimism Goerli
    WETH: '0x4200000000000000000000000000000000000006',
    ROUTER: '0x75b5d69E59DADC6a2Af3d6EDE6AA30046cdC692a',
    FACTORY: '0x2E3e9a6a15276edDf765a6e2EE57f1eCd630A44c',
    NFTDEX_FACTORY: ''
  },
  1024: {
    // Clover P-Chain
    WETH: "0x6d6AD95425FcF315c39Fa6F3226471d4f16F27B3",
    ROUTER: '0x87694107287D504f184d181b933eC776dF83EcE4',
    FACTORY: '0x47fB69399A13263831F4D1855bAB0573b716Ef64',
    NFTDEX_FACTORY: ''
  },
  1285: {
    // Moonriver
    WETH: '0x98878B06940aE243284CA214f92Bb71a2b032B8A',
    ROUTER: '0x5b6cDD3C5294D48437FbCa45862258a2787e57ca',
    FACTORY: '0xfCDCBA599b2261f878CC9c244b2814FaE47F9b5B',
    NFTDEX_FACTORY: ''
  },
  1287: {
    // Moonbase Alpha
    WETH: "0xD909178CC99d318e4D46e7E66a972955859670E1 ",
    ROUTER: '0x4Daf236F48381B1B260F75E0613123D3f10c09E7',
    FACTORY: '0x54eae246066bB2d70FD424e150ebAA34E5AE4e04',
    NFTDEX_FACTORY: ''
  },
  42161: {
    // Arbitrum One
    WETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    ROUTER: '0x507e3722e4420071D7F05f6983596ED4a0AFD006',
    FACTORY: '0xb3A8C0600CE1838E9efB0A8c47B2F6C7ee70f2b5',
    NFTDEX_FACTORY: ''
  },
  42220: {
    // Celo
    WETH: "0x471EcE3750Da237f93B8E339c536989b8978a438",
    ROUTER: '0x75963A311f43D541C73C45e3ee6dc2980AA0CdFd',
    FACTORY: '0x5E35f3fe702B5033Bc66AF0bd11Cc9f3E1B9311A',
    NFTDEX_FACTORY: ''
  },
  43113: {
    //  Avalance Testnet / Fuji
    WETH: '0x1D308089a2D1Ced3f1Ce36B1FcaF815b07217be3',
    ROUTER: '0x641cB94488F6F5221Ea3F81c6E8FBA0605b08798',
    FACTORY: '0x27553A1d5a5D05235BC9E82fEb7033f892f03900',
    NFTDEX_FACTORY: ''
  },
  43114: {
    // Avalance
    WETH: '0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7',
    ROUTER: '0xFBf1124C6DE0a09f4be4D62c90D95fA7AB9eEA2E',
    FACTORY: '0xB05c4Cf6cf5989ca95273a2667515bD68aC8B029',
    NFTDEX_FACTORY: ''
  },
  44787: {
    // Celo Testnet / Alfajores
    WETH: '0x471EcE3750Da237f93B8E339c536989b8978a438',
    ROUTER: '0x1E776cA8068e5D37941F3C7cf1f830450bd934D7',
    FACTORY: '0x66E773F281457F188CF0bAA0EC76A6784C6Eb749',
    NFTDEX_FACTORY: ''
  },
  80001: {
    // Polygon Mumbai Testnet
    WETH: '0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889',
    ROUTER: '0x0AAd50127eDf96Cd82b850E9Dde200dAc7e1440B',
    FACTORY: '0x2fC052BB7335db2400e8c0e8Af3e19DA3dFb0CFc',
    NFTDEX_FACTORY: ''
  },
  421613: {
    // Arbitrum Goerli Testnet
    WETH: '0xc72aad0514fae691bb98b4eb50ae5803d75d7f12',
    ROUTER: '0x2E3e9a6a15276edDf765a6e2EE57f1eCd630A44c',
    FACTORY: '0x98b7c80Bc88b1685EC4C78D8BaC26b16F1bD564F'
  },
  1313161554: {
    // Aurora
    WETH: "0x8A791620dd6260079BF849Dc5567aDC3F2FdC318",
    ROUTER: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
    FACTORY: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    NFTDEX_FACTORY: ''
  },
  1313161555: {
    // Aurora Testnet
    WETH: '0x06303411c91d9d6671A04018621c797cd230DE91',
    ROUTER: '0x122DAb749a2Eac7d2ea2daAAfEccBacB6101375A',
    FACTORY: '0x20145afeccc317178ea8B0022aDC4d4DaaA6CE70',
  },
  1666600000: {
    // Harmony
    WETH: '0x8A791620dd6260079BF849Dc5567aDC3F2FdC318',
    ROUTER: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
    FACTORY: '0xb3A8C0600CE1838E9efB0A8c47B2F6C7ee70f2b5',
    NFTDEX_FACTORY: ''
  },
  31337: {
    // localhost
    WETH: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    ROUTER: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
    FACTORY: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    NFTDEX_FACTORY: ''
  }
}

export const ROUTE = {
  URL_PREFIX: '/v1'
}

export const IMMUTABLE_ADDRESS = {
  ZERO_ADDRESS: '0x0000000000000000000000000000000000000000',
  NULL_ADDRESS: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'
}

export const SWAP_CONSTANT = {
  DEFAULT_SLIPPAGE: 0.5,
  DEFAULT_DEADLINE: Date.now()
}