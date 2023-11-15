import {Autocomplete} from "@mui/material";
import DMTTextInput from "./text-input";
import {getAutoCompleteValue} from "../../../utils/helper-functions";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../hooks/use-auth";
import {useDispatch, useSelector} from "../../../store";
import {getAllRoles} from "../../../slices/dashboard/roles";


const DMTRoles = props => {
    const { onChange, label, value, required=false, error, helperText, onBlur, size } = props;
    const { roles } = useSelector(({ roles }) => roles);
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

    const getRoles = useCallback(async () => {
        setIsLoading(true)
        try {
            await dispatch(getAllRoles(authUser));
        }
        catch (e) {
            console.log(e.message)
        }
        finally {
            setIsLoading(false);
        }
    }, [])

    useEffect(() => {
        getRoles()
    },[])


    return (
        <>
            <Autocomplete
                loading={isLoading}
                options={roles}
                autoHighlight
                onChange={handleOnChange}
                value={getAutoCompleteValue(roles, value, 'id')}
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

export default DMTRoles;