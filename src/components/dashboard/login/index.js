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
import OtpForm from "./otp-form";



export const LoginForm = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [userDetail, setUserDetail] = useState(null);
  const isMounted = useMounted();

  const { login } = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const [showPassword, toggleShowPassword] = useState(false);

  const handleShowPassword = () => {
    toggleShowPassword(!showPassword);
  };

  const handleOnOTPValidate = async (values) => {
        try {
          const res = await validateOtp(values, userDetail);
          if (res.success) {
            await login(userDetail);
            const returnUrl = router.query.returnUrl || "/dashboard";
            router.push(returnUrl).catch(console.error);
          } else {
            toast.error(res.errordesc);
          }
        } catch (error) {
          toast.error(error);
        }
  }

  const handleOnResendOTP = () => {
    //TODO: Implement Resend OTP functionality
  }

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
        setMessage("OTP sent to your phone number")
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
            <MKBox sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2, }}>
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
            </MKBox>
          </form>
        </>
      )}
      {activeStep === 1 && <OtpForm message={message} onSuccess={handleOnOTPValidate} onResendOTP={handleOnResendOTP} />}
    </>
  );
};

