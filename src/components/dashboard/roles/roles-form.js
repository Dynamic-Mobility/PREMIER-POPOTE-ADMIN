import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import DMTTextInput from "../../@dmt-components/form/text-input";
import {Collapse, Grid} from "@mui/material";
import MKBox from "../../@mui-components/box";
import MKButton from "../../@mui-components/button";
import {LoaderIcon} from "react-hot-toast";
import MKTypography from "../../@mui-components/typography";
import PermissionsForm from "./permissions-form";
import {rolesApis} from "../../../api-requests/roles-apis";
import {useAuth} from "../../../hooks/use-auth";

const RolesForm = props => {
    const { role } = props;
    const authUser = useAuth();
    const [isEditable, setIsEditable] = useState(false);
    const formik = useFormik({
       initialValues: {
           name: role?.name ?? "",
           description: role?.description ?? "",
           permissions: role?.permissions ?? [],
       },
        onSubmit: async (values, helpers) => {
           try{
               console.log("VALUES", values);
               const res = await rolesApis.createRole(authUser, values);
           }
           catch (e) {
               
           }
        }
    });
    const handleOnEdit = () => {
        setIsEditable(true);
    }

    const handleOnClose = () => {
        setIsEditable(false);
    }

    useEffect(() => {
        setIsEditable(Boolean(!role))
    },[role]);

    return (
        <>
            <MKTypography variant={'h5'} gutterBottom>
                {Boolean(role) ? "Update Role" : "Add Role"}
            </MKTypography>
            <form onSubmit={formik.handleSubmit}>
                <Grid sx={{ mb:2}} container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} >
                        <DMTTextInput
                            label={'Profile Name'}
                            required
                            fullWidth
                            name={'name'}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={ Boolean(formik.errors.name && formik.touched.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <DMTTextInput
                            label={'Description'}
                            fullWidth
                            multiline
                            minRows={3}
                            placeholder={"Write something..."}
                            name={'description'}
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={ Boolean(formik.errors.description && formik.touched.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} >
                        <MKTypography variant={'h6'} gutterBottom>
                            {"Assign Permissions"}
                        </MKTypography>
                        <PermissionsForm
                            selectedPerms ={formik.values.permissions}
                            onPermsChange = {values => formik.setFieldValue('permissions', values)}
                        />
                    </Grid>
                </Grid>
                <Collapse in={Boolean(isEditable)}>
                    <MKBox sx={{  display: 'flex', gap:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <MKButton disabled={formik.isSubmitting} onClick={handleOnClose} color={'error'} variant={'contained'}>
                            {"Cancel"}
                        </MKButton>
                        <MKButton
                            disabled={formik.isSubmitting}
                            type={'submit'}
                            color={'success'}
                            variant={'contained'}
                            startIcon={formik.isSubmitting && <LoaderIcon/>}
                        >
                            {"Save"}
                        </MKButton>
                    </MKBox>
                </Collapse>
                <Collapse in={!Boolean(isEditable)}>
                    <MKBox sx={{ display: 'flex', gap:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <MKButton disabled={formik.isSubmitting} onClick={handleOnEdit} color={'primary'} variant={'contained'}>
                            {"Update Role"}
                        </MKButton>
                    </MKBox>
                </Collapse>
            </form>
        </>
    )
}

export default RolesForm;