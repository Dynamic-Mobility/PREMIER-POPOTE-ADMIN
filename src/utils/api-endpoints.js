//------------------------ Backend APIs ----------------------//
export const API_URL = {
    /***************** AUTH **********************/
    LOGIN: '/api/v1/auth/login',
    REFRESH_TOKEN: '/api/v1/auth/refresh',
    GET_USER_MENUS: '/api/v1/account/getmenus',
    VALIDATE_OTP: '/api/v1/account/validateotp',


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
    FETCH_EDITED_UNAPPROVED_LIMITS: '/api/v1/settings/geteditedunapprovedlimit',
    APPROVE_UNAPPROVED_LIMITS: '/api/v1/settings/approvelimit',
    APPROVE_EDITED_UNAPPROVED_LIMITS: '/api/v1/settings/approveeditedlimits',
    FETCH_LIMIT: '/api/v1/settings/getlimit',

    ADD_TRANSACTION_CHARGE: '/api/v1/settings/createcharges',
    FETCH_CHARGES: '/api/v1/settings/getcharges',


    /************************ ROLES ****************************/

    FETCH_ROLES: '/api/v1/account/getroles',
    FETCH_ROLES_PERMISSIONS: '/api/v1/account/getpermissionbyrole',
    FETCH_MENUS: '/api/v1/account/getallpermissions',
    ADD_ROLE: '/api/v1/account/addrolesandpermissions',

    /************************ UTILITIES ****************************/

    FETCH_BRANCHES: '/api/v1/settings/getbranches',
    FETCH_DEPARTMENTS: '/api/v1/settings/getdepartments',
    ADD_BRANCH: '/api/v1/settings/createbranches',
    ADD_DEPARTMENT: '/api/admin/utilities/add-department',

    /************************ USERS ****************************/

    FETCH_USERS: '/api/v1/account/getcreateunapproved',
    FETCH_UNAPPROVED_USERS: '/api/v1/account/getcreateunapproved',
    ADD_USERS: '/api/v1/account/adduser',
    APPROVE_USERS: '/api/v1/account/approveusers',

    /************************ TRANSACTIONS ****************************/

    FETCH_ALL_TRANSACTIONS: '/api/v1/transactions/getalltransaction',


}


//------------------------ Application APIs ----------------------//
export const APP_API_URL = {

    /***************** AUTH **********************/
    LOGIN: '/api/login',
    REFRESH_TOKEN: '/api/admin/account/refresh-token',
    GET_USER_MENUS: '/api/admin/account/fetch-user-menu',
    VALIDATE_OTP: '/api/admin/account/validate-otp',



    
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
    FETCH_EDITED_UNAPPROVED_LIMITS: '/api/admin/settings/unapproved-edited-limits',
    FETCH_LIMIT: '/api/admin/settings/fetch-limit',
    APPROVE_UNAPPROVED_LIMITS: '/api/admin/settings/approve-limit',
    APPROVE_EDITED_UNAPPROVED_LIMITS: '/api/admin/settings/approve-edited-limit',

    ADD_TRANSACTION_CHARGE: '/api/admin/settings/add-charge',
    FETCH_CHARGES: '/api/admin/settings/fetch-charge',


    /************************ ROLES ****************************/

    FETCH_ROLES: '/api/admin/roles/fetch-roles',
    FETCH_ROLES_PERMISSIONS: '/api/admin/roles/fetch-roles-perms',
    FETCH_MENUS: '/api/admin/roles/fetch-menus',
    ADD_ROLE: '/api/admin/roles/add-role',


    /************************ UTILITIES ****************************/

    FETCH_BRANCHES: '/api/admin/utilities/fetch-branches',
    FETCH_DEPARTMENTS: '/api/admin/utilities/fetch-departments',
    ADD_BRANCH: '/api/admin/utilities/add-branch',
    ADD_DEPARTMENT: '/api/admin/utilities/add-department',

    /************************ USERS ****************************/

    FETCH_USERS: '/api/admin/users/fetch-users',
    FETCH_UNAPPROVED_USERS: '/api/admin/users/fetch-unapproved-users',
    ADD_USERS: '/api/admin/users/add-user',
    APPROVE_USERS: '/api/admin/users/approve-users',

    /************************ TRANSACTIONS ****************************/

    FETCH_ALL_TRANSACTIONS: '/api/admin/transactions/fetch-all',

}

export const API_METHODS = {
    GET:'GET',
    POST: 'POST',
    PATCH: 'PATCH',
    PUT: 'PUT',
    DELETE: 'DELETE'
}
