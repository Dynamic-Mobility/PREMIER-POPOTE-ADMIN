import React, { useEffect, useState } from "react";
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
import ModernLayout from "../../../components/layouts/modern";
import CustomerDetailsDataGrid from "../../../components/popote/customers/customer-details-datagrid";
import { getAllUsers } from "../../../slices/dashboard/users";
import { getAutoCompleteValue } from "../../../utils/helper-functions";
import customers from "./index";
import { toast } from "react-toastify";
import { customersApis } from "../../../api-requests/customers-api";

const customersList = [
  {
    id: 1,
    cif_number: "4253627183",
    firstName: "Marcos",
    middleName: "",
    lastName: "Ochieng",
    email: "marcos@gmail.com",
    phoneNumber: "0701824145",
    idNumber: "35834295",
    kraPin: "A123523819I",
    isNew: false,
    accounts: [
      {
        account_number: "0110282332394",
        currency_code: "404",
        phoneNumber: "073242432",
        email: "marcos@gmail.com",
        transactionLimit: 4000000,
        status: "Active",
      },
      {
        account_number: "0110292392391",
        currency_code: "404",
        phoneNumber: "073242432",
        email: "marcos@gmail.com",
        transactionLimit: 4000000,
        status: "Active",
      },
    ],
  },
  {
    id: 1,
    cif_number: "12345678",
    firstName: "Denzel",
    middleName: "Kamau",
    lastName: "Gatungu",
    email: "denzelkamau@gmail.com",
    phoneNumber: "0701824145",
    idNumber: "231234595",
    kraPin: "A1235903928I",
    accounts: [
      {
        account_number: "0110292392391",
        currency_code: "404",
        phoneNumber: "073242432",
        email: "marcos@gmail.com",
        transactionLimit: 5000000,
        status: "Active",
      },
    ],
    isNew: true,
  },
];

