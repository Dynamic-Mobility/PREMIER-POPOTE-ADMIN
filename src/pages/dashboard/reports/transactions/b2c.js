import React from "react";
import ModernLayout from "../../../../components/layouts/modern";
import { Card, Container } from "@mui/material";
import B2cDatagrid from "../../../../components/dashboard/reports/transactions/b2c-datagrid";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";

const title = "B2C Transaction Report";
const B2C = () => {
  return (
    <>
      <Head>{title}</Head>
      <Container maxWidth="xl" sx={{py:2}}>
        <MKTypography sx={{my:1}} variant="h5">{title}</MKTypography>
        <Card sx={{ p: 1 }}>
          <B2cDatagrid />
        </Card>
      </Container>
    </>
  );
};

B2C.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default B2C;
