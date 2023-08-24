import React,{useEffect} from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Card } from "@mui/material";
import ProfileDataGrid from "../../../components/dashboard/users/profile-data-grid";
import { getAllProfiles } from "../../../slices/dashboard/users";
import { useAuth } from "../../../hooks/use-auth";
import { useDispatch } from "react-redux";



const AllProfiles = () => {
  const authUser = useAuth();

  const dispatch = useDispatch();

  const fetchProfile = async () => {
    await dispatch(getAllProfiles(authUser));
  };

  useEffect(() =>{
    fetchProfile();
  },[])
  
  return (
    <Container>
      <Typography m={2} variant="h6">
        Profiles
      </Typography>
      <Card sx={{ p:2, m:2}}>
        <ProfileDataGrid />
      </Card>
    </Container>
  );
};

AllProfiles.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default AllProfiles;

