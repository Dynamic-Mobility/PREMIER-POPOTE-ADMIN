import {
  Box,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Popover,
  Typography,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/use-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

import io from "socket.io-client";
import {useMounted} from "../../hooks/use-mounted";
let socket;
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open, ...other } = props;
  const router = useRouter();
  const isMounted = useMounted();
  // To get the user from the authContext, you can use
  const { user, logout } = useAuth();




  const handleLogout = async () => {
    try {
      onClose?.();
      // await handleButtonClick()
      await logout();
      // router.push("/").catch(console.error);
    } catch (err) {
      console.error(err);
      toast.error("Unable to logout.");
    }
  };

  useEffect(() => {
    if (isMounted()){
      socketInitializer();
      return () => {
        socket?.disconnect();
      };
    }

  }, [isMounted])


  const socketInitializer = async () => {
    await fetch('/api/websocket');
    socket = io()

    socket.on('connect', () => {
      console.log('connected')
    })

    socket.on('incoming-message', async msg => {
      const { message } = JSON.parse(msg);
      if (message?.sessionId === user?.sessionId && message?.userId === user?.userid){
        await logout(false);
        toast.success("Oops! You have been logged out!");

      }

    })
  }

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
      keepMounted
      onClose={onClose}
      open={!!open}
      //PaperProps={{ sx: { width: 200 } }}
      transitionDuration={0}
      {...other}
    >
      {/*<Box*/}
      {/*  sx={{*/}
      {/*    alignItems: "center",*/}
      {/*    p: 2,*/}
      {/*    display: "flex",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Avatar*/}
      {/*    src={user?.avatar}*/}
      {/*    sx={{*/}
      {/*      height: 40,*/}
      {/*      width: 40,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <UserCircleIcon />*/}
      {/*  </Avatar>*/}
      {/*  <Box*/}
      {/*    sx={{*/}
      {/*      ml: 1,*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <Typography variant="body1">{user?.fullname}</Typography>*/}
      {/*  </Box>*/}
      {/*</Box>*/}
      {/*<Divider />*/}
      <Box sx={{ my: 1 }}>
        {/*<NextLink href="/dashboard/account" passHref>*/}
        {/*  <MenuItem component="a">*/}
        {/*    <ListItemIcon>*/}
        {/*      <UserCircleIcon fontSize="small" />*/}
        {/*    </ListItemIcon>*/}
        {/*    <ListItemText*/}
        {/*      primary={<Typography variant="body2">Account</Typography>}*/}
        {/*    />*/}
        {/*  </MenuItem>*/}
        {/*</NextLink>*/}
        {/*<Divider />*/}
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={<Typography variant="body2">Logout</Typography>}
          />
        </MenuItem>
      </Box>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool,
};
