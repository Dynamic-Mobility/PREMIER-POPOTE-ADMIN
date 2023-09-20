import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MKButton from "../../@mui-components/button";
import { Typography, Box } from "@mui/material";
import List from "@mui/material/List";
import LinkAccountComponent from "./link-account-component";

const LinkAccountModal = (props) => {
  const { cifResponse, data } = props;
  const [open, setOpen] = React.useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MKButton
        onClick={handleClickOpen}
        color="primary"
        size="small"
        variant="contained"
      >
        Link Account
      </MKButton>
      <Dialog
        maxWidth="xs"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography fontWeight={"bold"} fontSize={"20px"}>
            {data?.length <= 0 ? <p>No Accounts Available Yet</p> : <p>Available Accounts</p>}
          </Typography>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List component="nav" aria-label="main mailbox folders">
              {data?.map((item, index) => (
                
                <LinkAccountComponent key={index} item={item} cifResponse={cifResponse} />
              ))}
            </List>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinkAccountModal;
