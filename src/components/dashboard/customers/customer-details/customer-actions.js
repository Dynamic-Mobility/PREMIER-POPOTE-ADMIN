import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";

const CustomerActions = props => {
    const {customer} = props;
    return (
        <>
            <MKTypography sx={{ textAlign: "center", fontWeight: "bold" }}>
                Actions
            </MKTypography>
            <MKBox sx={{ display: "grid" }}>
                <MKButton
                    onClick={addUpdateCustomers}
                    disabled={Boolean(customer?.custExist)}
                    sx={{ my: 1 }}
                    variant="outlined"
                    color="primary"
                >
                    Add
                </MKButton>
                <MKButton
                    onClick={updateCustomers}
                    disabled={Boolean(!cifResponse?.custExist)}
                    sx={{ my: 1 }}
                    variant="contained"
                    color="primary"
                >
                    Update
                </MKButton>
                <MKButton sx={{ my: 1 }} variant="contained" color="success">
                    Save Changes
                </MKButton>
            </MKBox>
            <ButtonGroup
                sx={{ my: 1 }}
                fullWidth
                orientation="vertical"
                variant="contained"
                aria-label="vertical outlined button group"
            >
                <MKButton variant="outlined" color="primary">
                    Disable
                </MKButton>
                <MKButton variant="outlined" color="primary">
                    Update Limits
                </MKButton>
                <MKButton variant="outlined" color="primary">
                    Recreate Key
                </MKButton>
                <MKButton variant="outlined" color="primary">
                    Reset Pin
                </MKButton>
                {/*<MKButton variant="outlined" color="primary">*/}
                {/*  Maintain Card*/}
                {/*</MKButton>*/}
                <MKButton disabled variant="outlined" color="primary">
                    Manage Device
                </MKButton>
                <MKButton variant="outlined" color="primary">
                    Cancel
                </MKButton>
            </ButtonGroup>
        </>
    )
}

export default CustomerActions;