import {useFormik} from "formik";
import {Grid} from "@mui/material";
import DMTTextInput from "../../@dmt-components/form/text-input";
import {getBrowserDetails, getIPAddress} from "../../../utils/helper-functions";
import {utilitiesApis} from "../../../api-requests/utilities-apis";
import {useAuth} from "../../../hooks/use-auth";
import MKBox from "../../@mui-components/box";
import MKButton from "../../@mui-components/button";
import {toast} from "react-toastify";

const UsersForm = props => {
    const { branch, onClose, onRefresh } = props;
    const authUser = useAuth();
    const formik = useFormik({
        initialValues: {
            branchName: branch?.branchName ?? "",
            branchCode: branch?.branchCode ?? "",
            branchAddress: branch?.branchAddress ?? "",
            branchContacts: branch?.branchContacts ?? "",
        },
        onSubmit: async (values) => {
            const browser = getBrowserDetails();
            const ipAddress = await getIPAddress();
            try {
                const formData = {
                    ...values,
                    id: branch?.id ?? 0,
                    userId: "",
                    actionType: 0,
                    active: "True",
                    branchImageURL: "",
                    cordinates: "",
                    approved: true,
                    browser: browser,
                    ip: ipAddress
                }
                
                const res = await utilitiesApis.createBranch(authUser, formData);
                if (res?.success){
                    toast.success("Branch created successfully!");
                    onClose?.();
                    await onRefresh?.();
                }
                else{
                    toast.error("An error occurred while processing request!")
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
                    <Grid item xs={12} sm={12} md={12}>
                        <DMTTextInput
                            error={Boolean(formik.touched.branchName && formik.errors.branchName)}
                            fullWidth
                            required={true}
                            helperText={formik.touched.branchName && formik.errors.branchName}
                            label="Branch Name"
                            name="branchName"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.branchName}
                            InputProps={{
                                form: {
                                    autocomplete: "off",
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <DMTTextInput
                            error={Boolean(formik.touched.branchCode && formik.errors.branchCode)}
                            fullWidth
                            required={true}
                            helperText={formik.touched.branchCode && formik.errors.branchCode}
                            label="Branch Code"
                            name="branchCode"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.branchCode}
                            InputProps={{
                                form: {
                                    autocomplete: "off",
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <DMTTextInput
                            error={Boolean(formik.touched.branchAddress && formik.errors.branchAddress)}
                            fullWidth
                            multiline={true}
                            minRows={3}
                            placeholder={"Type the branch address..."}
                            helperText={formik.touched.branchAddress && formik.errors.branchAddress}
                            label="Branch Address"
                            name="branchAddress"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.branchAddress}
                            InputProps={{
                                form: {
                                    autocomplete: "off",
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <DMTTextInput
                            error={Boolean(formik.touched.branchContacts && formik.errors.branchContacts)}
                            fullWidth
                            helperText={formik.touched.branchContacts && formik.errors.branchContacts}
                            label="Branch Contact"
                            name="branchContacts"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.branchContacts}
                            InputProps={{
                                form: {
                                    autocomplete: "off",
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <MKBox sx={{ display: 'flex', gap:1, mt:2, justifyContent: 'flex-end',}}>
                    <MKButton onClick={onClose} variant={"contained"} color={"error"}>
                        {"Cancel"}
                    </MKButton>
                    <MKButton
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