import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {getAutoCompleteValue} from "../../../utils/helper-functions";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../hooks/use-auth";
import {useDispatch, useSelector} from "../../../store";
import {getAllDepartments} from "../../../slices/dashboard/utils";


const DMTDepartments = props => {
    const { onChange, label, value, required=false, error, helperText, onBlur, size } = props;
    const { departments } = useSelector(({ utils }) => utils);
    const dispatch = useDispatch();

    const [isLoading, setIsLoading] = useState(false);
    const authUser = useAuth();

    const handleOnChange = (event, value) => {
        if (value){
            onChange(value);
        }else{
            onChange(null);
        }
    }

    const getDepartments = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(getAllDepartments(authUser));
        }
        catch (e) {
            console.log(e.message)
        }
        finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        getDepartments()
    },[])


    return (
        <>
            <Autocomplete
                loading={isLoading}
                options={departments}
                autoHighlight
                onChange={handleOnChange}
                value={getAutoCompleteValue(departments, value, 'id')}
                getOptionLabel={(option) => option?.name}
                renderInput={(params) => (
                    <DMTTextInput
                        {...params}
                        label={label}
                        required={required}
                        error={error}
                        onBlur={onBlur}
                        size={size}
                        helperText={helperText}
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

export default DMTDepartments;