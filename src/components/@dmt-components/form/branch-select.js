import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {getAutoCompleteValue} from "../../../utils/helper-functions";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../hooks/use-auth";
import {useDispatch, useSelector} from "../../../store";
import {getAllBranches} from "../../../slices/dashboard/utils";


const DMTBranches = props => {
    const { onChange, label, value, required=false, error, helperText, onBlur, size } = props;
    const { branches } = useSelector(({ utils }) => utils);
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

    const getBranches = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(getAllBranches(authUser));
        }
        catch (e) {
            console.log(e.message)
        }
        finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        getBranches()
    },[])


    return (
        <>
            <Autocomplete
                loading={isLoading}
                options={branches}
                autoHighlight
                onChange={handleOnChange}
                value={getAutoCompleteValue(branches, value, 'id')}
                getOptionLabel={(option) => option?.branchName}
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

export default DMTBranches;