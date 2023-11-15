import {useFormik} from "formik";
import {Grid} from "@mui/material";
import DMTTextInput from "../../@dmt-components/form/text-input";
import {getBrowserDetails, getIPAddress} from "../../../utils/helper-functions";
import {utilitiesApis} from "../../../api-requests/utilities-apis";
import {useAuth} from "../../../hooks/use-auth";
import MKBox from "../../@mui-components/box";
import MKButton from "../../@mui-components/button";
import {toast} from "react-toastify";

const DepartmentForm = props => {
    const { department, onClose, onRefresh } = props;
    const authUser = useAuth();
    const formik = useFormik({
        initialValues: {
            name: department?.name ?? "",
            description: department?.description ?? "",
        },
        onSubmit: async (values) => {
            const browser = getBrowserDetails();
            const ipAddress = await getIPAddress();
            try {
                const formData = {
                    ...values,
                    id: department?.id ?? 0,
                    userId: "",
                    actionType: 0,
                    active: "True",
                    approved: true,
                    browser: browser,
                    ip: ipAddress
                }
                
                const res = await utilitiesApis.createDepartment(authUser, formData);
                if (res?.success){
                    toast.success("Department created successfully!");
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
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            fullWidth
                            required={true}
                            helperText={formik.touched.name && formik.errors.name}
                            label="Deparment Name"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            InputProps={{
                                form: {
                                    autocomplete: "off",
                                },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <DMTTextInput
                            error={Boolean(formik.touched.description && formik.errors.description)}
                            fullWidth
                            multiline={true}
                            minRows={3}
                            placeholder={"Type the description..."}
                            helperText={formik.touched.description && formik.errors.description}
                            label="Description"
                            name="description"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.description}
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

export default DepartmentForm;