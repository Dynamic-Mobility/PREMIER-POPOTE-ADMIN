import React from "react";
import ModernLayout from "../../../../components/layouts/modern";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";
import BillPaymentDatagrid from "../../../../components/dashboard/reports/transactions/bill-payment-datagrid";

const title = "Bill Payment Transaction Report";
const BillPayment = () => {
  return (
    <>
      <Head>{title}</Head>
      <Container maxWidth="xl" sx={{py:2}}>
        <MKTypography sx={{my:1}} variant="h5">{title}</MKTypography>
        <Card sx={{ p: 1 }}>
            <BillPaymentDatagrid />
        </Card>
      </Container>
    </>
  );
};

BillPayment.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default BillPayment;
