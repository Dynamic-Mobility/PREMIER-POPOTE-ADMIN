import React from "react";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "@mui/icons-material/Search";
import {useFormik} from "formik";
import {LoaderIcon} from "react-hot-toast";
import MKButton from "../../../@mui-components/button";

const CustomerSearch = props => {
    const { onSearch } = props;
    const formik = useFormik({
        initialValues: {
            cif_number : ""
        },
        onSubmit: async (values, helpers) => {
            try{
                await onSearch(values.cif_number);
            }
            catch (e) {
                console.log(e.message);
                helpers.setSubmitting(false);
            }
        }
    })
    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <DMTTextInput
                    fullWidth
                    maxWidth="sm"
                    size="small"
                    label="Search By CIF"
                    //variant={'outlined'}
                    name="cif_number"
                    value={formik.values.cif_number}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <MKButton
                                    color={'primary'}
                                    endIcon={formik.isSubmitting ? <LoaderIcon /> : <Search />}
                                    size={'small'}
                                    variant={'text'}
                                    type={'submit'}
                                    sx={{textTransform: 'none'}}
                                >
                                    {formik.isSubmitting ?"Searching": "Search"}
                                </MKButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </form>
        </>
    )
}

export default CustomerSearch;