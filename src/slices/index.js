import dashboardReducer from "./dashboard";
import requestReducer from './dashboard/transactions/request'
import transactionReducer from './dashboard/transactions/all-transactions'
import esbReducer from './dashboard/transactions/esb-report'
import atmReducer from './dashboard/transactions/atm-report'
import userReducer from './dashboard/users'
import roleReducer from './dashboard/roles'


const reducers = {
    users: userReducer,
    role: roleReducer,
    dashboard: dashboardReducer,
    request: requestReducer,
    transaction: transactionReducer,
    esbReport: esbReducer,
    atmReport: atmReducer
}

export default reducers;