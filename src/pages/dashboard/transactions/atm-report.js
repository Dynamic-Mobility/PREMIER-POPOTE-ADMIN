import React from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography,Card } from "@mui/material";
import AtmTransactionDataGrid from "../../../components/dashboard/transactions/atm-transaction-data-grid";
import { fetchAllAtmReports } from "../../../slices/dashboard/transactions/atm-report";
import { useDispatch,useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { useEffect } from "react";


const AllTransactions = () => {
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { atmReports } = useSelector(({ atmReport }) => atmReport)
  console.log( atmReports)

  const fetchAtmReports = async()=>{
    await dispatch(fetchAllAtmReports(authUser))
  }

  useEffect(() =>{
    fetchAtmReports();
  },[])
  
  return (
    <Container>
      <Typography m={2} variant="h6">
        ATM Report
      </Typography>
      <Card sx={{ p: 2, m: 2 }}>
      <AtmTransactionDataGrid />
      </Card>
    </Container>
  );
};

AllTransactions.getLayout = (page) => (
  // <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
//  </AuthGuard>
);

export default AllTransactions;
