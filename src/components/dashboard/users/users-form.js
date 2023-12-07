import {useFormik} from "formik";
import {Grid} from "@mui/material";
import DMTTextInput from "../../@dmt-components/form/text-input";
import {getBrowserDetails, getIPAddress} from "../../../utils/helper-functions";
import {utilitiesApis} from "../../../api-requests/utilities-apis";
import {useAuth} from "../../../hooks/use-auth";
import MKBox from "../../@mui-components/box";
import MKButton from "../../@mui-components/button";
import {toast} from "react-toastify";
import DMTGenders from "../../@dmt-components/form/genders";
import DMTSalutations from "../../@dmt-components/form/salutations";
import DMTRoles from "../../@dmt-components/form/roles-select";
import DMTBranches from "../../@dmt-components/form/branch-select";
import DMTDepartments from "../../@dmt-components/form/departments-select";
import {usersApis} from "../../../api-requests/users-apis";
import {LoaderIcon} from "react-hot-toast";

const UsersForm = props => {
    const { user, onClose, onRefresh } = props;
    const authUser = useAuth();
    const formik = useFormik({
        initialValues: {
            firstName: user?.firstName ?? "",
            otherName: user?.otherName ?? "",
            salutation: user?.salutation ?? "",
            gender: user?.gender ?? "",
            phoneNumber: user?.phoneNumber ?? "",
            extension:  user?.extension ?? "",
            email: user?.email ?? "",
            designation: user?.designation ?? "",
            roleId: user?.roleId ?? null,
            branchId: user?.branchId ?? null,
            departmentId: user?.departmentId ?? null
        },
        onSubmit: async (values) => {
            try {
                const formData = {
                    ...values,
                    userName: values.email,
                    id: user?.id ?? "",
                }
                const res = await usersApis.createUser(authUser, formData);
                if (res?.success){
                    toast.success("User created successfully!");
                    onClose?.();
                    await onRefresh?.();
                }
                else{
                    toast.error(res?.errorMessage ?? "An error occurred while processing request!");
                }
                
            }
            catch (e) {
                console.log(e.message)
            }
        }

    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                        <DMTTextInput
                            error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                            fullWidth={true}
                            required={true}
                            helperText={formik.touched.firstName && formik.errors.firstName}
                            label="First Name"
                            name="firstName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.firstName}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                        <DMTTextInput
                            error={Boolean(formik.touched.otherName && formik.errors.otherName)}
                            fullWidth={true}
                            required={true}
                            helperText={formik.touched.otherName && formik.errors.otherName}
                            label="Other Names"
                            name="otherName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.otherName}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTTextInput
                            error={Boolean(
                                formik.touched.phoneNumber && formik.errors.phoneNumber
                            )}
                            fullWidth={true}
                            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                            label="Phone Number"
                            required={true}
                            name="phoneNumber"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.phoneNumber}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTTextInput
                            error={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                            fullWidth={true}
                            type={'email'}
                            helperText={formik.touched.email && formik.errors.email}
                            label="Email Address"
                            required={true}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTGenders
                            label={'Gender'}
                            fullWidth={true}
                            name={'gender'}
                            value={formik.values.gender}
                            onChange={values => formik.setFieldValue('gender', values?.value)}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.gender && formik.touched.gender)}
                            helperText={formik.touched.gender && formik.errors.gender}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTRoles
                            label={'Role'}
                            fullWidth={true}
                            name={'roleId'}
                            value={formik.values.roleId}
                            onChange={values => formik.setFieldValue('roleId', values?.id)}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.roleId && formik.touched.roleId)}
                            helperText={formik.touched.roleId && formik.errors.roleId}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTBranches
                            label={'Branch'}
                            fullWidth={true}
                            name={'branchId'}
                            value={formik.values.branchId}
                            onChange={values => formik.setFieldValue('branchId', values?.id)}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.branchId && formik.touched.branchId)}
                            helperText={formik.touched.branchId && formik.errors.branchId}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTDepartments
                            label={'Department'}
                            fullWidth={true}
                            name={'departmentId'}
                            value={formik.values.departmentId}
                            onChange={values => formik.setFieldValue('departmentId', values?.id)}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.departmentId && formik.touched.departmentId)}
                            helperText={formik.touched.departmentId && formik.errors.departmentId}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTSalutations
                            label={'Salutation'}
                            fullWidth={true}
                            name={'salutation'}
                            value={formik.values.salutation}
                            onChange={values => formik.setFieldValue('salutation', values?.value)}
                            onBlur={formik.handleBlur}
                            error={Boolean(formik.errors.salutation && formik.touched.salutation)}
                            helperText={formik.touched.salutation && formik.errors.salutation}
                        />
                    </Grid>
                    <Grid item md={6} sm={12} xs={12}>
                        <DMTTextInput
                            error={Boolean(
                                formik.touched.designation && formik.errors.designation
                            )}
                            fullWidth={true}
                            helperText={formik.touched.designation && formik.errors.designation}
                            label="Designation"
                            name="designation"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.designation}
                        />
                    </Grid>

                    <Grid item md={6} sm={12} xs={12}>
                        <DMTTextInput
                            error={Boolean(
                                formik.touched.extension && formik.errors.extension
                            )}
                            fullWidth={true}
                            helperText={formik.touched.extension && formik.errors.extension}
                            label="Telephone Ext"
                            name="extension"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.extension}
                        />
                    </Grid>
                </Grid>
                <MKBox sx={{ display: 'flex', gap:1, mt:2, justifyContent: 'flex-end',}}>
                    <MKButton disabled={formik.isSubmitting} onClick={onClose} variant={"contained"} color={"error"}>
                        {"Cancel"}
                    </MKButton>
                    <MKButton
                        disabled={formik.isSubmitting}
                        startIcon={formik.isSubmitting && <LoaderIcon/>}
                        variant={"contained"}
                        color={"success"}
                        type={"submit"}>
                        {"Save"}
                    </MKButton>
                </MKBox>
            </form>
        </>
    )
}

export default UsersForm;