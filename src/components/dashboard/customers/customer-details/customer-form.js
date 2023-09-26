import DMTTextInput from "../../../@dmt-components/form/text-input";
import {useFormik} from "formik";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import {Grid} from "@mui/material";
import React, {useEffect} from "react";
const CustomerForm = props => {
    const { customer } = props;
    
    const formik = useFormik({
        initialValues: {
            firstName: "",
            middlename:  "",
            lastName: "",
            cif_no: "",
            email: "",
            mobile:  "",
            idNumber: "",
            kraPin:  "",
        }
    });

    console.log(customer);

    useEffect(() => {
        formik.setValues({
            cif_no: customer?.cif_no ?? "",
            firstName:  customer?.firstName ?? "",
            middlename:  customer?.middlename ?? "",
            lastName:  customer?.lastName ?? "",
            email:  customer?.email ?? "",
            mobile:  customer?.mobile ?? "",
            idNumber:  customer?.idno ?? "",
            kraPin:  customer?.krapin ?? "",
        })
    }, [customer])
    
    return (
        <>
            <MKBox sx={{ my: 2 }}>
                <MKTypography fontWeight="bold" gutterBottom>Personal Details</MKTypography>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <DMTTextInput
                            //disabled={true}
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
                    <Grid item md={4} xs={12}>
                        <DMTTextInput
                            fullWidth
                            label="CIF Number"
                            name={"cif_no"}
                            error={Boolean(
                                formik.touched.cif_no && formik.errors.cif_no
                            )}
                            helperText={
                                formik.touched.cif_no && formik.errors.cif_no
                            }
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.cif_no}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <DMTTextInput
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
                    <Grid item md={4} xs={12}>
                        <DMTTextInput
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
                    <Grid item md={6} xs={12}>
                        <DMTTextInput
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
        </>
    )
}

export default CustomerForm;