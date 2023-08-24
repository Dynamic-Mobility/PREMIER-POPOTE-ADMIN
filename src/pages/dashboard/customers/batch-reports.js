import React, { useState } from "react";
// import { AuthGuard } from "../../../hocs/auth-guard";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import { Container } from "@mui/system";
import { Typography, Box } from "@mui/material";
import BatchReportDataGrid from "../../../components/dashboard/customers/batch-report-data-grid";

// import UsersDataGrid from "../../../components/dashboard/users/users-data-grid";

const BatchReports = () => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <Container>
      <Typography my={2} fontWeight={"bold"} fontSize={"18px"} color="primary">
        Batch Reports
      </Typography>
      <Box
        sx={{
          my: 2,
          display: "flex",
          alignItems: "center",
          gap: 4,
          justifyContent: "space-around",
          cursor: "pointer",
        }}
      >
        <Typography
          onClick={() => setCurrentTab(0)}
          fontSize={"14px"}
          sx={{ textTransform: "uppercase",borderBottom: currentTab === 0 ? "2px solid #002E5E" : "none" }}
        >
          All Batches
        </Typography>
        <Typography
          onClick={() => setCurrentTab(1)}
          color="blue"
          fontSize={"14px"}
          sx={{ textTransform: "uppercase",borderBottom: currentTab === 1 ? "2px solid #002E5E" : "none" }}
        >
          Processed Batches
        </Typography>
        <Typography
          onClick={() => setCurrentTab(2)}
          color="green"
          fontSize={"14px"}
          sx={{ textTransform: "uppercase",borderBottom: currentTab === 2 ? "2px solid #002E5E" : "none" }}
        >
          Approved Batches
        </Typography>
        <Typography
          onClick={() => setCurrentTab(3)}
          color="orange"
          fontSize={"14px"}
          sx={{ textTransform: "uppercase",borderBottom: currentTab === 3 ? "2px solid #002E5E" : "none" }}
        >
          Pending Batches
        </Typography>
        <Typography
          onClick={() => setCurrentTab(4)}
          color="red"
          fontSize={"14px"}
          sx={{ textTransform: "uppercase",borderBottom: currentTab === 4 ? "2px solid #002E5E" : "none" }}
        >
          Rejected Batches
        </Typography>
      </Box>
      {currentTab === 0 && (
        <>
          <BatchReportDataGrid />
        </>
      )}
      {currentTab === 1 && (
        <>
          <BatchReportDataGrid />
        </>
      )}
      {currentTab === 2 && (
        <>
          <BatchReportDataGrid />
        </>
      )}
      {currentTab === 3 && (
        <>
          <BatchReportDataGrid />
        </>
      )}
      {currentTab === 4 && (
        <>
          <BatchReportDataGrid />
        </>
      )}
    </Container>
  );
};

BatchReports.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default BatchReports;
