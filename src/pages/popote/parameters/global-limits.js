import { appName } from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import Head from "next/head";

import MKBox from "../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import { useMounted } from "../../../hooks/use-mounted";
import { useDispatch, useSelector } from "../../../store";
import { useAuth } from "../../../hooks/use-auth";
import {Card} from "@mui/material";
import {setPageSize, setActivePage} from "../../../slices/popote/all-transactions";
import ModernLayout from "../../../components/layouts/modern";
import GlobalLimits from "../../../components/popote/limits/global-limits";


const title = "Global Limits";

const GlobalLimitsPage = () => {
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
              </Grid>
          </MKBox>
          <Card sx={{p:1}}>
              <GlobalLimits/>
          </Card>
      </MKBox>
    </>
  );
};

GlobalLimitsPage.getLayout = (page) => (
  // <AuthGuard>
    <ModernLayout>
        {page}
    </ModernLayout>
  // </AuthGuard>
);

export default GlobalLimitsPage;
