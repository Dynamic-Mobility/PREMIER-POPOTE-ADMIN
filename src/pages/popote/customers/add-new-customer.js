import React, { useEffect } from "react";
import { Card, Container, Grid, TextField } from "@mui/material";
import MKButton from "../../../components/@mui-components/button";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { getAllRoles } from "../../../slices/dashboard/roles";
import { createUser } from "../../../redux/services/users";
import MKTypography from "../../../components/@mui-components/typography";
import MKBox from "../../../components/@mui-components/box";
import Divider from "@mui/material/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import DMTTextInput from "../../../components/@dmt-components/form/text-input";
import ModernLayout from '../../../components/layouts/modern'
import CustomerDetailsDataGrid from "../../../components/popote/customers/customer-details-datagrid";
import {getAllUsers} from "../../../slices/dashboard/users";
import {getAutoCompleteValue} from "../../../utils/helper-functions";
import customers from "./index";
import {toast} from "react-toastify";


const customersList = [
  {
    id: 1,
    cif_number: '4253627183',
    firstName: 'Marcos',
    middleName: '',
    lastName: 'Ochieng',
    email: 'marcos@gmail.com',
    phoneNumber: '0701824145',
    idNumber: '35834295',
    kraPin: 'A123523819I',
    isNew: false,
    accounts: [
      {
        account_number: "0110282332394",
        currency_code: "404",
        phoneNumber: "073242432",
        email: "marcos@gmail.com",
        transactionLimit: 4000000,
        status: 'Active',
      },
      {
        account_number: "0110292392391",
        currency_code: "404",
        phoneNumber: "073242432",
        email: "marcos@gmail.com",
        transactionLimit: 4000000,
        status: 'Active',
      },
    ]
  },
  {
    id: 1,
    cif_number: '12345678',
    firstName: 'Denzel',
    middleName: 'Kamau',
    lastName: 'Gatungu',
    email: 'marcos@gmail.com',
    phoneNumber: '0701824145',
    idNumber: '35834295',
    kraPin: 'A123523819I',
    accounts: [
      {
        account_number: "0110292392391",
        currency_code: "404",
        phoneNumber: "073242432",
        email: "marcos@gmail.com",
        transactionLimit: 4000000,
        status: 'Active',
      },
    ],
    isNew:true,
  },

]

const AddCustomer = (props) => {
  const { handleClickOpen, open, setOpen, handleClose } = props;
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
      firstName: '',
      middleName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      idNumber: '',
      kraPin: '',
      accounts: [],
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

  const handleOnBlur = (e) => {
    if(e.target.value){
      const customer = getAutoCompleteValue(customersList, e.target.value, 'cif_number');
      if (customer){
        toast.success('Customer Found!')
        formik.setValues(customer);
      }
      else{
        toast.error('No customer found')
        formik.setValues({...formik.initialValues, cif_number: e.target.value});
      }
    }

  }

  return (
    <>
      <Container sx={{ py: 2 }} maxWidth="xl">
        <MKTypography
          sx={{ mb: 2 }}
          fontWeight="bold"
          fontSize={"20px"}
          color="primary"
        >
          Customer Details
        </MKTypography>
        <Card sx={{ p: 2 }}>
          <Grid container spacing={3}>
            <Grid item md={9} xs={12}>
              <form onSubmit={formik.handleSubmit}>
                <DMTTextInput
                  sx={{ my: 2 }}
                  fullWidth
                  maxWidth="sm"
                  size="small"
                  label="CIF NUMBER"
                  name="cif_number"
                  value={formik.values.cif_number}
                  onChange={formik.handleChange}
                  onBlur={handleOnBlur}
                  error={
                    formik.touched.cif_number &&
                    Boolean(formik.errors.cif_number)
                  }
                  helperText={formik.touched.cif_number && formik.errors.cif_number}
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
                      label="First Name"
                      name={'firstName'}
                      error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                      helperText={formik.touched.firstName && formik.errors.firstName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      label="Middle Name"
                      name={'middleName'}
                      error={Boolean(formik.touched.middleName && formik.errors.middleName)}
                      helperText={formik.touched.middleName && formik.errors.middleName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.middleName}
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      label="Last Name"
                      name={'lastName'}
                      error={Boolean(formik.touched.lastName && formik.errors.lastName)}
                      helperText={formik.touched.lastName && formik.errors.lastName}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.lastName}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      label="ID Number"
                      name={'idNumber'}
                      error={Boolean(formik.touched.idNumber && formik.errors.idNumber)}
                      helperText={formik.touched.idNumber && formik.errors.idNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.idNumber}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      label="KRA Pin"
                      name={'kraPin'}
                      error={Boolean(formik.touched.kraPin && formik.errors.kraPin)}
                      helperText={formik.touched.kraPin && formik.errors.kraPin}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.kraPin}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      label="Email Address"
                      name={'email'}
                      error={Boolean(formik.touched.email && formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.email}
                    />
                  </Grid>
                  <Grid item md={6} xs={12}>
                    <DMTTextInput
                      sx={{ my: 2 }}
                      fullWidth
                      name={'phoneNumber'}
                      error={Boolean(formik.touched.phoneNumber && formik.errors.phoneNumber)}
                      helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      label="Phone Number"
                    />
                  </Grid>
                </Grid>
              </MKBox>
              <Divider />
              <MKBox sx={{ my: 2 }}>
                <CustomerDetailsDataGrid data={formik.values.accounts} />
              </MKBox>
            </Grid>
            <Grid item md={3} xs={12}>
              <MKTypography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
              </MKTypography>
              <MKBox sx={{ display: "grid" }}>
                <MKButton disabled={Boolean(!formik.values.isNew)} sx={{ my: 1 }} variant="outlined" color="primary">
                  Add
                </MKButton>
                <MKButton disabled={Boolean(formik.values.isNew)} sx={{ my: 1 }} variant="contained" color="primary">
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
                {/*<MKButton variant="outlined" color="primary">*/}
                {/*  Maintain Card*/}
                {/*</MKButton>*/}
                <MKButton disabled variant="outlined" color="primary">
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
