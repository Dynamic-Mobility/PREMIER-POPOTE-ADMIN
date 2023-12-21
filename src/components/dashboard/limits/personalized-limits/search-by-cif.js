import {useFormik} from "formik";
import {LoadingButton} from "@mui/lab";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import {Search} from "@mui/icons-material";
import MKBox from "../../../@mui-components/box";
import SearchLottie from "../../../lottie-files/search-lottie";
import MKTypography from "../../../@mui-components/typography";
import {customersApis} from "../../../../api-requests/customers-api";
import {toast} from "react-toastify";
import {useAuth} from "../../../../hooks/use-auth";

const SearchByCif = props => {
    const { onFoundCustomer } = props;
    const authUser = useAuth();
    const formik = useFormik({
        initialValues:{
            cif: '',
        },
        onSubmit: async (values, helpers) => {
            try{
                const res = await customersApis.fetchCustomerCif(authUser, values.cif);
                if (res?.cif_no !== ''){
                    if (res?.custExist){
                        onFoundCustomer(res);
                        toast.success("Customer Found!");
                    }
                    else{
                        toast.error("Customer not yet registered for Mobile Banking!");
                    }
                }
                else{
                    toast.error(res?.errorMessage ?? "Oops! An error occurred. Try again");
                }
            }
            catch (e) {
                toast.error(e.message);
            }
        }
    })
    return(
        <>
            <SearchLottie/>
            <MKTypography align={'center'} variant={'h6'} gutterBottom>
                {"Search Customer By A/C No"}
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