import {alpha, Avatar, Drawer, IconButton} from "@mui/material";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import PropertyItem from "../../@dmt-components/PropertyItem";
import DMTChip from "../../@dmt-components/chip";
import React from "react";
import {formatDate, getInitials} from "../../../utils/helper-functions";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";


const UserDetailsDrawer = props => {
    const { user, open, onClose } = props;

    if (!user) {
        return null;
    }

    const color = user?.status === 'Active'
        ? "success"  : user?.status === 'UnApproved'
            ? 'warning' : "error";

    const fullName = user?.firstName + " "+ user?.otherName;


    return (
        <div>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={onClose}
                elevation={3}
            >
                <MKBox sx={{ p: 2, width: "400px", height:'100%', backgroundColor: theme => alpha(theme.palette.primary.main, 0.02)}}>
                    <MKBox sx={{ mb:1, display: 'flex', justifyContent: 'flex-start'}}>
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </MKBox>

                    <MKBox sx={{ mb:2, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection:'column'}}>
                        <Avatar
                            sx={{
                                height: 60,
                                width: 60,
                                backgroundColor: theme => alpha(theme.palette.success.main, 0.2),
                                color: 'primary.main',
                            }}
                        >
                            <MKTypography fontWeight={'bold'} variant={'body2'} sx={{ fontSize: '14px'}}>
                                {getInitials(fullName)}
                            </MKTypography>
                        </Avatar>
                        <MKTypography align={'center'} variant={"h6"} gutterBottom>
                            {fullName}
                        </MKTypography>
                        <MKTypography align={'center'} variant={"caption"} gutterBottom>
                            {user?.roleName}
                        </MKTypography>
                    </MKBox>
                    <Divider/>
                    <MKBox>
                        <PropertyItem
                            label={"User ID"}
                            value={user?.id}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Email"}
                            value={
                                <MKTypography color={'info'} component={'a'} href={`mailto:${user?.email}`}>
                                    {user?.email}
                                </MKTypography>
                            }
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Phone Number"}
                            value={
                                <MKTypography color={'info'} component={'a'} href={`tel:${user?.phoneNumber}`}>
                                    {user?.phoneNumber}
                                </MKTypography>
                            }
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Extension"}
                            value={user?.extension}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Gender"}
                            value={user?.gender}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Branch"}
                            value={user?.branchName}
                            isLoading={false}
                        />

                        <PropertyItem
                            label={"Department"}
                            value={user?.departmentName}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Status"}
                            value={
                            <DMTChip
                                label={user?.status}
                                color={color}
                            />}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Login Message"}
                            value={user?.message}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Last Login"}
                            value={formatDate(user?.lastLoginTime, 'DD MMM YYYY hh:mm:s a')}
                            isLoading={false}
                        />
                    </MKBox>
                </MKBox>
            </Drawer>
        </div>
    );
}

export default UserDetailsDrawer;