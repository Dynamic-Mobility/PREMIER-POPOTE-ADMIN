import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import MKButton from "../../@mui-components/button";
import { Typography } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";

const LinkAccountModal = () => {
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
        width="md"
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <Typography fontWeight={"bold"} fontSize={"20px"}>
            Available Accounts
          </Typography>
          <List>
            <ListItem alignItems="flex-start" sx={{ my: 1 }}>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="h6"
                      color="primary"
                    >
                      Account Number
                    </Typography>
                    {"    — 0213131313134"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
            <ListItem alignItems="flex-start" sx={{ my: 1 }}>
              <ListItemText
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="h6"
                      color="primary"
                    >
                      Account Number
                    </Typography>
                    {"    — 0213131313134"}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </List>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinkAccountModal;
