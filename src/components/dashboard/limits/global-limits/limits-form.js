import {useFormik} from "formik";
import * as Yup from 'yup';
import DMTCurrencyInput from "../../../@dmt-components/form/currency-input";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";

const LimitsForm = props => {
    //TODO: make  api request to update limits
    const { product } = props;
    const formik = useFormik({
        initialValues: {
            dailyLimit: '',
            transactionLimit: '',
        },
        validationSchema: Yup.object().shape({
            dailyLimit: Yup.string().required('Daily Limit is required!'),
            transactionLimit: Yup.string().required('Daily Limit is required!')
        }),
        onSubmit: async () => {
            try {

            }
            catch (e) {

            }
        }
    })
    return (
        <>
            <form onSubmit={formik.submitForm}>
                <DMTCurrencyInput
                    fullWidth
                    margin={'normal'}
                    label={'Daily Limit'}
                    value={formik.values.dailyLimit}
                    onChange={values => formik.setFieldValue('dailyLimit', values?.value)}
                    prefix = ''
                    error={Boolean(formik.touched.dailyLimit && formik.errors.dailyLimit)}
                    onBlur={formik.handleBlur}
                    placeholder={'Enter daily limit'}
                    helperText={formik.touched.dailyLimit && formik.errors.dailyLimit}
                />
                <DMTCurrencyInput
                    fullWidth
                    margin={'normal'}
                    label={'Per Transaction Limit'}
                    value={formik.values.transactionLimit}
                    onChange={values => formik.setFieldValue('transactionLimit', values?.value)}
                    prefix = ''
                    error={Boolean(formik.touched.transactionLimit && formik.errors.transactionLimit)}
                    onBlur={formik.handleBlur}
                    placeholder={'Enter per transaction limit'}
                    helperText={formik.touched.transactionLimit && formik.errors.transactionLimit}
                />
                <MKBox sx={{ display: 'flex', gap:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <MKButton color={'error'} variant={'contained'}>
                        {"Cancel"}
                    </MKButton>
                    <MKButton color={'success'} variant={'contained'}>
                        {"Save"}
                    </MKButton>
                </MKBox>
            </form>
        </>
    )
}


export default LimitsForm;