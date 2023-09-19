import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MKButton from "../../@mui-components/button";
import MKTypography from "../../@mui-components/typography";
import DMTTextInput from "../../@dmt-components/form/text-input";
import MKBox from "../../@mui-components/box";
import { DialogTitle } from "@mui/material";

const RejectEditedCustomer = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MKTypography color="error" onClick={handleClickOpen}>
        Reject
      </MKTypography>
      <Dialog
        maxWidth="md"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>
          <MKTypography>Provide a reason for rejecting approval</MKTypography>
        </DialogTitle>
        <DialogContent>
          <form>
            <DMTTextInput
              sx={{ mt: 2 }}
              label="Reason"
              rows={4}
              multiline
              fullWidth
            />
            <MKBox sx={{ display: "flex", justifyContent: "flex-end" }}>
              <MKButton
                sx={{ mt: 1 }}
                color="primary"
                variant="contained"
                size="small"
              >
                Send
              </MKButton>
            </MKBox>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RejectEditedCustomer;