const AddCustomer = (props) => {
  const { handleClickOpen, open, setOpen, handleClose } = props;
  const [cifResponse, setCifResponse] = useState(null);
  const [switchResponse, setSwitchResponse] = useState([]);
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
      cif_number: cifResponse?.cif_no ?? "",
      firstName: cifResponse?.firstName ?? "",
      middlename: cifResponse?.middleName ?? "",
      lastName: cifResponse?.lastName ?? "",
      email: cifResponse?.email ?? "",
      mobile: cifResponse?.mobile ?? "",
      idNumber: cifResponse?.idno ?? "",
      kraPin: cifResponse?.krapin ?? "",
      accounts: [],
    },
    enableReinitialization: true
    ,
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

  const handleOnBlur = async (e) => {
    if (e.target.value) {
      try {
        const cifNumber = e.target.value;
        const res = await customersApis.fetchCustomerCif(authUser, cifNumber);
        formik.setValues(
          {
            cif_number: cifResponse?.cif_no ?? "",
            firstName: cifResponse?.firstName ?? "",
            middlename: cifResponse?.middlename ?? "",
            lastName: cifResponse?.lastName ?? "",
            email: cifResponse?.email ?? "",
            mobile: cifResponse?.mobile ?? "",
            idNumber: cifResponse?.idno ?? "",
            kraPin: cifResponse?.krapin ?? "",
            accounts: [],
          }
        )
        setCifResponse(res);
        if (cifNumber) {
          toast.success("Customer Found!");
        } else {
          toast.error("No customer found");
          formik.setValues({
            ...formik.initialValues,
            cif_number: e.target.value,
          });
        }
        if(res.cif_no !== ''){
          const switchRes = await customersApis.getAccountSwitchByCif(authUser,res?.cif_no)
          setSwitchResponse(switchRes?.data)
          console.log("SWITCH_RESPONSE ",switchRes)
        }
      } catch (err) {
      }
    }
  };

  const addUpdateCustomers = async () => {
    const formattedData = {
      firstName: cifResponse.firstName,
      lastName: cifResponse.lastName,
      cif: cifResponse.cif_no,
      dob: cifResponse.dateofBirth,
      alias: cifResponse.name,
      address: cifResponse.postalAddress,
      phone: cifResponse.tel,
      kraPin: cifResponse.krapin,
      email: cifResponse.email,
      customerTypeId: null,
      secondaryPhone: cifResponse.mobile,
      pobox: cifResponse.postalAddress,
      industry: cifResponse.industry,
      industryCategory: cifResponse.category,
      location: cifResponse.physicalAddress,
      town: cifResponse.physicalAddress,
      geoLocation: null,
      name: cifResponse.name,
      secondaryEmail: cifResponse.email,
      actionDesc: cifResponse.accountDescription,
      idnumber: cifResponse.idno,
      ip: null,
    };
    try {
      const res = await customersApis.addUpdateCustomers(
        authUser,
        formattedData
      );
      if(res.success){
        toast.success('Customer details added successfully')
      }
    } catch (err) {
      console.log("ADD_UPDATE_ERROR ",err)
    }
  };
  const updateCustomers = async () => {
    const formattedData = {
      firstName: cifResponse.firstName,
      lastName: cifResponse.lastName,
      cif: cifResponse.cif_no,
      dob: cifResponse.dateofBirth,
      alias: cifResponse.name,
      address: cifResponse.postalAddress,
      phone: cifResponse.tel,
      kraPin: cifResponse.krapin,
      email: cifResponse.email,
      customerTypeId: null,
      secondaryPhone: cifResponse.mobile,
      pobox: cifResponse.postalAddress,
      industry: cifResponse.industry,
      industryCategory: cifResponse.category,
      location: cifResponse.physicalAddress,
      town: cifResponse.physicalAddress,
      geoLocation: null,
      name: cifResponse.name,
      secondaryEmail: cifResponse.email,
      actionDesc: cifResponse.accountDescription,
      idnumber: cifResponse.idno,
      ip: null,
    };
    try {
      const res = await customersApis.addUpdateCustomers(
        authUser,
        formattedData
      );
      if(res.success){
        toast.success('Customer details updated successfully')
      }
    } catch (err) {
      console.log("ADD_UPDATE_ERROR ",err)
    }
  };

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
                  helperText={
                    formik.touched.cif_number && formik.errors.cif_number
                  }
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
                      name={"firstName"}
                      error={Boolean(
                        formik.touched.firstName && formik.errors.firstName
                      )}
                      helperText={
                        formik.touched.firstName && formik.errors.firstName
                      }
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
                      error={Boolean(formik.touched.middlename && formik.errors.middlename)}
                      helperText={formik.touched.middlename && formik.errors.middlename}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.middlename}
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
                      name={"idNumber"}
                      error={Boolean(
                        formik.touched.idNumber && formik.errors.idNumber
                      )}
                      helperText={
                        formik.touched.idNumber && formik.errors.idNumber
                      }
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
                      name={"kraPin"}
                      error={Boolean(
                        formik.touched.kraPin && formik.errors.kraPin
                      )}
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
                      name={"email"}
                      error={Boolean(
                        formik.touched.email && formik.errors.email
                      )}
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
                      name={"phoneNumber"}
                      error={Boolean(
                        formik.touched.mobile && formik.errors.mobile
                      )}
                      helperText={
                        formik.touched.mobile && formik.errors.mobile
                      }
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      value={formik.values.mobile}
                      label="Phone Number"
                    />
                  </Grid>
                </Grid>
              </MKBox>
              <Divider />
              <MKBox sx={{ my: 2 }}>
                <CustomerDetailsDataGrid data={switchResponse} />
              </MKBox>
            </Grid>
            <Grid item md={3} xs={12}>
              <MKTypography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
              </MKTypography>
              <MKBox sx={{ display: "grid" }}>
                <MKButton
                  onClick={addUpdateCustomers}
                  disabled={Boolean(cifResponse?.custExist)}
                  sx={{ my: 1 }}
                  variant="outlined"
                  color="primary"
                >
                  Add
                </MKButton>
                <MKButton
                  onClick={updateCustomers}
                  disabled={Boolean(!cifResponse?.custExist)}
                  sx={{ my: 1 }}
                  variant="contained"
                  color="primary"
                >
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
