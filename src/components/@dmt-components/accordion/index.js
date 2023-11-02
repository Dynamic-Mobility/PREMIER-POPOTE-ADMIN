import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import {Divider, Icon, IconButton} from "@mui/material";
import {ExpandLessOutlined, ExpandMoreOutlined} from "@mui/icons-material";
import {useState} from "react";
import PropTypes from "prop-types";
import Collapse from "@mui/material/Collapse";


const DMTAccordion = props => {
    const { title, content, active, color, link, children,  ...other} = props;
    const [ isOpened, setIsOpened ] = useState(true);

    const handleOnExpand = e => {
        e.preventDefault();
        setIsOpened(!isOpened);
    }
    return (
        <>
            <MKBox {...other}>
                <MKBox  onClick={handleOnExpand}  sx={{
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                }}>
                    <MKTypography  color={color} variant={'inherit'}  sx={{ fontWeight: 'bold'}}>
                        {/*<Icon fontSize={'medium'}>family_restroom</Icon> */}
                        {title}
                    </MKTypography>
                    <IconButton color={color}  onClick={handleOnExpand}>
                        {isOpened ? <ExpandLessOutlined /> : <ExpandMoreOutlined /> }
                    </IconButton>
                </MKBox>
                <Collapse in={isOpened}>
                    {
                        isOpened && (
                            <>
                                { children }
                            </>
                        )
                    }
                </Collapse>

            </MKBox>
        </>

    )
}
DMTAccordion.propTypes = {
    active: PropTypes.bool,
    color: PropTypes.oneOf([
        "primary",
        "secondary",
        "info",
        "success",
        "warning",
        "error",
        "light",
        "dark",
    ]),
    content: PropTypes.any,
    title: PropTypes.string.isRequired,
}
DMTAccordion.defaultProps = {
    color: "primary",
    active: false,
};
export default DMTAccordion;