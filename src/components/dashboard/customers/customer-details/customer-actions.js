import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import CustomerResetPin from "../customer-reset-pin";
import {Collapse} from "@mui/material";
import AddCustomerDialog from "./add-customer-dialog";
import UpdateCustomerDialog from "./update-customer-dialog";
import BlockUnblockCustomerDialog from "./block-unblock-customer";
import CustomerSetLimits from "../customer-set-limits";
import RoleBasedGuard from "../../../../hocs/role-based-guard";
import {PAGE_PERMISSIONS, PAGES_PATHS} from "../../../../utils/constants";

const CustomerActions = props => {
    const {customer, onAddUpdate, onReset, existingCustomer} = props;
    return (
        <>
            <MKTypography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
            </MKTypography>
            <MKBox sx={{ display: "grid", gap:1, mb:3 }}>
                {Boolean(customer && !customer?.custExist) &&(
                    <>
                        <RoleBasedGuard permission={PAGE_PERMISSIONS.CREATE.value} path={PAGES_PATHS.CUSTOMER_DETAILS}>
                            <AddCustomerDialog
                                customer={customer}
                                disabled={Boolean(customer?.custExist)}
                                onAddUpdate={onAddUpdate}
                            />
                        </RoleBasedGuard>
                    </>

                )}

                {Boolean(customer && customer?.custExist) &&(
                    <RoleBasedGuard permission={PAGE_PERMISSIONS.EDIT.value} path={PAGES_PATHS.CUSTOMER_DETAILS}>
                        <UpdateCustomerDialog
                            customer={customer}
                            disabled={Boolean(!customer?.custExist)}
                            onAddUpdate={onAddUpdate}
                        />
                    </RoleBasedGuard>
                )}

                <MKButton onClick={() => onReset()} variant="outlined" color="error">
                    Cancel
                </MKButton>
                {/*<MKButton sx={{ my: 1 }} variant="contained" color="success">*/}
                {/*    Save Changes*/}
                {/*</MKButton>*/}
            </MKBox>

                <Collapse in={Boolean(customer?.custExist)}>
                    <RoleBasedGuard permission={PAGE_PERMISSIONS.EDIT.value} path={PAGES_PATHS.CUSTOMER_DETAILS}>
                        <MKTypography gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
                            {"More Actions"}
                        </MKTypography>
                        <ButtonGroup
                            fullWidth
                            orientation="vertical"
                            variant="contained"
                            aria-label="vertical outlined button group"
                        >
                            <CustomerSetLimits customer={customer} accounts={[]}/>

                            {/*<MKButton variant="outlined" color="primary">*/}
                            {/*    Recreate Key*/}
                            {/*</MKButton>*/}
                            <CustomerResetPin customer={customer} existingCustomer={existingCustomer}>
                                {"Reset Pin"}
                            </CustomerResetPin>
                            <BlockUnblockCustomerDialog
                                existingCustomer={existingCustomer}
                                customer={customer}
                            />
                        </ButtonGroup>

                    </RoleBasedGuard>
                </Collapse>
        </>
    )
}

export default CustomerActions;