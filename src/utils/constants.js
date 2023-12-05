export const appName = 'Premier Bank';
export const appDesc = 'MB Admin Portal';

export const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
export const AUTH_TOKEN_KEY = 'accessToken';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
export const ALLOWED_PAGE_SIZES = [10, 25, 50, 100, 200];
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
        icon: 'smartphone',
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

export const PAGE_PERMISSIONS = {
    VIEW:  {
        name: 'View',
        value: 0
    },
    CREATE: {
        name: 'Create',
        value: 2
    },
    EDIT: {
        name: 'Edit',
        value: 1
    },
    EXPORT: {
        name: 'Export',
        value: 3
    },
};

export const PAGES_PATHS = {
    DASHBOARD: '/dashboard/',
    CUSTOMER_DETAILS: '/dashboard/customers/customer-details',
    APPROVE_NEW_CUSTOMERS: '/dashboard/customers/customer-details',
}


export const PERMISSIONS = [PAGE_PERMISSIONS.VIEW, PAGE_PERMISSIONS.CREATE, PAGE_PERMISSIONS.EDIT, PAGE_PERMISSIONS.EXPORT];
