import {Column} from "devextreme-react/data-grid";
import DMTDatagrid from "../../@dmt-components/data-grid";
import React from "react";
import UsersActions from "./users-actions";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import {alpha, Avatar, IconButton, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import {getInitials} from "../../../utils/helper-functions";

const UsersDatagrid = props => {
    const { data, onRefresh } = props;
    const actionOptions = ({ data }) => {
        return (
            <>
                <UsersActions user={data} onRefresh={onRefresh}/>
            </>
        )
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
                    {/*<MKBox sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>*/}
                    {/*    <MKTypography variant={'h6'} fontSize={'inherit'}>*/}
                    {/*        {"Ext : "}*/}
                    {/*    </MKTypography>*/}
                    {/*    <MKTypography  fontSize={'inherit'}>*/}
                    {/*        {data?.extension}*/}
                    {/*    </MKTypography>*/}
                    {/*</MKBox>*/}
                </MKBox>
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
        </>
    )
}

export default UsersDatagrid;