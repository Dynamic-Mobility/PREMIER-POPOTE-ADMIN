import React from "react";
import Slide from "@mui/material/Slide";
import Dialog from "@mui/material/Dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const DMTDialog = props => {
    const { children } = props;
    return (
        <>
            <Dialog
                TransitionComponent={Transition}
                fullWidth
                maxWidth={'sm'}
                scroll={'body'}
                {...props}
            >
                {children}
            </Dialog>
        </>
    )
}

export default DMTDialog;