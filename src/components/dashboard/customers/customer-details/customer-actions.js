import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import CustomerResetPin from "../customer-reset-pin";

const CustomerActions = props => {
    const {customer, onAddUpdate, onReset} = props;
    return (
        <>
            <MKTypography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
            </MKTypography>
            <MKBox sx={{ display: "grid", gap:1 }}>
                <MKButton
                    onClick={onAddUpdate}
                    disabled={Boolean(customer?.custExist)}
                    variant="outlined"
                    color="success"
                >
                    Add New
                </MKButton>
                <MKButton
                    onClick={onAddUpdate}
                    disabled={Boolean(!customer?.custExist)}
                    variant="contained"
                    color="success"
                >
                    Update Changes
                </MKButton>
                {/*<MKButton sx={{ my: 1 }} variant="contained" color="success">*/}
                {/*    Save Changes*/}
                {/*</MKButton>*/}
            </MKBox>
            <ButtonGroup
                sx={{ mt: 4 }}
                fullWidth
                orientation="vertical"
                variant="contained"
                aria-label="vertical outlined button group"
            >
                {/*<MKButton variant="outlined" color="primary">*/}
                {/*    Disable*/}
                {/*</MKButton>*/}
                <MKButton variant="outlined" color="primary">
                    Update Limits
                </MKButton>
                <MKButton variant="outlined" color="primary">
                    Recreate Key
                </MKButton>
                <CustomerResetPin customer={customer}>
                    {"Reset Pin"}
                </CustomerResetPin>
                {/*<MKButton disabled variant="outlined" color="primary">*/}
                {/*    Manage Device*/}
                {/*</MKButton>*/}
                <MKButton onClick={() => onReset()} variant="outlined" color="primary">
                    Cancel
                </MKButton>
            </ButtonGroup>
        </>
    )
}

export default CustomerActions;