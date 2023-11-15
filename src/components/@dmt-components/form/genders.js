import {getAutoCompleteValue} from "../../../utils/helper-functions";
import DMTTextInput from "./text-input";
import {Autocomplete} from "@mui/material";

const DMTGenders = (props) => {
    const { onChange, label, value, required=false, error, helperText, onBlur, size } = props;
    const genderOptions = [
        {id: 1, value: 'Male', label: 'Male'},
        {id: 2, value: 'Female', label: 'Female'},
    ]

    const handleOnChange = (event, value) => {
        if (value){
            onChange(value);
        }else{
            onChange(null);
        }
    }

    return(
        <>
            <Autocomplete
                options={genderOptions}
                autoHighlight
                onChange={handleOnChange}
                value={getAutoCompleteValue(genderOptions, value, 'value')}
                getOptionLabel={(option) => option?.label}
                renderInput={(params) => (
                    <DMTTextInput
                        {...params}
                        label={label}
                        required={required}
                        error={error}
                        onBlur={onBlur}
                        helperText={helperText}
                        size={size}
                        // margin={'normal'}
                        inputProps={{
                            ...params.inputProps,
                            autoComplete: 'off', // disable autocomplete and autofill

                        }}
                    />
                )}
            />
        </>
    )
}

export default DMTGenders