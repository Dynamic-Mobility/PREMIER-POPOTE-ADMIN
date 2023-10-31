import {Icon, ToggleButton, ToggleButtonGroup} from "@mui/material";
import {CHARGES_TYPES} from "../../../../utils/constants";
import MKTypography from "../../../@mui-components/typography";

const ChargesType = props => {
    const { value, onChange } = props;
    const types = CHARGES_TYPES;

    const handleChange = (event, type) => {
        onChange(type);
    };


    return (
        <>
            <MKTypography>
                {"Choose charge type: "}
            </MKTypography>
            <ToggleButtonGroup
                color="success"
                value={value}
                exclusive
                onChange={handleChange}
                aria-label="ChargesType"
            >
                { types.map((type, index) => (
                    <ToggleButton  key={index} value={type.value}>
                        <Icon size={'large'}>
                            {type.icon}
                        </Icon>
                        {type.name}
                    </ToggleButton>
                ))}
            </ToggleButtonGroup>
        </>

    )
}

export default ChargesType;