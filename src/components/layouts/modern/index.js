import {useState} from "react";
import {styled} from "@mui/material/styles";
import ModernNavbar from "./modern-navbar";
import ModernSidebar from "./modern-sidebar";
import Box from "@mui/material/Box";

export const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        paddingTop: 64,
        width:'100%',
        flexGrow: 1,
        //padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        [theme.breakpoints.up('lg')]:{
            marginLeft:`-${drawerWidth}px`,
        },
        ...(open && {
            [theme.breakpoints.up('lg')]: {
                width: `calc(100% - ${drawerWidth}px)`
            },
            transition: theme.transitions.create('margin', {
                //easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const ModernLayout = props => {
    const { children } = props;
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(prevState => !prevState);
    }
    const handleDrawerClose = () => {
        setOpen(false);
    }

    return(
        <>

            <Box sx={{ display: 'flex' }}>
                <ModernNavbar open={open} handleDrawerOpen={handleDrawerOpen}/>
                <ModernSidebar open={open} handleDrawerClose={handleDrawerClose}/>
                <Main open={open}>
                    {children}
                </Main>
            </Box>
        </>
    )
}

export default ModernLayout;