import {useFormik} from "formik";
import {LoadingButton} from "@mui/lab";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import {Search} from "@mui/icons-material";
import MKBox from "../../../@mui-components/box";
import SearchLottie from "../../../lottie-files/search-lottie";
import MKTypography from "../../../@mui-components/typography";

const SearchByCif = props => {
    const { onFoundCustomer } = props;
    const formik = useFormik({
        initialValues:{
            cif: '',
        },
        onSubmit: (values, helpers) => {
            try{
                onFoundCustomer({ id: 1})
                helpers.setSubmitting(false);
            }
            catch (e) {

            }

        }
    })
    return(
        <>
            <SearchLottie/>
            <MKTypography align={'center'} variant={'h6'} gutterBottom>
                {"Search Customer By CIF"}
            </MKTypography>
            <form onSubmit={formik.handleSubmit}>
                <MKBox sx={{ display: 'flex', flexDirection:'column', justifyContent: 'center'}}>
                    <DMTTextInput
                        label={'CIF'}
                        required
                        fullWidth
                        size={'small'}
                        name={'cif'}
                        value={formik.values.cif}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={ Boolean(formik.errors.cif && formik.touched.cif)}
                        helperText={formik.touched.cif && formik.errors.cif}
                    />
                    <LoadingButton
                        loading={formik.isSubmitting}
                        loadingPosition={'start'}
                        type={'submit'}
                        variant={'contained'}
                        sx={{ mt: 2}}
                        color={'primary'}
                        startIcon={<Search/>}
                    >
                        {formik.isSubmitting ? "Searching..." : "Search"}
                    </LoadingButton>
                </MKBox>
            </form>
        </>
    )
}

export default SearchByCif;