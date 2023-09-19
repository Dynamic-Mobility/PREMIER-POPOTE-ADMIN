import dashboardReducer from "./dashboard";
import requestReducer from './dashboard/transactions/request'
import transactionReducer from './dashboard/transactions/all-transactions'
import esbReducer from './dashboard/transactions/esb-report'
import atmReducer from './dashboard/transactions/atm-report'
import userReducer from './dashboard/users'
import roleReducer from './dashboard/roles'
import allTransactionsReducer from './popote/all-transactions';
import customersReducer from './popote/customers';


const reducers = {
    allTransactions: allTransactionsReducer,
    customers: customersReducer,

    users: userReducer,
    role: roleReducer,
    dashboard: dashboardReducer,
    request: requestReducer,
    transaction: transactionReducer,
    esbReport: esbReducer,
    atmReport: atmReducer
}

export default reducers;