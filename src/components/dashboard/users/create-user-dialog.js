import React, {useState} from "react";
import DMTDialog from "../../@dmt-components/dialog";
import {DialogContent, DialogTitle} from "@mui/material";
import UsersForm from "./users-form";
import MKButton from "../../@mui-components/button";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {PAGE_PERMISSIONS, PAGES_PATHS, PERMISSIONS} from "../../../utils/constants";

const CreateUserDialog = props => {
    const [openDialog, setOpenDialog] = useState(false);
    const { onRefresh, user, onClose } = props;
    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
        onClose?.();
    }

    return(
        <>
            {Boolean(user) ? (
                <RoleBasedGuard path={PAGES_PATHS.MANAGE_USERS} permission={PAGE_PERMISSIONS.EDIT.value}>
                    <MenuItem onClick={handleOnOpen}>
                        <EditIcon sx={{mr: 1}} />
                        {" "}
                        {" Edit User"}
                    </MenuItem>
                </RoleBasedGuard>
            ): (
                <RoleBasedGuard path={PAGES_PATHS.MANAGE_USERS} permission={PAGE_PERMISSIONS.CREATE.value}>
                    <MKButton onClick={handleOnOpen} variant={'contained'} color={'primary'}>
                        {"Create User"}
                    </MKButton>
                </RoleBasedGuard>

            )}

            <DMTDialog
                open={openDialog}
                //onClose={handleOnClose}
            >
                <DialogTitle>
                    {Boolean(user) ?"Update User" : "Create User"}
                </DialogTitle>
                <DialogContent>
                    <UsersForm user={user} onClose={handleOnClose} onRefresh={onRefresh}/>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default CreateUserDialog;