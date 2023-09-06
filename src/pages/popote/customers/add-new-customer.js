import React, { useEffect } from "react";
import { Card, Container, Grid, TextField } from "@mui/material";
import MKButton from "../../../components/@mui-components/button";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { toast } from "react-hot-toast";
import { getAllRoles } from "../../../slices/dashboard/roles";
import { createUser } from "../../../redux/services/users";
import MKTypography from "../../../components/@mui-components/typography";
import MKBox from "../../../components/@mui-components/box";
import Divider from "@mui/material/Divider";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import MKInput from "../../../components/@mui-components/text-field";
import ButtonGroup from "@mui/material/ButtonGroup";
import DMTTextInput from "../../../components/@dmt-components/form/text-input";
import ModernLayout from '../../../components/layouts/modern'
import CustomerDetailsDataGrid from "../../../components/popote/customers/customer-details-datagrid";

const AddCustomer = (props) => {
  const { handleClickOpen, open, setOpen, handleClose } = props;
  // const { departments } = useSelector(({ departments }) => departments);
  const { roles } = useSelector(({ role }) => role);
  console.log("ROLES ", roles);
  // const { branches } = useSelector(({ branches }) => branches);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const fetchData = async () => {
    //   await dispatch(getAllBranches(authUser));
    //   await dispatch(getAllDepartments(authUser));
    await dispatch(getAllRoles(authUser));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = yup.object({
    cif_number: yup
      .string("Enter CIF NUMBER")
      .required("CIF NUMBER is required"),
  });

  const formik = useFormik({
    initialValues: {
      cif_number: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const res = await createUser(authUser, values);
        console.log(res);
        if (res.success) {
          toast.success(res.errordesc);
          await dispatch(getAllUsers(authUser));
          helpers.resetForm();
          handleClose();
        } else if (!res.success) {
          toast.error(res.errordesc);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="xl">
        <MKTypography
          sx={{ my: 2 }}
          fontWeight="bold"
          fontSize={"20px"}
          color="primary"
        >
          Customer Details
        </MKTypography>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={2}>
            <Grid item md={9} xs={12}>
              <form>
                <DMTTextInput
                  sx={{ my: 2 }}
                  fullWidth
                  maxWidth="sm"
                  size="small"
                  label="CIF NUMBER"
                  name="cif_number"
                  value={formik.values.cif_number}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.cif_number &&
                    Boolean(formik.errors.cif_number)
                  }
                  helperText={formik.touched.cif && formik.errors.cif_number}
                />
              </form>
              <Divider />
              <MKBox sx={{ my: 2 }}>
                <MKTypography fontWeight="bold">Personal Details</MKTypography>
                <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="firstName"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="middleName"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="lastName"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="ID Number"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="KRA Pin"
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="Email Address"
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="Phone Number"
                    />
                  </Grid>
                </Grid>
              </MKBox>
              <Divider />
              <MKBox sx={{ my: 2 }}>
                <CustomerDetailsDataGrid />
                {/* <Grid container spacing={2}>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="Account Number"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="Transaction Limit"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      maxWidth="sm"
                      size="small"
                      label="Currency Code"
                    />
                  </Grid>
                </Grid> */}
              </MKBox>
            </Grid>
            <Grid item md={3} xs={12}>
              <MKTypography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
              </MKTypography>
              <MKBox sx={{ display: "grid" }}>
                <MKButton sx={{ my: 1 }} variant="outlined" color="primary">
                  Add
                </MKButton>
                <MKButton sx={{ my: 1 }} variant="contained" color="primary">
                  Update
                </MKButton>
                <MKButton sx={{ my: 1 }} variant="contained" color="success">
                  Save Changes
                </MKButton>
              </MKBox>

              <ButtonGroup
                sx={{ my: 1 }}
                fullWidth
                orientation="vertical"
                variant="contained"
                aria-label="vertical outlined button group"
              >
                <MKButton variant="outlined" color="primary">
                  Disable
                </MKButton>
                <MKButton variant="outlined" color="primary">
                  Update Limits
                </MKButton>
                <MKButton variant="outlined" color="primary">
                  Recreate Key
                </MKButton>
                <MKButton variant="outlined" color="primary">
                  Reset Pin
                </MKButton>
                <MKButton variant="outlined" color="primary">
                  Maintain Card
                </MKButton>
                <MKButton variant="outlined" color="primary">
                  Manage Device
                </MKButton>
                <MKButton variant="outlined" color="primary">
                  Cancel
                </MKButton>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

AddCustomer.getLayout = (page) => <ModernLayout>{page}</ModernLayout>;

export default AddCustomer;
