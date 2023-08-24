import React from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Card } from "@mui/material";
import EsbTransactionDataGrid from "../../../components/dashboard/transactions/esb-transaction-data-grid";
import { fetchAllEsbReports } from "../../../slices/dashboard/transactions/esb-report";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { useEffect } from "react";
import { getAllTransactions } from "../../../slices/dashboard/transactions/all-transactions";


const AllTransactions = () => {
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { esbReports } = useSelector(({ esbReport }) => esbReport);
  console.log(esbReports);

  const fetchEsbReports = async()=>{
    await dispatch(fetchAllEsbReports(authUser))
  }

  useEffect(() =>{
    fetchEsbReports();
  },[])

  return (
    <Container>
      <Typography m={2} variant="h6">
        ESB Report
      </Typography>
      <Card sx={{ p: 2, m: 2 }}>
        <EsbTransactionDataGrid />
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
