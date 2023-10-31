export const appName = 'Premier Bank';

export const ALLOWED_PAGE_LIMITS = [ 'all', 25, 50, 100];
export const AUTH_TOKEN_KEY = 'accessToken';
export const USER_DETAILS = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';

export const ALLOWED_PAGE_SIZES = [1, 25, 50, 100];

export const CHANNEL_TYPES = [
    {
        id: 1,
        label: 'USSD',
        icon: 'pin',
        value: 'USSD'
    },
    {
        id: 2,
        label: 'Mobile App',
        icon: 'mobile',
        value: 'APP'
    }
];

export const BLOCK_TYPES = {
    CUSTOMER: 'Customer',
    ACCOUNT: 'Account'
}

export const BLOCK_ACTION_TYPES = {
    BLOCK: 'Block',
    UNBLOCK: 'Unblock',
    UNLINK: 'Unlink',
}


export const CHARGES = {
    FLAT: 'Flat',
    PERCENTAGE: 'Percentage',
    RANGE: 'Range'
}

export const CHARGES_TYPES = [
    {
        value: CHARGES.FLAT,
        icon: "local_atm",
        name: "Flat"
    },
    {
        value: CHARGES.PERCENTAGE,
        icon: "percentage",
        name: "Percentage"
    },
    {
        value: CHARGES.RANGE,
        icon: "width",
        name: "Range"
    }
];

