import React from "react";
import { AuthGuard } from "../../../hocs/auth-guard";
import { Card } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import EditedCustomersDataGrid from "../../../components/popote/customers/edited-customers-datagrid";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";


const title = 'Approve Edited Customers'
const EditedCustomers = () => {
  return (
    <>
     <Head>{title}</Head>
      <MKBox sx={{p:2}}>
        <MKTypography sx={{ my: 1 }} fontWeight={"bold"} fontSize={"20px"}>
          {title}
        </MKTypography>
        <Card sx={{ p: 3 }}>
          <EditedCustomersDataGrid />
        </Card>
      </MKBox>
    </>
  );
};

EditedCustomers.getLayout = (page) => {
  return (
    <>
      <ModernLayout>{page}</ModernLayout>
    </>
  );
};

export default EditedCustomers;
