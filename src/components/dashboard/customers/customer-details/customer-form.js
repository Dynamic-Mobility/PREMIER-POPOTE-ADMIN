import DMTTextInput from "../../../@dmt-components/form/text-input";
import {useFormik} from "formik";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import {Grid} from "@mui/material";
import React from "react";
const CustomerForm = props => {
    const { customer } = props;
    
    const formik = useFormik({
        initialValues: {
            cif_number: customer?.cif_no ?? "",
            firstName: customer?.firstName ?? "",
            middlename: customer?.middleName ?? "",
            lastName: customer?.lastName ?? "",
            email: customer?.email ?? "",
            mobile: customer?.mobile ?? "",
            idNumber: customer?.idno ?? "",
            kraPin: customer?.krapin ?? "",
        }
    })
    
    return (
        <>
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
            <MKBox sx={{ my: 2 }}>
                <MKTypography fontWeight="bold">Personal Details</MKTypography>
                <Grid container spacing={2}>
                    <Grid item md={4} xs={12}>
                        <DMTTextInput
                            sx={{ my: 2 }}
                            disabled={true}
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
        </>
    )
}

export default CustomerForm;