import React, {useCallback, useEffect, useState} from "react";
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
import {useSelector} from "../../../store";
import {formatPermissions} from "../../../utils/helper-functions";
import {toast} from "react-toastify";

const RolesForm = props => {
    const { role } = props;
    const authUser = useAuth();
    const [isEditable, setIsEditable] = useState(false);
    const [rolePermissions, setRolePermissions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const formik = useFormik({
       initialValues: {
           name: role?.name ?? "",
           description: role?.description ?? "",
           rolePermission: role?.rolePermission ?? [],
       },
        onSubmit: async (values, helpers) => {
           try{
               const formData = {
                   id: role?.id,
                   profilename: values?.name,
                   profileDesc: values?.description,
                   rolePermissions: rolePermissions
               }
               const res = await rolesApis.createRole(authUser, formData);
               if (res.success){
                   toast.success(res?.errorMsg ?? "Operation successful!")
               }
               else{
                   toast.error(res?.errorMsg ?? "Oops an error occurred while processing request!")
               }
               console.log(res);
           }
           catch (e) {
               console.log(e.message);
           }
        }
    });
    const { isLoadingMenus } = useSelector(( {roles }) => roles);

    const wrapperClass = !isEditable ? "wrapper-disabled" : "";
    const pointerClass =  !isEditable ? "disabled-field" : "";


    const handleOnPermissionChange = useCallback(values => {
        setRolePermissions(values);
    },[])

    const handleOnEdit = () => {
        setIsEditable(true);
    }

    const handleOnClose = async () => {
        setIsEditable(false);
        if (role){
            await fetchPermissions();
        }
    }

    const fetchPermissions = async () => {
        const formData = {
            id: role?.id
        }
        setIsLoading(true);
        try{
            const res = await rolesApis.fetchRolePermissions(authUser, formData);
            let permissions = [];
            if (Array.isArray(res)){
                permissions = res.map( p => {
                    let child = null;
                    if (p?.child){
                        child = p.child.map((c => {
                            const perms  = formatPermissions(c.permission);
                            return {
                                childMenuId: c.id,
                                permission: perms,
                            }
                        }))
                    }
                    const perms  = formatPermissions(p.permission);
                    return {
                        mainMenuId: p.id,
                        childMenu : child,
                        permission: perms,
                    }
                })
            }
            setRolePermissions(permissions);
        }
        catch (e) {
           console.log(e.message);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        setIsEditable(Boolean(!role));
        if (role){
            fetchPermissions();
        }
    },[role]);

    return (
        <>
            <MKTypography variant={'h5'} gutterBottom sx={{ mb:2}}>
                {Boolean(role) ? "Update Role" : "Add Role"}
            </MKTypography>
            <form onSubmit={formik.handleSubmit}>
                <Grid sx={{ mb:2}} container spacing={2}>
                    <Grid className={wrapperClass} item xs={12} sm={12} md={12} >
                        <DMTTextInput
                            className={pointerClass}
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
                    <Grid className={wrapperClass} item xs={12} sm={12} md={12} >
                        <DMTTextInput
                            label={'Description'}
                            className={pointerClass}
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
                    <Grid className={wrapperClass} item xs={12} sm={12} md={12}>
                        <MKBox sx={{ mb:1,  display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                            <MKTypography variant={'h6'} gutterBottom>
                                {"Assign Permissions"}
                            </MKTypography>
                            {(isLoading || isLoadingMenus) && (
                                <MKBox sx={{ display: 'flex', alignItems:'center'}}>
                                    <LoaderIcon/>
                                    <MKTypography sx={{ ml: 1}}>
                                        {"Fetching..."}
                                    </MKTypography>
                                </MKBox>
                            )}
                        </MKBox>

                        <PermissionsForm
                            isEditable={isEditable}
                            selectedPerms ={rolePermissions}
                            onPermsChange = {handleOnPermissionChange}
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