import { useMounted } from "../../../hooks/use-mounted";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import { useState } from "react";
import { authApi } from "../../../api-requests/auth-apis";
import {
  Alert,
  Box,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import DMTTextInput from "../../@dmt-components/form/text-input";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import * as Yup from "yup";
import MKButton from "../../@mui-components/button";
import MKTypography from "../../@mui-components/typography";
import { useAuth } from "../../../hooks/use-auth";
import MKBox from "../../@mui-components/box";
import { validateOtp } from "../../../redux/services/otp";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";



export const LoginForm = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetail, setUserDetail] = useState(null);
  const isMounted = useMounted();
  const formik = useFormik({
    initialValues: {
      Username: "",
      Password: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string().required("Username is required"),
      Password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, helpers) => {
      try {
        const userDetails = await authApi.Login(values);
        setUserDetail(userDetails);
        if (isMounted()) {
          // const returnUrl = router.query.returnUrl || "/dashboard";
          setActiveStep(1);
          // router.push(returnUrl).catch(console.error);
        }
      } catch (err) {
        if (isMounted()) {
          console.log(err.message);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: err.message });
          helpers.setSubmitting(false);
        }
      }
    },
  });

  const [showPassword, toggleShowPassword] = useState(false);

  const handleShowPassword = () => {
    toggleShowPassword(!showPassword);
  };

  return (
    <>
      {activeStep === 0 && (
        <>
          <MKTypography sx={{ mt: 2 }} align={'center'} variant="body2">
            {"Please login to continue..."}
          </MKTypography>
          <form noValidate onSubmit={formik.handleSubmit} {...props}>
            <Box sx={{ mt: 2, mb: 2 }}>
              {formik.errors.submit && (
                <Alert severity="error">
                  <div>{formik.errors.submit}</div>
                </Alert>
              )}
            </Box>
            <DMTTextInput
              error={Boolean(formik.touched.Username && formik.errors.Username)}
              fullWidth
              helperText={formik.touched.Username && formik.errors.Username}
              label="Username"
              margin="normal"
              name="Username"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.Username}
              InputProps={{
                form: {
                  autocomplete: "off",
                },
              }}
            />
            <DMTTextInput
              error={Boolean(formik.touched.Password && formik.errors.Password)}
              fullWidth
              helperText={formik.touched.Password && formik.errors.Password}
              label="Password"
              margin="normal"
              name="Password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={showPassword ? "text" : "Password"}
              value={formik.values.Password}
              InputProps={{
                form: {
                  autocomplete: "Password",
                },
                endAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={handleShowPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ mt: 2 }}>
              <MKButton
                mb={4}
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                color={"primary"}
                type="submit"
                variant="contained"
              >
                Log In
              </MKButton>
            </Box>
          </form>
        </>
      )}
      {activeStep === 1 && <Otp {...{ userDetail }} />}
    </>
  );
};

const Otp = ({ userDetail }) => {
  const { login } = useAuth();
  const router = useRouter();


  const decodedToken = jwtDecode(userDetail?.token)


  const validationSchema = Yup.object({
    Otp: Yup.number("Enter Otp").required("Otp is required"),
  });

  const formik = useFormik({
    initialValues: {
      Otp: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      console.log("OTP VALUE ", values);
      try {
        const res = await validateOtp(values, userDetail);
        if (res.success) {
          await login(userDetail);
          const returnUrl = router.query.returnUrl || "/popote";
          router.push(returnUrl).catch(console.error);
          //toast.success(res.errordesc);
          helpers.resetForm();
        } else {
          toast.error(res.errordesc);
        }
      } catch (error) {
        toast.error(error);
      }
    },
  });
  return (
    <MKBox sx={{ p: 2 }}>
      <MKTypography
        fontSize="18px"
        sx={{ color: "#054F97", textAlign: "center" }}
      >
        One Time Password
      </MKTypography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          sx={{ my: 2 }}
          fullWidth
          name="Otp"
          label="One Time Password"
          value={formik.values.Otp}
          onChange={formik.handleChange}
          error={formik.touched.Otp && Boolean(formik.errors.Otp)}
          helperText={formik.touched.Otp && formik.errors.Otp}
        />
        <MKTypography fontSize="14px" sx={{ my: 2, textAlign: "center" }}>
          The OTP has been sent {decodedToken?.phonenumber}
        </MKTypography>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
            my: 2,
          }}
        >
          <MKButton size="small" color="primary" variant="outlined">
            Resend OTP
          </MKButton>
          <MKButton
            disabled={formik.isSubmitting}
            type="submit"
            size="small"
            variant="contained"
            color="primary"
          >
            Continue
          </MKButton>
        </Box>
      </form>
    </MKBox>
  );
};
