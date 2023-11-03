import allTransactionsReducer from './dashboard/transactions';
import customersReducer from './dashboard/customers';
import settingsReducer from './dashboard/settings';
import rolesReducer from './dashboard/roles';
import usersReducer from './dashboard/users'


const reducers = {
    allTransactions: allTransactionsReducer,
    customers: customersReducer,
    settings : settingsReducer,
    roles: rolesReducer,
    users: usersReducer,
}

export default reducers;