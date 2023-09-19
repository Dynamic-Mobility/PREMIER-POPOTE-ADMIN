import React from "react";
import { Container, Card } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import ModernLayout from "../../../../components/layouts/modern";
import { appName } from "../../../../utils/constants";
import Head from "next/head";
import AuditTrailDataGrid from "../../../../components/dashboard/reports/system-reports/audit-trail-datagrid";

const title = "Audit Trail";

const AuditTrail = () => {
  return (
    <>
      <Head>
        {title} | {appName}
      </Head>
      <Container maxWidth="xl" sx={{ my: 2 }}>
        <MKTypography fontWeight={"bold"} fontSize={"20px"}>
          {title}
        </MKTypography>
        <Card sx={{ p: 2 }}>
          <AuditTrailDataGrid />
        </Card>
      </Container>
    </>
  );
};

AuditTrail.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default AuditTrail;
