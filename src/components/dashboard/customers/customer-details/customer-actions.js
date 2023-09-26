import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import CustomerResetPin from "../customer-reset-pin";
import {Collapse} from "@mui/material";

const CustomerActions = props => {
    const {customer, onAddUpdate, onReset} = props;
    return (
        <>
            <MKTypography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
            </MKTypography>
            <MKBox sx={{ display: "grid", gap:1, mb:3 }}>
                <MKButton
                    onClick={onAddUpdate}
                    disabled={Boolean(customer?.custExist)}
                    variant="contained"
                    color="primary"
                >
                    Add New
                </MKButton>
                <MKButton
                    onClick={onAddUpdate}
                    disabled={Boolean(!customer?.custExist)}
                    variant="outlined"
                    color="primary"
                >
                    Update Changes
                </MKButton>
                <MKButton onClick={() => onReset()} variant="outlined" color="error">
                    Cancel
                </MKButton>
                {/*<MKButton sx={{ my: 1 }} variant="contained" color="success">*/}
                {/*    Save Changes*/}
                {/*</MKButton>*/}
            </MKBox>

                <Collapse in={Boolean(customer?.custExist)}>
                    <MKTypography gutterBottom sx={{ textAlign: "center", fontWeight: "bold" }}>
                        {"More Actions"}
                    </MKTypography>
                    <ButtonGroup
                        fullWidth
                        orientation="vertical"
                        variant="contained"
                        aria-label="vertical outlined button group"
                    >
                        <MKButton variant="outlined" color="primary">
                            Update Limits
                        </MKButton>
                        <MKButton variant="outlined" color="primary">
                            Recreate Key
                        </MKButton>
                        <CustomerResetPin customer={customer}>
                            {"Reset Pin"}
                        </CustomerResetPin>
                    </ButtonGroup>
                </Collapse>
        </>
    )
}

export default CustomerActions;