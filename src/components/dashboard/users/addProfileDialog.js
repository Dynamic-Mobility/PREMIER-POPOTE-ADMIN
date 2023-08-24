import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField, Grid } from "@mui/material";
import { createProfile } from "../../../redux/services/users";
import * as yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/use-auth";
import { getAllProfiles } from "../../../slices/dashboard/users";
import 'react-toastify/dist/ReactToastify.css';



const AddProfileDialog = (props) => {
  const { handleClickOpen, handleClose, open } = props;
  const authUser = useAuth();

  const validationSchema = yup.object({
    profile_name: yup
      .string("Enter profile name")
      .required("Profile Name is required"),
    remarks: yup.string("Enter remarks").required("A remark is required"),
  });

  const formik = useFormik({
    initialValues: {
      profile_name: "",
      remarks: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
         await createProfile(authUser, values);
          toast.success('Profile Added Successfully');
          helpers.resetForm();
          handleClose();
          await dispatch(getAllProfiles(authUser));
      } catch (error) {
        toast.error(error);
      }
    },
  });

  return (
    <div>
      <Button size="small" variant="contained" onClick={handleClickOpen}>
        Add Profile
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Add Profile"}</DialogTitle>
        <DialogContent>
          <form onSubmit={formik.handleSubmit}>
            <Grid>
              <TextField
                label="Profile Name"
                size="small"
                name="profile_name"
                fullWidth
                sx={{ my: 2 }}
                value={formik.values.profile_name}
                onChange={formik.handleChange}
                error={formik.touched.profile_name && Boolean(formik.errors.profile_name)}
                helperText={formik.touched.profile_name && formik.errors.profile_name}
              />
              <TextField
                label="Remarks"
                fullWidth
                multiline
                name="remarks"
                rows={4}
                value={formik.values.remarks}
                onChange={formik.handleChange}
                error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                helperText={formik.touched.remarks && formik.errors.remarks}
              />
              <Button
                type="submit"
                sx={{ mt: 1 }}
                variant="contained"
                fullWidth
                disabled={formik.isSubmitting}
              >
                Add Profile
              </Button>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProfileDialog;
