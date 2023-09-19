import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import MKButton from "../../@mui-components/button";
import { Typography, Box } from "@mui/material";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import InboxIcon from "@mui/icons-material/Inbox";

const LinkAccountModal = (props) => {
  const { cifResponse } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

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
            {cifResponse?.length <= 0 ? <p>No Accounts Available Yet</p> : <p>Available Accounts</p>}
          </Typography>
          <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
            <List component="nav" aria-label="main mailbox folders">
              {cifResponse?.map((item, index) => (
                <ListItemButton
                  key={index}
                  selected={selectedIndex === 0}
                  onClick={(event) => handleListItemClick(event, 0)}
                >
                  <ListItemText
                    primary={item?.account}
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="primary"
                        >
                          Currency Code :
                        </Typography>
                        {item?.currencyCode}
                      </React.Fragment>
                    }
                  />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LinkAccountModal;
