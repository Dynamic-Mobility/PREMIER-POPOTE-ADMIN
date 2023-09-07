import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MKButton from "../../@mui-components/button";
import { Typography } from "@mui/material";
import MKTypography from "../../@mui-components/typography";

const ApproveRegistration = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MKTypography color="success" onClick={handleClickOpen}>
        Approve
      </MKTypography>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography>Are you sure you want to proceed?</Typography>
        </DialogContent>
        <DialogActions>
          <MKButton color="success" variant="contained" size="small" >Proceed</MKButton>
          <MKButton onClick={handleClose} color="error" variant="contained" size="small" autoFocus>
            Cancel
          </MKButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApproveRegistration;
