import {getAutoCompleteValue} from "../../../utils/helper-functions";
import DMTTextInput from "./text-input";
import {Autocomplete} from "@mui/material";

const DMTSalutations = (props) => {
    const { onChange, label, value, required=false, error, helperText, onBlur, size } = props;
    const genderOptions = [
        {id: 1, value: 'Mr', label: 'Mr.'},
        {id: 2, value: 'Mrs', label: 'Mrs.'},
        {id: 3, value: 'Miss', label: 'Miss'},
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

export default DMTSalutations