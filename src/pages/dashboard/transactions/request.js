import React, { useEffect } from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography } from "@mui/material";
import { Card } from "@mui/material";
import RequestDataGrid from "../../../components/dashboard/transactions/request-data-grid";
import { getAllRequests } from "../../../slices/dashboard/transactions/request";
import { useSelector,useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";


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
        Requests
      </Typography>
      {/* <Card sx={{ p: 2, m: 2 }}> */}
        <RequestDataGrid />
      {/* </Card> */}
    </Container>
  );
};

TransactionRequest.getLayout = (page) => (
    // <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  // </AuthGuard>
);

export default TransactionRequest;
