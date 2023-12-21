import MKButton from "../@mui-components/button";
import ExpandMore from "@mui/icons-material/ExpandMore";
import {REPORT_TYPES_OPTS} from "../../utils/constants";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import {Collapse, Icon} from "@mui/material";
import {useState} from "react";
import MKTypography from "../@mui-components/typography";
import useDownloader from "react-use-downloader";

const ExportButtonMenu = props => {
    const { onExport } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [isLoading, setIsLoading] = useState(false);

    const { download } = useDownloader();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOnDownload = async (reportType) => {
        setIsLoading(true);
        try{
            const res = await onExport(reportType);
            if (res?.data){
                await download(`${res?.data?.data}`, `${res?.data?.name}`)
            }
            handleClose();

        }
        catch (e) {
            console.log(e.message);
        }
        setIsLoading(false);
    }



    return(
        <>
            <MKButton
                variant={'contained'}
                color={'primary'}
                endIcon={ <ExpandMore/>}
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
            >
                {"Export"}
            </MKButton>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                {REPORT_TYPES_OPTS.map((opt) => (
                    <MenuItem key={opt.id} onClick={ e => handleOnDownload(opt.value)}>
                       {opt.icon} {" "} {opt.name}
                    </MenuItem>
                ))}
                <Collapse in={isLoading}>
                    <MKTypography variant={'caption'} sx={{ px:2}}>
                        {"Downloading..."}
                    </MKTypography>
                </Collapse>
            </Menu>
        </>
    )
}

export default ExportButtonMenu;