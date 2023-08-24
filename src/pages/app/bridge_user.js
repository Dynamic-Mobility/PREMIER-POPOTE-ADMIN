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

const BridgeUser = () => {

  const validationSchema = yup.object({
    dhi_user: yup
      .string("Enter DHI User")
      .required("DHI User is required"),
    password: yup.string("Enter password").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      dhi_user: "",
      password: "",
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
            Bridge Users Settings
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              name="dhi_user"
              sx={{ my: 2 }}
              label="DHI USER"
              value={formik.values.dhi_user}
              onChange={formik.handleChange}
              error={
                formik.touched.dhi_user &&
                Boolean(formik.errors.dhi_user)
              }
              helperText={
                formik.touched.dhi_user && formik.errors.dhi_user
              }
            />
            <TextField
              fullWidth
              name="password"
              sx={{ my: 2 }}
              label="Password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
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

BridgeUser.getLayout = (page) => (
  //   <AuthGuard>
  <DashboardLayout>{page}</DashboardLayout>
  //   </AuthGuard>
);

export default BridgeUser;
