import {alpha, Drawer, IconButton} from "@mui/material";
import MKBox from "../../../../@mui-components/box";
import CloseIcon from "@mui/icons-material/Close";
import MKTypography from "../../../../@mui-components/typography";
import React, {useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../../../hooks/use-auth";
import {customersApis} from "../../../../../api-requests/customers-api";
import DeviceList from "./device-list";

const DevicesDrawer = props => {
    const { open, onClose, customer, existingCustomer} = props;
    const authUser = useAuth();
    const [devices, setDevices] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllDevices = useCallback(async () => {
        try{
            setIsLoading(true)
            const formData = {
                customerId: existingCustomer?.id,
                customerUserId: existingCustomer?.customerUserId,
            };
            const res = await customersApis.fetchDevices(authUser, formData);
            setDevices(res?.data);
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            setIsLoading(false);
        }
    },[authUser, isLoading, existingCustomer]);



    useEffect(() => {
        if (open){
            fetchAllDevices();
        }

    },[open]);




    return (
        <div>
                <Drawer
                    anchor={"right"}
                    open={open}
                    onClose={onClose}
                    elevation={3}
                >
                    <MKBox
                        sx={{p: 2, width: "400px", backgroundColor: theme => alpha(theme.palette.primary.main, 0.02)}}>
                        <MKBox sx={{mb: 1, display: 'flex', justifyContent: 'flex-start'}}>
                            <IconButton onClick={onClose}>
                                <CloseIcon/>
                            </IconButton>
                        </MKBox>
                        <MKTypography color={'primary'} variant={"h6"} align={"center"} gutterBottom>
                            {"Manage Devices"}
                        </MKTypography>
                        <MKBox>
                            <DeviceList
                                devices={devices}
                                isLoading={isLoading}
                                existingCustomer={existingCustomer}
                                onRefresh={fetchAllDevices}
                            />
                        </MKBox>
                    </MKBox>
                </Drawer>
            </div>
    )
}

export default DevicesDrawer;