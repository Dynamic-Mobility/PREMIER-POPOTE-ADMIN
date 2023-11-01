//------------------------ Backend APIs ----------------------//
export const API_URL = {

    /***************** TRANSACTIONS **********************/
    GET_TRANSACTION_TYPE_DESC: '/api/Transactions/getTransactionTypeDesc',
    GET_REQUESTS: '/api/Transactions/GetAllRequests',
    GET_REQUESTS_BY_ID: 'api/Transactions/getAllRequestByTrnId',
    GET_TRANSACTIONS: '/api/Transactions/getallTransactions/me',
    GET_TRANSACTION_BY_ID: '/api/Transactions/getallTransactionsByTrnId',
    FILTER_TRANSACTIONS: '/api/Transactions/Filteralltransactions',
    FILTER_ESB_TRANSACTIONS:'/api/Transactions/FilterEsbTransactions',
    GET_ATM_TRANSACTION_TYPE: '/api/Transactions/getATMTransactionType',
    GET_ESB_REPORT: '/api/Transactions/getEsbTrnReport',
    GET_ATM_REPORT: '/api/Transactions/getATMTrnReport',
    GET_TRANSACTION_BY_TYPE: '/api/Transactions/getAllAtmTrnsByType',
    GET_TRANSACTIONBY_ID: '/api/Transactions/getAllTransactionsByTrnId',
    // GET_ESB_REPORT: '/api/Transactions/getEsbTrnReport',
    // GET_ATM_REPORT: '/api/Transactions/getATMTrnReport',
    GET_ATM_GRAPH_DATA: '/api/Transactions/getatmgraphdata',
    GET_MPESA_TRANSACTIONS: '/api/Mpesa/GetMpesaTrasactions',
    DOWNLOAD_TRANSACTIONS_REPORT:'/api/Transactions/getEsbTrnReport',

    

    /***************** USERS **********************/
    GET_USERS: '/api/Account/users',
    UN_APPROVED_USERS: '/api/Account/unaprovedUsers',
    APPROVE_USERS: '/api/Account/approveusers',
    CREATE_USER: '/api/Account/createusers',
    GET_PROFILES: '/api/Account/profiles',
    ADD_PROFILE: '/api/Account/addprofile',
    

    /***************** ROLES **********************/
    GET_ROLES: '/api/Account/roles',
    GET_MENUS: '/api/Account/GetAllMenus',

    /***************** AUTHENTICATION APIS **********************/
    // LOGIN: '/api/v1/sponsorauth/login',
    LOGIN: '/login',
    REFRESH_TOKEN: '/api/refresh',
    GET_USER_MENUS: '/api/Account/getMenu',
    VALIDATE_OTP: '/api/Account/ValidateOpt',


    /***************** ATM TRANSACTIONS **********************/

    GET_LIVE_ATM_TRANSACTIONS: '/api/Transactions/GetAtmTransactions/daily',
    GET_ATM_TRANSACTION_TYPES: '/api/Transactions/getATMTransactionType',
    GET_FILTERED_ATM_TRANSACTIONS: '/api/Transactions/FilterAtmTransactions',


    /***************** CUSTOMERS **********************/

    FETCH_CUSTOMER_CIF: '/api/v1/customer/fetchcustomercif',
    ADD_UPDATE_CUSTOMERS: '/api/v1/customer/addupdatecustomerdetails',
    GET_ACCOUNT_SWITCHBY_CIF: '/api/v1/customer/getaccountswithcif',
    FETCH_ALL_CUSTOMERS: '/api/v1/customer/getallcustomers',
    FETCH_CUSTOMER_BY_ID: '/api/v1/customer/getallcustomers',
    FETCH_UNAPPROVED_CUSTOMERS: '/api/v1/customer/getallcustomersunapproved',
    APPROVE_CUSTOMER: '/api/v1/customer/approvecustomer',
    LINK_ACCOUNTS: '/api/v1/customer/linkaccounts',
    RESET_CUSTOMER_PIN: '/api/v1/customer/resetpin',
    VALIDATE_RESET_PIN_OTP: '/api/v1/customer/approveresetpin',
    BLOCK_UNBLOCK_CUSTOMER: '/api/v1/customer/blockaccount',

    FETCH_UPDATED_CUSTOMERS: '/api/v1/customer/geteditedcustomers',
    APPROVE_UPDATED_CUSTOMER: '/api/v1/customer/approveedited',

    FETCH_UNAPPROVED_ACCOUNTS: '/api/v1/customer/getunapprovedaccounts',
    FETCH_UNBLOCKED_CUSTOMERS: '/api/v1/customer/getunblocked',
    FETCH_BLOCKED_CUSTOMERS: '/api/v1/customer/getblockedcustomer',
    APPROVE_ACCOUNTS: '/api/v1/customer/approvelinkedaccount',

    /************************ SETTINGS ****************************/

    FETCH_TRANSACTION_TYPES: '/api/v1/settings/gettransactiontype',
    ADD_TRANSACTION_LIMIT: '/api/v1/settings/createlimit',
    FETCH_UNAPPROVED_LIMITS: '/api/v1/settings/getunapprovedlimit',
    APPROVE_UNAPPROVED_LIMITS: '/api/v1/settings/approvelimit',
    FETCH_LIMIT: '/api/v1/settings/getlimit',

    ADD_TRANSACTION_CHARGE: '/api/v1/settings/createcharges',
    FETCH_CHARGES: '/api/v1/settings/getcharges',


}


