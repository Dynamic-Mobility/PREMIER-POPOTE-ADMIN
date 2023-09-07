import {Box, Button, ButtonGroup, Divider, Drawer, Typography, useMediaQuery} from "@mui/material";
import {drawerWidth} from "../index";
import {useTheme} from "@mui/styles";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import NextLink from "next/link";
import {Logo} from "../../../logo";
import {Scrollbar} from "../../../@mui-components/scrollbar";
import {useRouter} from "next/router";
import {useTranslation} from "react-i18next";
import {useSelector} from "../../../../store";
import {useEffect, useMemo} from "react";
import {getMenuItems} from "../../../../api-requests/data/menu";
import ModernSidebarSection from "./modern-sidebar-section";
import {Logout, Person, Settings} from "@mui/icons-material";
import MKButton from "../../../@mui-components/button";
import moment from "moment";

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    //padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'center',
}));

const getSections = (t) => getMenuItems(t)
const ModernSidebar = props => {
    const theme = useTheme();
    const {open, handleDrawerClose } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"), {
        noSsr: true,
    });
    const { menus } = useSelector(({ role }) => role);
    const sections = useMemo(() => getSections(t), [t]);
    //const sections = [{child:menus}];

    const handlePathChange = () => {
        if (!router.isReady) {
            return;
        }
    };

    useEffect(
        handlePathChange,
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [router.isReady, router.asPath]
    );
    const content = (
        <>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                }}
            >
                <DrawerHeader>
                    <Box sx={{ p: 1, display:'flex', justifyContent:'center', alignItems: 'center' }}>
                        <NextLink href="/" passHref>
                            <a>
                                <Logo
                                    sx={{
                                        height: 20,
                                        width: 20,
                                    }}
                                />
                            </a>
                        </NextLink>

                    </Box>
                    {/*<IconButton onClick={handleDrawerClose}>*/}
                    {/*    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
                    {/*</IconButton>*/}
                </DrawerHeader>
                <Divider/>
                <Scrollbar
                    sx={{
                        height: "calc(100% - 140px)",
                        "& .simplebar-content": {
                            height: "100%",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                        }}
                    >
                        <Box sx={{ flexGrow: 1 }}>
                            {sections?.map((section,index) => (
                                <ModernSidebarSection
                                    key={index}
                                    path={router.asPath}
                                    sx={{
                                        mt: 2,
                                        "& + &": {
                                            mt: 2,
                                        },
                                    }}
                                    {...section}
                                />
                            ))}
                        </Box>
                        <Divider
                            sx={{
                                borderColor: "neutral.100", // dark divider
                            }}
                        />
                    </Box>
                </Scrollbar>
                <Box sx={{ px:2, backgroundColor:'neutral.100', pb:1, display: 'fixed', width: 'inherit', bottom: 0}}>
                    <Box sx={{ display: 'flex', mt:1, flexDirection: 'column', justifyContent:'center'}}>
                        {/*<ButtonGroup variant={'outlined'} color={'primary'} fullWidth size="small" aria-label="small button group">*/}
                        {/*    <IconButton variant={'outlined'} color={'primary'}>*/}
                        {/*        <Person/>*/}
                        {/*    </IconButton >*/}
                        {/*    <IconButton variant={'outlined'} color={'primary'}>*/}
                        {/*        <Settings/>*/}
                        {/*    </IconButton>*/}
                        {/*    <IconButton variant={'outlined'} color={'primary'}>*/}
                        {/*        <Logout/>*/}
                        {/*    </IconButton>*/}
                        {/*</ButtonGroup>*/}
                        <Typography variant={'caption'} >
                            {'Last Logon: '+ moment().format('DD/MM/YYYY H:m ')}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </>
    );
    return(
        <>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                        //backgroundColor: 'primary.main',
                    },
                }}
                variant={lgUp ? "persistent" : "temporary"}
                anchor="left"
                onClose={!lgUp && handleDrawerClose}
                open={open}
            >
                {content}
            </Drawer>
        </>
    )
}

export default ModernSidebar;