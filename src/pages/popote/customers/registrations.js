import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import { AuthGuard } from "../../../hocs/auth-guard";
import RegistrationsDatagrid from "../../../components/popote/customers/registrations-datagrid";
import ModernLayout from "../../../components/layouts/modern";
import MKBox from "../../../components/@mui-components/box";
import Head from "next/head";

const title = "Approve Registrations";
const Registrations = () => {
  return (
    <>
    <Head>{title}</Head>
      <MKBox sx={{ p: 2 }}>
        <MKTypography sx={{ my: 1 }} fontWeight={"semibold"} fontSize={"20px"}>
          {title}
        </MKTypography>
        <Card sx={{ p: 3 }}>
          <RegistrationsDatagrid />
        </Card>
      </MKBox>
    </>
  );
};

Registrations.getLayout = (page) => {
  return (
    <>
      {/* <AuthGuard> */}
      <ModernLayout>{page}</ModernLayout>;{/* </AuthGuard> */}
    </>
  );
};

export default Registrations;