//------------------------ Application APIs ----------------------//
export const APP_API_URL = {

    /***************** AUTH **********************/
    LOGIN: '/api/login',
    REFRESH_TOKEN: '/api/admin/refresh-token',
    GET_USER_MENUS: '/api/current-user/menus',
    VALIDATE_OTP: '/api/Otp',



    /***************** USERS **********************/
    GET_USERS: '/api/users/getusers',
    UN_APPROVED_USERS: '/api/users/approve-users',
    APPROVE_USERS: '/api/users/approve-users',
    CREATE_USER: '/api/users',
    GET_PROFILES: '/api/users/get-profiles',
    ADD_PROFILE: '/api/users/create-profile',

    /***************** ROLES **********************/
    GET_ROLES: '/api/roles',
    GET_MENUS: '/api/menus',



    /***************** TRANSACTIONS **********************/
    GET_REQUESTS: '/api/transactions/request',
    GET_REQUESTS_BY_ID: '/api/transactions/request-id',
    GET_TRANSACTIONS: '/api/transactions/all-transactions',
    FILTER_TRANSACTIONS: '/api/transactions/filter-transactions',
    FILTER_ESB_TRANSACTIONS:'/api/transactions/filter-esb-transactions',
    GET_TRANSACTION_BY_ID: '/api/transactions/transaction-byid',
    GET_ESB_REPORT: '/api/transactions/esb-report',
    GET_ATM_REPORT: '/api/transactions/atm-report',
    GET_ATM_TRANSACTION_TYPE: '/api/transactions/atm-transaction-type',
    GET_TRANSACTION_TYPE: '/api/transactions/transaction-type',
    GET_MPESA_TRANSACTIONS: '/api/transactions/mpesa-transactions',
    DOWNLOAD_TRANSACTIONS_REPORT:'/api/transactions/download-esb-transaction',


    /***************** ATM TRANSACTIONS **********************/
    GET_LIVE_ATM_TRANSACTIONS: '/api/transactions/atm/live',
    GET_ATM_TRANSACTION_TYPES: '/api/transactions/atm/types',
    GET_FILTERED_ATM_TRANSACTIONS: '/api/transactions/atm/',


    
    /***************** CUSTOMERS **********************/

    FETCH_CUSTOMER_CIF: '/api/admin/customers/fetch-by-cif',
    ADD_UPDATE_CUSTOMERS: '/api/admin/customers/add-update-customers',
    GET_ACCOUNT_SWITCHBY_CIF: '/api/admin/customers/get-account-switch',
    FETCH_ALL_CUSTOMERS: '/api/admin/customers',
    FETCH_CUSTOMER_BY_ID: '/api/admin/customers/fetch-by-id',
    FETCH_UNAPPROVED_CUSTOMERS: '/api/admin/customers/unapproved',
    LINK_ACCOUNTS: '/api/admin/customers/link-accounts',
    APPROVE_CUSTOMER: '/api/admin/customers/approve-customer',
    RESET_CUSTOMER_PIN: '/api/admin/customers/reset-pin',
    VALIDATE_RESET_PIN_OTP: '/api/admin/customers/reset-pin-otp',
    BLOCK_UNBLOCK_CUSTOMER: '/api/admin/customers/block-unblock-customer',

    FETCH_UPDATED_CUSTOMERS: '/api/admin/customers/get-updated',
    APPROVE_UPDATED_CUSTOMER: '/api/admin/customers/approve-updated',

    FETCH_UNAPPROVED_ACCOUNTS: '/api/admin/customers/accounts/unapproved',
    FETCH_UNBLOCKED_CUSTOMERS: '/api/admin/customers/get-unblocked-customers',
    FETCH_BLOCKED_CUSTOMERS: '/api/admin/customers/get-blocked-customers',
    APPROVE_ACCOUNTS: '/api/admin/customers/accounts/approve',

    /************************ SETTINGS ****************************/

    FETCH_TRANSACTION_TYPES: '/api/admin/settings/fetch-txn-types',
    ADD_TRANSACTION_LIMIT: '/api/admin/settings/add-limit',
    FETCH_UNAPPROVED_LIMITS: '/api/admin/settings/unapproved-limits',
    FETCH_LIMIT: '/api/admin/settings/fetch-limit',
    APPROVE_UNAPPROVED_LIMITS: '/api/admin/settings/approve-limit',

    ADD_TRANSACTION_CHARGE: '/api/admin/settings/add-charge',
    FETCH_CHARGES: '/api/admin/settings/fetch-charge',



}

export const API_METHODS = {
    GET:'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
