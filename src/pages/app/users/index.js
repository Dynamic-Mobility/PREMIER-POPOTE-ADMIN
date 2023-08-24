import React,{useEffect} from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Card, Box } from "@mui/material";
import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../slices/dashboard/users";
import { useAuth } from "../../../hooks/use-auth";



const AllUsers = () => {
  const authUser = useAuth();
  const dispatch = useDispatch();

  const fetchUser = async () => {
    await dispatch(getAllUsers(authUser));
  };

  useEffect(() =>{
    fetchUser();
  },[])

  return (
    <Container>
      <Typography className="font-bold" m={2} variant="h6">
        All Users
      </Typography>
      <Card sx={{ p: 2, m: 2 }}>
        <UsersDataGrid />
      </Card>
    </Container>
  );
};

AllUsers.getLayout = (page) => (
  // <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
  // </AuthGuard>
);

export default AllUsers;
