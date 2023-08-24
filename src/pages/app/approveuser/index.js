import React,{useEffect} from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Card } from "@mui/material";
import ApproveUsersDataGrid from "../../../components/dashboard/users/approve-users-data-grid";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { getAllUnApprovedUsers } from "../../../slices/dashboard/users";


const ApproveUsers = () => {
  const authUser = useAuth();
  const dispatch = useDispatch();

  const fetchUnApproved = async () => {
    await dispatch(getAllUnApprovedUsers(authUser));
  };

  useEffect(() =>{
    fetchUnApproved();
  },[])

  return (
    <Container>
      <Typography m={2} variant="h6">
        Approve Users
      </Typography>
      <Card sx={{ p: 2, m: 2 }}>
        <ApproveUsersDataGrid />
      </Card>
    </Container>
  );
};

ApproveUsers.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default ApproveUsers;
