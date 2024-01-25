import {Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import MKBox from "../../../@mui-components/box";
import AccountDetailsDatagrid from "./account-details-datagrid";
import React from "react";
import CustomerActions from "./customer-actions";
import CustomerViewDetails from "./customer-view-details";

const CustomerDetails = props => {
    const {
        customer,
        existingCustomer,
        customerAccounts,
        onReset,
        handleOnAddUpdate,
        onRefresh
    } = props;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={9}  xs={12}>
                    <CustomerViewDetails customer={customer} existingCustomer={existingCustomer}/>
                    <Divider />
                    <MKBox sx={{ my: 2 }}>
                        <AccountDetailsDatagrid
                            data={customerAccounts}
                            cifResponse={customer}
                            existingCustomer={existingCustomer}
                            onRefresh={onRefresh}
                        />
                    </MKBox>
             </Grid>
             <Grid item md={3} xs={12}>
                 {Boolean(customer) && (
                     <CustomerActions
                         onRefresh={onRefresh}
                         customer={customer}
                         onAddUpdate={handleOnAddUpdate}
                         onReset={onReset}
                         existingCustomer={existingCustomer}
                     />
                 )}
             </Grid>
         </Grid>
     </>
 )
}

export default CustomerDetails;