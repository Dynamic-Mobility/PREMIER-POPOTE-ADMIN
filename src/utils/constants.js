import { FaFileExcel, FaFileWord, FaFilePdf  } from "react-icons/fa";
export const appName = 'Premier Bank';
export const appDesc = 'MB Admin Portal';

export const GOOGLE_MAP_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
export const AUTH_TOKEN_KEY = 'accessToken';

export const AUTH_SESSION_KEY = 'sessionID';
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
export const APPROVAL_ACTION_TYPES = {
    APPROVE: 'Approve',
    REJECT: 'Reject'
};
export const BLOCK_TYPES = {
    CUSTOMER: 'Customer',
    ACCOUNT: 'Account'
}

export const REPORT_TYPES = {
    PDF: 'Pdf',
    EXCEL: 'Excel',
    WORD: 'Word'
}
export const REPORT_TYPES_OPTS = [
    {
        id: 1,
        name: "PDF",
        icon: <FaFilePdf color={'#ff2222'}/>,
        value: REPORT_TYPES.PDF,
    },
    {
        id: 2,
        name: "Excel",
        icon: <FaFileExcel color={'#106b22'}/>,
        value: REPORT_TYPES.EXCEL,
    },
    {
        id: 3,
        name: "Word",
        icon: <FaFileWord color={'#0a66c0'}/>,
        value: REPORT_TYPES.WORD,
    }
];

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
    EXISTING_CUSTOMERS: '/dashboard/customers/all',
    CUSTOMER_DETAILS: '/dashboard/customers/customer-details',
    APPROVE_NEW_CUSTOMERS: '/dashboard/customers/new-customers',
    APPROVE_UNBLOCKED_CUSTOMERS: '/dashboard/customers/approve-unblocked',
    APPROVE_EDITED_CUSTOMERS: '/dashboard/customers/edited-customers',
    APPROVE_CUSTOMER_ACCOUNTS: '/dashboard/customers/accounts-approval',
    GLOBAL_LIMITS: '/dashboard/parameters/global-limits',
    PERSONALIZED_LIMITS: '/dashboard/parameters/personalized-limits',
    APPROVE_LIMITS: '/dashboard/parameters/approve-limits',
    APPROVE_EDITED_LIMITS: '/dashboard/parameters/approve-edited-limits',
    GLOBAL_CHARGES: '/dashboard/parameters/charges',
    USER_ROLES: '/dashboard/roles/user-roles',
    MANAGE_USERS: '/dashboard/users/existing',
    APPROVE_USERS: '/dashboard/users/approve',

}


export const PERMISSIONS = [PAGE_PERMISSIONS.VIEW, PAGE_PERMISSIONS.CREATE, PAGE_PERMISSIONS.EDIT, PAGE_PERMISSIONS.EXPORT];
