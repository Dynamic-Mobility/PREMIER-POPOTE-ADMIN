import {Grid} from "@mui/material";
import Divider from "@mui/material/Divider";
import MKBox from "../../../@mui-components/box";
import CustomerDetailsDataGrid from "../customer-details-datagrid";
import React from "react";
import CustomerForm from "./customer-form";
import CustomerActions from "./customer-actions";
import {customersApis} from "../../../../api-requests/customers-api";
import {toast} from "react-toastify";
import {useAuth} from "../../../../hooks/use-auth";

const CustomerDetails = props => {
    const {
        customer,
        customerAccounts,
        onReset
    } = props;
    const authUser = useAuth();
    const handleOnAddUpdate = async () => {
        const formattedData = {
            firstName: customer?.firstName,
            lastName: customer?.lastName,
            cif: customer?.cif_no,
            dob: customer?.dateofBirth,
            alias: customer?.name,
            address: customer?.postalAddress,
            phone: customer?.tel,
            kraPin: customer?.krapin,
            email: customer?.email,
            customerTypeId: null,
            secondaryPhone: customer?.mobile,
            pobox: customer?.postalAddress,
            industry: customer?.industry,
            industryCategory: customer?.category,
            location: customer?.physicalAddress,
            town: customer?.physicalAddress,
            geoLocation: null,
            name: customer?.name,
            secondaryEmail: customer?.email,
            actionDesc: customer?.accountDescription,
            idnumber: customer?.idno,
            ip: null,
        };
        try {
            const res = await customersApis.addUpdateCustomers(
                authUser,
                formattedData
            );
            const action = Boolean(customer?.custExist) ? 'updated' : 'created';
            if(res.success){
                toast.success(`Customer details ${action} successfully`);
            }
            else{
                toast.error('Unable to process request. Try again!');
            }
        } catch (err) {
            console.log("ADD_UPDATE_ERROR ",err)
        }
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item md={9}  xs={12}>
                    <CustomerForm customer={customer}/>
                    <Divider />
                    <MKBox sx={{ my: 2 }}>
                        <CustomerDetailsDataGrid data={customerAccounts} />
                    </MKBox>
             </Grid>
             <Grid item md={3} xs={12}>
                 <CustomerActions
                     customer={customer}
                     onAddUpdate={handleOnAddUpdate}
                     onReset={onReset}
                 />
             </Grid>
         </Grid>
     </>
 )
}

export default CustomerDetails;