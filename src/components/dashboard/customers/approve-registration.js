import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MKButton from "../../@mui-components/button";
import { Typography } from "@mui/material";
import MKTypography from "../../@mui-components/typography";
import DialogTitle from "@mui/material/DialogTitle";
import {customersApis} from "../../../api-requests/customers-api";
import {useAuth} from "../../../hooks/use-auth";
import {toast} from "react-toastify";
import {getIPAddress} from "../../../utils/helper-functions";

const ApproveRegistration = props => {
    const { customer, onRefresh } = props;
    const authUser = useAuth();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const onProceed = async () => {
      const ipAddress = await getIPAddress();
      try{
          const formData = {
              customerId: customer?.id,
              customerUserId: customer?.customerUserId,
              approvedBy: authUser?.user?.userid,
              channelType: "USSD",
              ip: ipAddress
          }
         const res =  await customersApis.approveCustomer(authUser, formData );
         toast.success('Customer approved successfully!');
          await onRefresh?.();
          handleClose();
      }
      catch (e) {
          console.log(e.error)
      }
  }

  return (
    <>
      <MKTypography color="success" onClick={handleClickOpen}>
        Approve
      </MKTypography>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'sm'}
        fullWidth
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <DialogTitle>
              {"Confirmation"}
          </DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to proceed approve {customer?.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <MKButton onClick={handleClose} color="error" variant="contained" autoFocus>
            Cancel
          </MKButton>
            <MKButton color="success" variant="contained"   onClick={onProceed}>Proceed</MKButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ApproveRegistration;
