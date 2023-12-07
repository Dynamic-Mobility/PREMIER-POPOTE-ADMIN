import billReducer from "./bill-transactions";
import allTransactionsReducer from "./all";
import pesalinkTransactionReducer from "./pesalink-transactions";
import mpesaTransactionReducer from "./mpesa-transactions";
import transferTransactionReducer from "./transfers-transactions";
import airtimeTransactionReducer from "./airtime-transactions";

const transactionsReducers = {
    billTransactions: billReducer,
    allTransactions: allTransactionsReducer,
    mpesaTransactions: mpesaTransactionReducer,
    pesalinkTransactions: pesalinkTransactionReducer,
    transferTransactions: transferTransactionReducer,
    airtimeTransactions: airtimeTransactionReducer,
}

export default transactionsReducers;