import React from "react";
import ModernLayout from "../../../../components/layouts/modern";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";
import PesaLinkTransactionDatagrid from "../../../../components/dashboard/reports/transactions/pesa-link-transaction-datagrid";

const title = "Pesa Link Transaction Report";
const Pesalink = () => {
  return (
    <>
      <Head>{title}</Head>
      <Container maxWidth="xl" sx={{py:2}}>
        <MKTypography sx={{my:1}} variant="h5">{title}</MKTypography>
        <Card sx={{ p: 1 }}>
            <PesaLinkTransactionDatagrid />
        </Card>
      </Container>
    </>
  );
};

Pesalink.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default Pesalink;
