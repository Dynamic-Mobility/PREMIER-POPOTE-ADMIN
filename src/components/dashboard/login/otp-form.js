import {useEffect, useState} from "react";
import {useTheme} from "@mui/styles";
import {useFormik} from "formik";
import * as Yup from 'yup';
import {toast} from "react-hot-toast";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import MKButton from "../../@mui-components/button";
import OTPInput from "react-otp-input";
import { alpha } from '@mui/material'

const OTP_LENGTH = 5;

const OtpForm = (props) => {
    const { onSuccess, message = "", onResendOTP} = props;
    const [responseMessage,setResponseMessage] = useState('')
    const [responseColor, setResponseColor] = useState(""); // State variable to store the response color
    const theme = useTheme();


    useEffect(() => {
        // Clear the message after 3 seconds
        const timer = setTimeout(() => {
            setResponseMessage("");
            setResponseColor("");
        }, 4000);

        return () => clearTimeout(timer); // Clean up the timer when the component unmounts or responseMessage changes.

    }, [responseMessage]);


    const formik = useFormik({
        initialValues: {
            otp: "",
        },
        validationSchema: Yup.object({
            otp: Yup.string().required("Please provide OTP"),
        }),
        onSubmit: async (values, helpers) => {
            try {
                const formData = {
                    otp: values.otp,
                };
                await onSuccess(formData);
            } catch (e) {
                toast.error(e);
            }
        },
    });

    const handleResendOTP = async () => {
        await onResendOTP();
    };

    const handleOnChange = (value) => {
        formik.setFieldValue("otp", value);
    };
    return (
        <>
            <MKBox
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <MKTypography variant={"caption"} sx={{ color: responseColor}}>
                    {responseMessage}
                </MKTypography>
                <MKTypography variant={"caption"} sx={{ my: 1 }}>
                    {message}
                </MKTypography>
                <form onSubmit={formik.handleSubmit}>
                    <MKBox
                        sx={{
                            display: "flex",
                            my: 3,
                            flexDirection: "column",
                            gap: 2,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <OTPInput
                            onChange={handleOnChange}
                            value={formik.values.otp}
                            hasErrored={Boolean(formik.errors.otp)}
                            errorStyle={{
                                outline: "1px solid red",
                                background: alpha(theme.palette.error.main, 0.1),
                            }}
                            placeholder={"-----"}
                            focusStyle={{
                                outline: `1px solid ${theme.palette.primary.main}`,
                            }}
                            inputStyle={{
                                width: "45px",
                                height: "45px",
                                borderRadius: "7px",
                                alignItems: "center",
                                border: "0px",
                                marginLeft: "3px",
                                marginRight: "3px",
                                background: alpha(theme.palette.primary.main, 0.2),
                                fontSize: "20px",
                            }}
                            renderInput={(props) => <input {...props} />}
                            numInputs={OTP_LENGTH}
                            isInputNum={true}
                            separator={<span> </span>}
                        />
                        <MKTypography variant={"caption"} color={"error"}>
                            {formik.errors.otp}
                        </MKTypography>
                    </MKBox>
                    <MKBox sx={{ display: "flex", mt: 2, justifyContent: "center" }}>
                        <MKButton
                            disabled={formik.isSubmitting}
                            onClick={handleResendOTP}
                            variant={'text'}
                            color={'primary'}
                        >
                            Resend OTP
                        </MKButton>
                        <MKButton
                            color={"primary"}
                            type={"submit"}
                            disabled={
                                formik.isSubmitting || formik.values.otp.length !== OTP_LENGTH
                            }
                            variant={"contained"}
                        >
                            Validate OTP
                        </MKButton>
                    </MKBox>
                </form>
            </MKBox>
        </>
    );
};

export default OtpForm;