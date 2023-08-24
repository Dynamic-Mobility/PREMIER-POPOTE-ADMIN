import {Checkbox, Collapse, FormControl, FormControlLabel, Typography} from "@mui/material";
import MKBox from "../../@mui-components/box";
import {useEffect} from "react";
import DMTTextInput from "./text-input";

const checkValue = (value) => {
    return value === 'Yes';
}
const DMTCheckbox = props => {
    const { checked, handleOnChange, label, name, withReason = false, reasonRequired,  reason, ...other} = props;
    

    const handleChange = e => {
        if (e.target.checked){
            handleOnChange('Yes');
        }
        else{
            handleOnChange('No');
        }
    }

    useEffect(() => {
        if (checked === ''){
            handleOnChange('No')
        }
    },[checked])

    return (
        <>
            <MKBox sx={{
                display: 'flex',
                flexDirection: 'column',
                // borderRadius: 1,
                py:1,
                width: '100%',
                px:2,
                color: 'dark.main',
                // backgroundColor: theme => theme.palette.light.main,
                // boxShadow: 5,
            }}>
                <FormControl component="fieldset">
                    <FormControlLabel
                        label={label}
                        control={
                            <Checkbox
                                checked={checkValue(checked)}
                                name={name}
                                onChange={handleChange}
                            />
                        }
                    />
                </FormControl>
                {withReason && (
                    <>
                        <Collapse sx={{ mb: 1}} in={Boolean(checkValue(checked))} unmountOnExit>
                            <Typography>{reason}</Typography>
                            {/* <DMTTextInput
                                fullWidth
                                required={reasonRequired}
                                onChange={handleReasonChange}
                                label={'Additional Info'}
                                placeholder={'Type here...'}
                                minRows={2}
                                multiline
                                value={reason}
                                {...other}
                            /> */}
                        </Collapse>
                    </>
                )}

            </MKBox>

        </>
    )
}

export default DMTCheckbox;