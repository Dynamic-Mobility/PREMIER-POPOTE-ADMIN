import { appName } from "../../../../utils/constants";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "../../../../store";
import TransactionDataGrid from "../../../../components/dashboard/reports/transactions/transactions-data-grid";
import {Card} from "@mui/material";
import TransactionsActionButtons from "../../../../components/dashboard/reports/transactions/transactions-action-buttons";
import {setPageSize, setActivePage, fetchAllTransaction} from "../../../../slices/dashboard/transactions";
import ModernLayout from "../../../../components/layouts/modern";
import {useCallback, useEffect} from "react";
import {useAuth} from "../../../../hooks/use-auth";
import { splitString} from "../../../../utils/helper-functions";


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



  const getAllTransactions = useCallback(async (filters, pageSize, activePage) => {
      const values = {
          customerId: filters.customerId,
          accountFrom: filters.accountFrom,
          phoneNumber: filters.mobileNo,
          amount: Boolean(filters.amount) ? splitString(filters.amount) : null,
          channel: Boolean(filters.channel) ? filters.channel?.toLowerCase() : "",
          dateRange: filters.startDate && filters.endDate ? [filters.startDate, filters.endDate] : null,
          processed: filters.isProcessed ? "Yes" : "",
          pageNumber: activePage,
          pageSize: pageSize
      }
      await dispatch(fetchAllTransaction(authUser, values))
  },[]);


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
                      <TransactionsActionButtons onFilter = {getAllTransactions}/>
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
  // <AuthGuard>
    <ModernLayout>
        {page}
    </ModernLayout>
  // </AuthGuard>
);

export default TransactionsPage;
