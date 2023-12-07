import { appName } from "../../../../utils/constants";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "../../../../store";
import TransactionDataGrid from "../../../../components/dashboard/reports/transactions/transactions-data-grid";
import {Card} from "@mui/material";
import TransactionsActionButtons from "../../../../components/dashboard/reports/transactions/transactions-action-buttons";
import {
    setPageSize,
    setActivePage,
    setFilters,
    fetchAllTransaction,
    resetFilters
} from "../../../../slices/dashboard/transactions/all";
import ModernLayout from "../../../../components/layouts/modern";
import {useCallback, useEffect} from "react";
import {useAuth} from "../../../../hooks/use-auth";
import {formatDate, splitString} from "../../../../utils/helper-functions";
import {AuthGuard} from "../../../../hocs/auth-guard";
import {transactionsApis} from "../../../../api-requests/transactions-apis";


const title = "All Transactions";

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const authUser = useAuth();

  const {
      allTransactions,
      filters,
      pageSize,
      activePage,
      totalRecords
  } = useSelector(({ allTransactions }) => allTransactions);


  const handleOnPageSizeChange = async value => {
      await getAllTransactions(filters, value, 1);
      dispatch(setPageSize(value));
      dispatch(setActivePage(1));
  }

  const handleOnPageChange = async value => {
      await getAllTransactions(filters, pageSize, value);
      dispatch(setActivePage(value));
  }

    const handleOnReset = () => {
        dispatch(resetFilters());
    }

    const handleOnSetFilters = filters => {
        dispatch(setFilters(filters));
    }
    const handleSetActivePage= value => {
        dispatch(setActivePage(value));
    }



  const getAllTransactions = useCallback(async (filters, pageSize, activePage) => {
      const values = {
          transactionType: filters.txnType,
          customerId: filters.customerId,
          accountFrom: filters.accountFrom,
          phoneNumber: filters.mobileNo,
          amount: Boolean(filters.amount) ? splitString(filters.amount) : null,
          channel: Boolean(filters.channel) ? filters.channel?.toLowerCase() : "",
          dateRange: filters.startDate && filters.endDate ?
              [
                  formatDate(filters.startDate, "DD MMM YYYY HH:mm"),
                  formatDate(filters.endDate, "DD MMM YYYY HH:mm")
              ] : null,
          processed: filters.isProcessed ? "Yes" : "",
          pageNumber: activePage,
          pageSize: pageSize
      }
      await dispatch(fetchAllTransaction(authUser, values))
  },[authUser?.user]);

    const getAllTransactionsReports = useCallback(async (filters, reportType) => {
        const values = {
            transactionType: filters.txnType,
            customerId: filters.customerId,
            reportType: reportType,
            accountFrom: filters.accountFrom,
            phoneNumber: filters.mobileNo,
            amount: Boolean(filters.amount) ? splitString(filters.amount) : null,
            channel: Boolean(filters.channel) ? filters.channel?.toLowerCase() : "",
            dateRange: filters.startDate && filters.endDate ?
                [
                    formatDate(filters.startDate, "DD MMM YYYY HH:mm"),
                    formatDate(filters.endDate, "DD MMM YYYY HH:mm")
                ] : null,
            processed: filters.isProcessed ? "Yes" : "",
        }
        return await  transactionsApis.downloadAllTransactionReport(authUser, values);
    },[authUser?.user]);


  useEffect(() => {
      getAllTransactions(filters, pageSize, activePage);
  },[])

  return (
    <>
      <Head>
        <title>{title} | {appName}</title>
      </Head>
      <MKBox
        //component="main"
        sx={{
          flexGrow: 1,
          pt: 2,
            px:2,
        }}
      >
          <MKBox sx={{ mb: 2 }}>
              <Grid container justifyContent="space-between" spacing={3}>
                  <Grid item>
                      <MKTypography variant="h5">{title}</MKTypography>
                  </Grid>
                  <Grid item>
                      <TransactionsActionButtons
                          {...{
                              transactionType: 'all',
                              setFilters: handleOnSetFilters,
                              setActivePage: handleSetActivePage,
                              onFilter: getAllTransactions,
                              onExport: reportType => getAllTransactionsReports(filters, reportType),
                              onResetFilters: handleOnReset,
                              filters,
                              pageSize,
                              activePage
                          }}/>
                  </Grid>
              </Grid>
          </MKBox>
          <Card sx={{p:1}}>
              <TransactionDataGrid
                  data={allTransactions}
                  limit={pageSize}
                  totalRecords={totalRecords}
                  activePage={activePage}
                  onPageSizeChange = {handleOnPageSizeChange}
                  onPageChange={handleOnPageChange}
              />
          </Card>
      </MKBox>
    </>
  );
};

TransactionsPage.getLayout = (page) => (
   <AuthGuard>
        <ModernLayout>
            {page}
        </ModernLayout>
  </AuthGuard>
);

export default TransactionsPage;
