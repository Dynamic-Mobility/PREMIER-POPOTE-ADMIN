import {Column, Selection} from "devextreme-react/data-grid";
import DMTDatagrid from "../../@dmt-components/data-grid";
import React, {useState} from "react";
import UsersActions from "./users-actions";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import {alpha, Avatar, Collapse, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {getBrowserDetails, getInitials, getIPAddress} from "../../../utils/helper-functions";
import MKButton from "../../@mui-components/button";
import Check from "@mui/icons-material/Check";
import Cancel from "@mui/icons-material/Cancel";
import {useAuth} from "../../../hooks/use-auth";
import {toast} from "react-toastify";
import {usersApis} from "../../../api-requests/users-apis";
import ConfirmationDialog from "../../@dmt-components/confirmation-dialog";

const UsersApprovalDatagrid = props => {
    const { data, onRefresh } = props;
    const authUser = useAuth();
    const [selectedRecords, setSelectedRecords] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationDialog, setConfirmationDialog] = useState({
        open: false,
        message: null,
        action: null
    });

    const actionOptions = ({ data }) => {
        const onApprove = ()  => {
            setSelectedRecords([data?.id])
            handleOnApprove();
        }
        const onReject = () => {
            setSelectedRecords([data?.id])
            handleOnApprove();
        }
        return (
            <>
                <UsersActions
                    user={data}
                    onApprove={onApprove}
                    onReject={onReject}
                    onRefresh={onRefresh}
                    approval={true}
                />
            </>
        )
    };

    const handleOnApprove = () => {
        setConfirmationDialog({
            message: 'Do you want to approve the selected records?',
            open: true,
            action: 'approve'
        })
    }
    const handleOnReject = () => {
        setConfirmationDialog({
            ...confirmationDialog,
            open: true,
            message: 'Do you want to reject the selected records?',
            action: 'decline'
        })
    }

    const onSelectionChanged = props => {
        const {selectedRowKeys, selectedRowsData} = props;
        setSelectedRecords(selectedRowKeys);
    }

    const handleOnCloseDialog = () => {
        setConfirmationDialog({
            ...confirmationDialog,
            open: false,
            action: null
        })
        setSelectedRecords([])
    }

    const onApprove = async () => {
        const ipAddress = await getIPAddress();
        const browser = getBrowserDetails();
        try {
            const data = selectedRecords.map((selected) => {
                return {
                    actionType: 0,
                    userId: selected,
                    browser: browser,
                    ip: ipAddress
                }
            })
            await usersApis.approveUsers(authUser, data)
            const message = confirmationDialog.action === 'approve' ? 'Users approved successfully' : 'Users rejected successfully';
            await toast.success(message);
            handleOnCloseDialog?.();
            await onRefresh?.();
        } catch (e) {
            console.log(e.message)
        }
    }


    const renderProfile = ({ data }) => {
        const fname = Boolean(data?.firstName) ? data?.firstName : "";
        const lname = Boolean(data?.otherName) ? data?.otherName : "";
        const fullName = fname+' '+ lname;
        return (
            <>
                <ListItem sx={{fontSize: 'inherit'}}>
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

    return(
        <>
            <Collapse in={Boolean(selectedRecords.length > 0)}>
                <MKBox sx={{ display: 'flex', mb:2, alignItems: 'center', justifyContent: 'space-between'}}>
                    <MKBox>
                        <MKTypography>
                            {`${selectedRecords.length} record(s) selected`}
                        </MKTypography>
                    </MKBox>
                    <MKBox>
                        <MKButton startIcon={<Check/>} sx={{ mr:1}} size={'small'} onClick={handleOnApprove} color={'success'} variant={'outlined'}>
                            Bulk Approve
                        </MKButton>
                        <MKButton startIcon={<Cancel/>} size={'small'} onClick={handleOnReject} color={'error'} variant={'outlined'}>
                            Bulk Reject
                        </MKButton>
                    </MKBox>

                </MKBox>
            </Collapse>
            <DMTDatagrid
                data={data}
                height={'80vh'}
                keyExpr="merchant_id"
                onSelectionChanged={onSelectionChanged}
                selectedRowKeys={selectedRecords}
            >
                <Selection
                    mode="multiple"
                    selectAllMode={'allMode'}
                    //showCheckBoxesMode={checkBoxesMode}
                />
                <Column minWidth={220} dataField="firstName" caption="Name" cellRender={renderProfile} />
                <Column minWidth={300}  caption="Contact" cellRender={renderContacts} />
                <Column minWidth={150} dataField="roleName" caption="Role" />
                <Column minWidth={150} dataField="branchName" caption="Branch" />
                <Column minWidth={150} dataField="departmentName" caption="Department" />
                <Column
                    caption="Actions"
                    minWidth={130}
                    alignment={"center"}
                    allowFiltering={false}
                    cellRender={actionOptions}
                />
            </DMTDatagrid>
            <ConfirmationDialog
                {...{
                    onOk: onApprove,
                    isLoading,
                    onClose: handleOnCloseDialog,
                    message: confirmationDialog.message,
                    open: confirmationDialog.open
                }}
            />
        </>
    )
}

export default UsersApprovalDatagrid;