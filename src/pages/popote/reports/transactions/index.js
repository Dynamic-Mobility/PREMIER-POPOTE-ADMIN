import { appName } from "../../../../utils/constants";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";
import Container from "@mui/material/Container";
import MKBox from "../../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import { DashboardLayout } from "../../../../components/layouts/dashboard";
import { useMounted } from "../../../../hooks/use-mounted";
import { useDispatch, useSelector } from "../../../../store";
import { useAuth } from "../../../../hooks/use-auth";
import TransactionDataGrid from "../../../../components/popote/reports/transactions/transactions-data-grid";
import {Card} from "@mui/material";
import TransactionsActionButtons from "../../../../components/popote/reports/transactions/transactions-action-buttons";
import {setPageSize, setActivePage} from "../../../../slices/popote/all-transactions";
import ModernLayout from "../../../../components/layouts/modern";


const title = "All Transactions";

const TransactionsPage = () => {
  const isMounted = useMounted();
  const dispatch = useDispatch();
  const authUser = useAuth();
  const {
      allTransactions,
      pageSize,
      activePage
  } = useSelector(({ allTransactions }) => allTransactions);

  const handleOnPageSizeChange = value => {
      dispatch(setPageSize(value));
  }

  const handleOnPageChange = value => {
      dispatch(setActivePage(value));
  }

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
                      <TransactionsActionButtons/>
                  </Grid>
              </Grid>
          </MKBox>
          <Card sx={{p:1}}>
              <TransactionDataGrid
                  data={allTransactions}
                  limit={pageSize}
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
