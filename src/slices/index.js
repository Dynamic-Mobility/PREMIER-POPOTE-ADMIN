import customersReducer from './dashboard/customers';
import settingsReducer from './dashboard/settings';
import rolesReducer from './dashboard/roles';
import usersReducer from './dashboard/users';
import utilsReducer from './dashboard/utils';
import transactionsReducers from "./dashboard/transactions";


const reducers = {
    ...transactionsReducers,
    customers: customersReducer,
    settings : settingsReducer,
    roles: rolesReducer,
    users: usersReducer,
    utils: utilsReducer
}

export default reducers;