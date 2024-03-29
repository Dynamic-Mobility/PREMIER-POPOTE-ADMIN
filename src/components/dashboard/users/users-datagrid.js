import {Column} from "devextreme-react/data-grid";
import DMTDatagrid from "../../@dmt-components/data-grid";
import React, {useState} from "react";
import UsersActions from "./users-actions";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import {alpha, Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {getInitials} from "../../../utils/helper-functions";
import DMTChip from "../../@dmt-components/chip";
import UserDetailsDrawer from "./user-details-drawer";

const UsersDatagrid = props => {
    const { data, onRefresh } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);


    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const actionOptions = ({ data }) => {
        const handleOnView = () => {
            setSelectedUser(data);
            setOpenDialog(true);
        }
        return (
            <>
                <UsersActions user={data} onView={handleOnView} onRefresh={onRefresh}/>
            </>
        )
    }

    const renderProfile = ({ data }) => {
        const fname = Boolean(data?.firstName) ? data?.firstName : "";
        const lname = Boolean(data?.otherName) ? data?.otherName : "";
        const fullName = fname+' '+ lname;
        const handleOnView = () => {
            setSelectedUser(data);
            setOpenDialog(true);
        }
        return (
            <>
                <ListItem   onClick={handleOnView} sx={{ cursor:'pointer', fontSize: 'inherit'}}>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                height: 45,
                                width: 45,
                                backgroundColor: theme => alpha(theme.palette.primary.main, 0.2),
                                color: 'primary.main',
                            }}
                        >
                            <MKTypography fontWeight={'bold'} variant={'body2'} sx={{ fontSize: '14px'}}>
                                {getInitials(fullName)}
                            </MKTypography>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <>
                                <MKTypography fontSize={'inherit'}>
                                    {fullName}
                                </MKTypography>
                            </>
                        }
                        secondary={
                            <MKTypography variant={'caption'}  fontSize={'inherit'}>
                                {data?.roleName}
                            </MKTypography>
                        }
                    />
                </ListItem>
            </>
        )
    }

    const renderContacts = ({ data }) => {
        return (
            <>
                <MKBox>
                    <MKBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <MKTypography variant={'h6'} fontSize={'inherit'}>
                            {"Email : "}
                        </MKTypography>
                        <MKTypography color={'info'} component={'a'} href={`mailto:${data?.email}`} fontSize={'inherit'}>
                            {data?.email}
                        </MKTypography>
                    </MKBox>
                    <MKBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <MKTypography variant={'h6'} fontSize={'inherit'}>
                            {"Phone : "}
                        </MKTypography>
                        <MKTypography color={'info'} component={'a'} href={`tel:${data?.phoneNumber}`} fontSize={'inherit'}>
                            {data?.phoneNumber}
                        </MKTypography>
                    </MKBox>
                </MKBox>
            </>
        )
    }

    const renderStatus = ({ displayValue}) => {
        const color = displayValue === 'Active' ? "success" : "error";
        return (
            <>
                <DMTChip
                    label={displayValue}
                    color={color}
                />
            </>
        )
    }

    return(
        <>
            <DMTDatagrid
                data={data}
                height={'80vh'}
            >
                <Column minWidth={220} dataField="firstName" caption="Name" cellRender={renderProfile} />
                <Column minWidth={300}  caption="Contact" cellRender={renderContacts} />
                <Column minWidth={150} dataField="roleName" caption="Role" visible={false} />
                <Column minWidth={150} dataField="branchName" caption="Branch" />
                <Column minWidth={150} dataField="departmentName" caption="Department" />
                <Column minWidth={150} dataField="status" caption="Status" cellRender={renderStatus} />
                <Column
                    caption="Actions"
                    minWidth={130}
                    alignment={"center"}
                    allowFiltering={false}
                    cellRender={actionOptions}
                />
            </DMTDatagrid>
            <UserDetailsDrawer
                open={openDialog}
                user={selectedUser}
                onClose={handleOnClose}
            />
        </>
    )
}

export default UsersDatagrid;