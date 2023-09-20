import {Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import MKBox from "../../../@mui-components/box";
import CustomerDetailsDataGrid from "../customer-details-datagrid";
import React, {useState} from "react";
import CustomerForm from "./customer-form";
import CustomerActions from "./customer-actions";

const CustomerDetails = () => {
    const [customer, setCustomer] = useState(null);
    const [customerAccounts, setCustomerAccounts] = useState([]);
    return (
        <>
            <Grid container spacing={3}>
                <Grid item md={9} xs={12}>
                    <CustomerForm customer={customer}/>
                    <Divider />
                    <MKBox sx={{ my: 2 }}>
                        <CustomerDetailsDataGrid data={customerAccounts} />
                    </MKBox>
             </Grid>
             <Grid item md={3} xs={12}>
                 <CustomerActions customer={customer}/>
             </Grid>
         </Grid>
     </>
 )
}

export default CustomerDetails;