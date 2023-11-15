import React from "react";
import { Container, Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import ModernLayout from "../../../../components/layouts/modern";
import { appName } from "../../../../utils/constants";
import DormantCustomersDataGrid from "../../../../components/dashboard/reports/system-reports/dormant-customers-datagrid";
import Head from "next/head";

const title = "OTP Sms";

const OtpSms = () => {
  return (
    <>
    <Head>{title} | {appName}</Head>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <MKTypography fontWeight={"bold"} fontSize={"20px"}>
          {title}
        </MKTypography>
        <Card sx={{ p: 2 }}>
          <DormantCustomersDataGrid />
        </Card>
      </Container>
    </>
  );
};

OtpSms.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default OtpSms;
