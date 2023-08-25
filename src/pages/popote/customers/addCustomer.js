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
import { getAllRoles } from "../../../slices/dashboard/roles";
import { createUser } from "../../../redux/services/users";
import MKTypography from "../../../components/@mui-components/typography";
import Slide from '@mui/material/Slide';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


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
    password: yup.string("Enter password").required("Password is required"),
    firstName: yup.string("Enter first name").required("Fist name is required"),
    lastName: yup.string("Enter last name").required("Last name is required"),
    userName: yup
      .string("Enter last username")
      .required("Username is required"),
    phoneNumber: yup
      .number("Enter phone number")
      .required("Phone number is required"),
    jobTitle: yup.string("Enter job title").required("Job title is required"),
    email: yup
      .string("Enter email address")
      .email("Enter a valid email")
      .required("Email is required"),
    roleId: yup.string("Enter role name").required("Role is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      firstName: "",
      lastName: "",
      userName: "",
      phoneNumber: "",
      email: "",
      jobTitle: "",
      roleId: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const formData = {
          ...values,
          name: values.firstName + " " + values.lastName,
        };
        const res = await createUser(authUser, formData);
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

  const handleOnRoleId = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("roleId", value.id);
    } else {
      formik.setFieldValue("roleId", null);
    }
  };

  return (
    <div>
      <MKButton
        variant="contained"
        size="small"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}
      >
        Create Customer
      </MKButton>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="xl"
        fullWidth
      >
        <DialogContent>
          <MKTypography fontWeight={"bold"} color="primary">
            Create Customer
          </MKTypography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item md={6} sx={12}>
                <TextField
                  fullWidth
                  maxWidth="sm"
                  size="small"
                  label="firstName"
                  name="firstName"
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
              <Grid item md={6} sx={12}>
                <TextField
                  fullWidth
                  maxWidth="sm"
                  size="small"
                  label="lastName"
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
            </Grid>
            <TextField
              sx={{ my: 1 }}
              fullWidth
              maxWidth="sm"
              label="userName"
              size="small"
              name="userName"
              value={formik.values.userName}
              onChange={formik.handleChange}
              error={formik.touched.userName && Boolean(formik.errors.userName)}
              helperText={formik.touched.userName && formik.errors.userName}
            />
            <TextField
              sx={{ my: 1 }}
              fullWidth
              maxWidth="sm"
              size="small"
              label="Phone Number"
              name="phoneNumber"
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
              sx={{ my: 1 }}
              fullWidth
              maxWidth="sm"
              size="small"
              label="Password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
            <TextField
              sx={{ my: 1 }}
              fullWidth
              maxWidth="sm"
              size="small"
              label="Job Title"
              name="jobTitle"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
              helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            />
            <TextField
              sx={{ my: 1 }}
              fullWidth
              maxWidth="sm"
              size="small"
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />

            <Autocomplete
              fullWidth
              options={roles}
              value={getAutoCompleteValue(roles, formik.values.roleId)}
              getOptionLabel={(option) => option.name}
              onChange={handleOnRoleId}
              renderInput={(params) => (
                <TextField
                  size="small"
                  fullWidth
                  sx={{ my: 1 }}
                  {...params}
                  label="Role"
                />
              )}
            />
            <MKButton
              sx={{ marginTop: "4px" }}
              size="small"
              type="submit"
              color="primary"
            >
              Save
            </MKButton>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCustomer;
