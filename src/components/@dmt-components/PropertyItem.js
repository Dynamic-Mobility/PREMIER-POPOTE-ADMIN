import MKBox from "../@mui-components/box";
import MKTypography from "../@mui-components/typography";
import {Skeleton} from "@mui/material";
import {Divider} from "@mui/material";
import React from "react";

const PropertyItem = (props) => {
    const { label, value, isLoading = true } = props;
    return (
        <>
            <MKBox
                sx={{
                    display: "flex",
                    my: 1,
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
            >
                <MKTypography variant={"body"}>
                    {label}
                </MKTypography>
                {isLoading ? (
                    <Skeleton animation="wave" height={20} width="40%" />
                ) : (
                    <MKTypography variant={"body1"}>{value !== null && value!=="" ? value : '-'}</MKTypography>
                )}
            </MKBox>
            <Divider />
        </>
    );
};

export default React.memo(PropertyItem);