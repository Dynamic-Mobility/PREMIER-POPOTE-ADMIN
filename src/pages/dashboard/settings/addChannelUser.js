import React, { useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import { branches, departments } from "../../../api-requests/dummy-data";
import Autocomplete from "@mui/material/Autocomplete";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import MKButton from "../../../components/@mui-components/button";
import * as yup from "yup";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { toast } from "react-hot-toast";
import { Box } from "@mui/system";

const AddChannelUser = () => {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const validationSchema = yup.object({
    password: yup.string("Enter password").required("Password is required"),
    // id: yup.number("Enter id").required("Id is required"),
    firstName: yup.string("Enter first name").required("Fist name is required"),
    lastName: yup.string("Enter last name").required("Last name is required"),
    phoneNumber: yup
      .number("Enter phone number")
      .required("Phone number is required"),
    userName: yup.string("Enter username").required("Username is required"),
    // name: yup.string("Enter name").required("Name is required"),
    email: yup
      .string("Enter email address")
      .email("Enter a valid email")
      .required("Email is required"),
    // isEnabled: yup.string("true or false").required("An option is required"),
    departmentId: yup
      .string("Enter department name")
      .required("Department name is required"),
    // errorMsg: yup
    //   .string("Enter error Message")
    //   .required("Error message is required"),
    jobTitle: yup.string("Enter job title").required("Job title is required"),
    branchId: yup
      .string("Enter branch name")
      .required("Branch name is required"),
    roleId: yup.string("Enter role name").required("Role is required"),
    // success: yup.string("true or false").required("An option is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      // id: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      userName: "",
      name: "",
      email: "",
      // isEnabled: true,
      departmentId: 0,
      // errorMsg: "",
      jobTitle: "",
      branchId: 0,
      roleId: 0,
      // success: true,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          ...values,
          name: values.firstName + " " + values.lastName,
        };
        await dispatch(createUser(authUser, formData));
        await dispatch(getAllUsers(authUser));
        helpers.resetForm();
        handleClose();
        toast.success("User created successfully");
      } catch (error) {
        toast.error(error.message);
      }
    },
  });

  const handleOnEnabled = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("isEnabled", value.value);
    } else {
      formik.setFieldValue("isEnabled", null);
    }
  };

  const handleOnSuccess = (event, value) => {
    console.log(value);
    if (value !== null) {
      formik.setFieldValue("success", value.value);
    } else {
      formik.setFieldValue("success", null);
    }
  };

  const handleOnDepartmentId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("departmentId", value.id);
    } else {
      formik.setFieldValue("departmentId", null);
    }
  };

  const handleOnBranchId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("branchId", value.id);
    } else {
      formik.setFieldValue("branchId", null);
    }
  };

  const handleOnRoleId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("roleId", value.id);
    } else {
      formik.setFieldValue("roleId", null);
    }
  };

  const isEnabled = [
    { id: 1, name: "True", value: true },
    { id: 2, name: "False", value: false },
  ];

  const success = [
    { id: 1, name: "True", value: true },
    { id: 2, name: "False", value: false },
  ];

  return (
    <div>
      <MKButton
        variant="contained"
        size="small"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Add Channel User
      </MKButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Channel User"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={12} sx={12}>
                <TextField
                  fullWidth
                  maxWidth="sm"
                  label="Name"
                  name="Name"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
            </Grid>

            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="Partner Code"
              name="partnerCode"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)
              }
              helperText={
                formik.touched.phoneNumber && formik.errors.phoneNumber
              }
            />
            <TextField
              style={{ marginTop: "8px", marginBottom: "8px" }}
              fullWidth
              maxWidth="sm"
              label="SourceIp"
              name="sourceIp"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <MKButton sx={{ marginTop: "4px" }} type="submit" color="primary">
              Save
            </MKButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddChannelUser;
