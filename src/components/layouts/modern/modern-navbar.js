import {Toolbar, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import {styled} from "@mui/material/styles";
import {drawerWidth} from "./index";
import MuiAppBar from '@mui/material/AppBar';
import {appDesc, appName} from "../../../utils/constants";
import {AccountButton} from "../dashboard/dashboard-navbar";

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    backgroundColor: theme.palette.primary.main,

    ...(theme.palette.mode === "light"
        ? {
            boxShadow: theme.shadows[3],
        }
        : {
            backgroundColor: theme.palette.background.paper,
            borderBottomColor: theme.palette.divider,
            borderBottomStyle: "solid",
            borderBottomWidth: 1,
            boxShadow: "none",
        }),
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        [theme.breakpoints.up('lg')]: {
            width:  `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
        },
        transition: theme.transitions.create(['margin', 'width'], {
            //easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const ModernNavbar = props => {
    const { open, handleDrawerOpen } = props;

    return(
        <>
            <AppBar position="fixed"   open={open}>
                <Toolbar sx={{ color: 'light.main'}}>
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        color={'inherit'}
                       // sx={{ ml: -10, }}
                    >
                        {open ? <MenuOpenIcon /> : <MenuIcon />}
                    </IconButton>
                    <Typography sx={{ flexGrow: 1 }} color={'inherit'} variant="h6" noWrap component="div">
                        {appName} - {appDesc}
                    </Typography>
                    <AccountButton/>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default ModernNavbar;