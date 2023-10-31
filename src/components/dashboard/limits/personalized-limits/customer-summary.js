import {Avatar, ListItem, ListItemAvatar, alpha} from "@mui/material";
import MKTypography from "../../../@mui-components/typography";
import ListItemText from "@mui/material/ListItemText";
import {getInitials} from "../../../../utils/helper-functions";

const CustomerSummary = ({ customer }) => {
    if (!customer){
        return null;
    }
    return (
        <>
            <ListItem sx={{ color: 'primary.contrastText'}}>
                    <ListItemAvatar>
                        <Avatar
                            src={customer?.image}
                            sx={{
                                height: 45,
                                width: 45,
                                backgroundColor: theme => alpha(theme.palette.primary.contrastText, 1),
                                color: 'primary.main',
                            }}
                        >
                            <MKTypography fontWeight={'bold'} variant={'body2'} sx={{ fontSize: '12px'}}>
                                {getInitials(customer?.name)}
                            </MKTypography>
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={customer?.name}
                        secondary={
                            <>
                                <MKTypography
                                    sx={{ display: 'inline', color:'primary.contrastText' }}
                                    variant="body2"
                                >
                                    {"CIF No: "} {customer?.cif_no}
                                </MKTypography>
                            </>
                        }
                    />
            </ListItem>
        </>
    )
}

export default CustomerSummary;