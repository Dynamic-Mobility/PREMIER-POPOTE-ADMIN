import React, {useState} from "react";
import DMTDialog from "../../@dmt-components/dialog";
import {DialogContent, DialogTitle} from "@mui/material";
import DepartmentForm from "./department-form";
import MKButton from "../../@mui-components/button";
import EditIcon from "@mui/icons-material/Edit";
import MenuItem from "@mui/material/MenuItem";

const CreateDepartmentDialog = props => {
    const [openDialog, setOpenDialog] = useState(false);
    const { onRefresh, department, onClose } = props;
    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
        onClose?.();
    }

    return(
        <>
            {Boolean(department) ? (
                <MenuItem onClick={handleOnOpen}>
                    <EditIcon sx={{mr: 1}} />
                    {" "}
                    {" Edit Department"}
                </MenuItem>
            ): (
                <MKButton onClick={handleOnOpen} variant={'contained'} color={'primary'}>
                    {"Create Department"}
                </MKButton>
            )}

            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogTitle>
                    {Boolean(department) ?"Update Department" : "Create Department"}
                </DialogTitle>
                <DialogContent>
                    <DepartmentForm department={department} onClose={handleOnClose} onRefresh={onRefresh}/>
                </DialogContent>
            </DMTDialog>
        </>
    )
}

export default CreateDepartmentDialog;