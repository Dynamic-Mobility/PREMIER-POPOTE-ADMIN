import React from "react";
import ModernLayout from "../../../../components/layouts/modern";
import { Card, Container } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";
import AirtimePurchaseDatagrid from "../../../../components/popote/reports/transactions/airtime-purchase-datagrid";

const title = "Airtime Purchase Transaction Report";
const AirtimePurchase = () => {
  return (
    <>
      <Head>{title}</Head>
      <Container maxWidth="xl" sx={{py:2}}>
        <MKTypography sx={{my:1}} variant="h5">{title}</MKTypography>
        <Card sx={{ p: 1 }}>
            <AirtimePurchaseDatagrid />
        </Card>
      </Container>
    </>
  );
};

AirtimePurchase.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default AirtimePurchase;
