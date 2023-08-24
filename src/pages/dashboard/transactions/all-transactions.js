import React from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography,Card } from "@mui/material";
import TransactionDataGrid from "../../../components/dashboard/transactions/all-transactions-data-grid";
import { getAllTransactions } from "../../../slices/dashboard/transactions/all-transactions";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { useEffect } from "react";


const AllTransactions = () => {
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { transactions } = useSelector(({ transaction }) => transaction);

  const fetchTransactions = async () => {
    await dispatch(getAllTransactions(authUser));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <Container>
      {/* <Typography m={2} variant="h6">
        Transactions
      </Typography> */}
        <TransactionDataGrid />
    </Container>
  );
};

AllTransactions.getLayout = (page) => (
  // <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //  </AuthGuard>
);

export default AllTransactions;
