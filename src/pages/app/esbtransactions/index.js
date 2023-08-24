import React, { useEffect } from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { getAllRequests } from "../../../slices/dashboard/transactions/request";
import { useSelector,useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { EsbTransactionDataGrid } from '../../../components/dashboard/transactions/esb-transaction-data-grid'

const TransactionRequest = () => {
  const dispatch = useDispatch();
  const { requests } = useSelector(({ request }) => request)
  const authUser = useAuth();

  const fetchTransactionRequest = async()=>{
    await dispatch(getAllRequests(authUser))
  }

  useEffect(() =>{
    fetchTransactionRequest();
  },[])

  return (
    <Container>
      <Typography m={2} variant="h6">
        Esb Transactions
      </Typography>
      <EsbTransactionDataGrid />
    </Container>
  );
};

TransactionRequest.getLayout = (page) => (
    // <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  // </AuthGuard>
);

export default TransactionRequest;
