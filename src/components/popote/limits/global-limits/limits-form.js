import {useFormik} from "formik";
import * as Yup from 'yup';
import DMTCurrencyInput from "../../../@dmt-components/form/currency-input";

const LimitsForm = props => {
    //TODO: make  api request to update limits
    const { product } = props;
    const formik = useFormik({
        initialValues: {
            dailyLimit: '',
        },
        validationSchema: Yup.object().shape({
            dailyLimit: Yup.string().required('Limit is required!')
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
                    value={formik.values.dailyLimit}
                    onChange={values => formik.setFieldValue('dailyLimit', values?.value)}
                    prefix = ''
                    error={Boolean(formik.touched.dailyLimit || formik.errors.dailyLimit)}
                    onBlur={formik.handleBlur}
                    placeholder={'Enter amount'}
                    helperText={formik.touched.dailyLimit || formik.errors.dailyLimit}
                    autoFocus={true}
                />
            </form>
        </>
    )
}


export default LimitsForm;