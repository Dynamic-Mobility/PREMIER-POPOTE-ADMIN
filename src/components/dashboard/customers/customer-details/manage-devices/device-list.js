import {
    Avatar,
    Collapse,
    Divider,
    FormControlLabel,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText, Switch
} from "@mui/material";
import MKTypography from "../../../../@mui-components/typography";
import React, {Fragment} from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import MKBox from "../../../../@mui-components/box";
import MKButton from "../../../../@mui-components/button";
import {LoaderIcon} from "react-hot-toast";
import {getInitials, toUpperCase} from "../../../../../utils/helper-functions";
import DMTChip from "../../../../@dmt-components/chip";
import {customersApis} from "../../../../../api-requests/customers-api";
import {toast} from "react-toastify";
import {useAuth} from "../../../../../hooks/use-auth";
import AddDevice from "./add-device";

const DeviceList = props => {
    const { devices, isLoading, existingCustomer, onRefresh, isNew = false } = props;
    const authUser = useAuth();
    const handleOnToggle = async (deviceId) => {
        await enableDisableDevice(deviceId);
    }
    const enableDisableDevice = async (deviceId) => {
     try{
         const formData = {
             customerId: existingCustomer?.id,
             customerUserId: existingCustomer?.customerUserId,
             deviceId: deviceId
         }
         const res = await customersApis.enableDisableDevices(authUser, formData);
         if (res?.success){
             toast.success(res?.errorMessage ?? "Operation is successful!");
             await onRefresh?.();
         }
         else{
             toast.error(res?.errorMessage ?? "Operation Failed!")
         }


     } catch (e) {
         toast.error(e.message);
     }
    }


    if(isLoading){
        return (
            <>
                <MKBox sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    flexDirection: "Column"
                }}>
                    <LoaderIcon/>
                    <MKButton>
                        {"Loading..."}
                    </MKButton>
                </MKBox>
            </>
        )
    }
    return (
        <>
            <List sx={{ width: '100%'}}>
                {devices?.length > 0 ? devices?.map((device, index) => (
                    <Fragment key={index}>
                        <ListItem
                            sx={{ backgroundColor: 'background.paper', p:1 }}
                            secondaryAction={
                                !isNew ?
                                <FormControlLabel
                                    sx={{ mt: 2}}
                                    checked={device?.active}
                                    onChange={() => handleOnToggle(device.deviceId)}
                                    control={<Switch />}
                                />
                                    :
                                   <AddDevice customer={existingCustomer} onRefresh={onRefresh} device={device} />
                            }

                        >
                            <ListItemAvatar>
                                <MKBox
                                    component={"img"}
                                    src={device?.osType === 1 ? "/static/android.jpg"  : device?.osType === 1 ? "/static/ios2.jpg" : "/static/android.jpg"}
                                    sx={{ width: 50}}
                                />
                            </ListItemAvatar>
                            <ListItemText
                                primary={toUpperCase(device?.deviceName) ?? toUpperCase(device?.machine)}
                                secondary={
                                    <>
                                        <MKTypography
                                            sx={{ display: 'inline' }}
                                            component="span"
                                            variant={"body2"}
                                            fontWeight={"bold"}
                                        >
                                            Status:
                                        </MKTypography>
                                        {" "}
                                        <DMTChip
                                            label={device?.active ? "Active" : "Inactive"}
                                            color={device?.active ? "success" : "error"}
                                            size={"small"}
                                        />
                                    </>
                                }
                            />
                        </ListItem>
                        <Collapse  sx={{ backgroundColor: 'background.paper', px:1, pb:1 }} in={true}>
                            <MKBox sx={{ display:'flex', alignItems: 'center', justifyContent: "space-between"}}>
                                <MKTypography variant={"caption"}>
                                    <b> {"Machine: "} </b>
                                        {Boolean(device?.machine) ? device?.machine  : "Unavailable"}
                                </MKTypography>
                                <MKTypography variant={"caption"}>
                                    <b>{"Manufacturer: "} </b>
                                        {Boolean(device?.manufacturer) ? device?.manufacturer : "Unavailable" }
                                </MKTypography>
                            </MKBox>
                            <MKBox sx={{ display:'flex', alignItems: 'center', justifyContent: "space-between"}}>
                                <MKTypography variant={"caption"}>
                                   <b> {"Biometrics: "}</b>
                                    {device?.biometricEnabled ? "Enabled" : "Disabled"}
                                </MKTypography>
                                <MKTypography variant={"caption"}>
                                    <b> {"OS: "} </b>
                                        {device?.osType === 1 ? "Android" : device?.osType === 0 ? "IOS" : "Unknown"}
                                </MKTypography>
                            </MKBox>
                        </Collapse>
                        <Divider component="li" />
                    </Fragment>
                ))
                    : (
                        <>
                            <MKTypography>
                                {"No devices found!"}
                            </MKTypography>
                        </>
                    )
                }
            </List>
        </>
    )
}





export default DeviceList;