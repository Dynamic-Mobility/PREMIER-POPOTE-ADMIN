import React from "react";
import { DashboardLayout } from "../../components/layouts/dashboard";
import {
  Card,
  TextField,
  Typography,
  Container,
  Button,
  Box,
} from "@mui/material";
import * as yup from "yup";
import { useFormik } from "formik";

const InterSwitchConnection = () => {
  const validationSchema = yup.object({
    connection_name: yup
      .string("Enter connection Name")
      .required("Connection Name is required"),
    serverIp: yup.string("Enter serverIP").required("Server IP is required"),
    serverPort: yup
      .string("Enter serverport")
      .required("ServerPort is required"),
  });

  const formik = useFormik({
    initialValues: {
      connection_name: "",
      serverIp: "",
      serverPort: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        // await dispatch(createUser(authUser, values));
        helpers.resetForm();
        toast.success("Connection established successfully");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  return (
    <>
      <Container maxWidth="xl">
        <Card sx={{ p: 4, my: 2 }}>
          <Typography fontWeight="bold" sx={{ mb: 2 }}>
            InterSwitch Settings
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="connection_name"
              sx={{ my: 2 }}
              label="Connection Name"
              value={formik.values.connection_name}
              onChange={formik.handleChange}
              error={
                formik.touched.connection_name &&
                Boolean(formik.errors.connection_name)
              }
              helperText={
                formik.touched.connection_name && formik.errors.connection_name
              }
            />
            <TextField
              fullWidth
              name="serverIp"
              sx={{ my: 2 }}
              label="Server Ip"
              value={formik.values.serverIp}
              onChange={formik.handleChange}
              error={formik.touched.serverIp && Boolean(formik.errors.serverIp)}
              helperText={formik.touched.serverIp && formik.errors.serverIp}
            />
            <TextField
              fullWidth
              name="serverPort"
              sx={{ my: 2 }}
              label="Server Port"
              value={formik.values.serverPort}
              onChange={formik.handleChange}
              error={
                formik.touched.serverPort && Boolean(formik.errors.serverPort)
              }
              helperText={formik.touched.serverPort && formik.errors.serverPort}
            />
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                size="small"
                variant="contained"
                color="primary"
              >
                Save
              </Button>
            </Box>
          </form>
        </Card>
      </Container>
    </>
  );
};

InterSwitchConnection.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default InterSwitchConnection;
