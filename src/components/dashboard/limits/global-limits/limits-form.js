import {useFormik} from "formik";
import * as Yup from 'yup';
import DMTCurrencyInput from "../../../@dmt-components/form/currency-input";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import Grid from "@mui/material/Grid";
import DMTDatePicker from "../../../@dmt-components/form/datepicker";
import React, {useEffect, useState} from "react";
import {Collapse, FormControlLabel, Switch} from "@mui/material";
import {settingsApis} from "../../../../api-requests/settings-apis";
import {useAuth} from "../../../../hooks/use-auth";
import {toast} from "react-toastify";
import {LoaderIcon} from "react-hot-toast";

const LimitsForm = props => {
    //TODO: make  api request to update limits
    const authUser = useAuth();
    const { product, accountId, onClose, existingLimit } = props;
    const [isEditable, setIsEditable] = useState(false);
    const formik = useFormik({
        initialValues: {
            dailyLimit: existingLimit?.dailyAmtLimit ?? '',
            transactionLimit: existingLimit?.transactionAmtLimit ??'',
            startDate: existingLimit?.startDate ??  '',
            endDate:  existingLimit?.endDate ??  '',
            showDate: Boolean(existingLimit?.startDate && existingLimit?.endDate) ?? false,
        },
        validationSchema: Yup.object().shape({
            dailyLimit: Yup.string().required('Daily Limit is required!'),
            transactionLimit: Yup.string().required('Daily Limit is required!'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = {
                    id: existingLimit?.id ?? 0,
                    name: product?.name,
                    dailyAmtLimit: Number(values?.dailyLimit),
                    transactionAmtLimit: Number(values?.transactionLimit),
                    transactionsId: product?.id,
                    accountId: Boolean(accountId) ? accountId : "",
                    startDate:  values?.showDate ? values?.startDate : "",
                    endDate:  values?.showDate ? values?.endDate : "",
                    userId: ""
                }
               const res = await settingsApis.createTransactionLimit(authUser, formData);
                if (res.success){
                    toast.success("Limit set successfully");
                    setIsEditable(false);
                }
                else{
                    toast.error(res?.error ?? "An error occurred while processing request.")
                }

            }
            catch (e) {
                toast.error(e.message ?? "An error occurred while processing request")
            }
        }
    });
    const wrapperClass = !isEditable ? "wrapper-disabled" : "";
    const pointerClass =  !isEditable ? "disabled-field" : "";


    const handleOnEdit = () => {
        setIsEditable(true);
    }


    const handleOnFilterChange = (name, value) => {
        formik.setFieldValue(name, value);
    }

    const handleOnStartDate = value => {
        if (formik.values.endDate === null || formik.values.endDate < value){
            handleOnFilterChange('startDate', value);
            handleOnFilterChange('endDate', value);
            return
        }
        handleOnFilterChange('startDate', value);;
    }
    const handleOnEndDate = value => {
        if (formik.values.startDate  === null || formik.values.startDate > value){
            handleOnFilterChange('startDate', value);
            handleOnFilterChange('endDate', value);
            return
        }
        handleOnFilterChange('endDate', value);
    }

    useEffect(() => {
        if(existingLimit){
            formik.setFieldValue({
                dailyLimit: existingLimit?.dailyAmtLimit ?? '',
                transactionLimit: existingLimit?.transactionAmtLimit ??'',
                startDate: existingLimit?.startDate ??  '',
                endDate:  existingLimit?.endDate ??  '',
                showDate: Boolean(existingLimit?.startDate && existingLimit?.endDate) ?? false,
            })
        }
    },[product, existingLimit])



    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} sx={{ my: 1}}>
                    <Grid className={wrapperClass} item md={12} sm={12} xs={12}>
                        <DMTCurrencyInput
                            fullWidth
                            label={'Daily Limit'}
                            className={pointerClass}
                            value={formik.values.dailyLimit}
                            onChange={values => formik.setFieldValue('dailyLimit', values?.value)}
                            prefix = ''
                            error={Boolean(formik.touched.dailyLimit && formik.errors.dailyLimit)}
                            onBlur={formik.handleBlur}
                            placeholder={'Enter daily limit'}
                            helperText={formik.touched.dailyLimit && formik.errors.dailyLimit}
                        />
                    </Grid>
                    <Grid className={wrapperClass} item md={12} sm={12} xs={12}>
                        <DMTCurrencyInput
                            fullWidth
                            label={'Per Transaction Limit'}
                            value={formik.values.transactionLimit}
                            className={pointerClass}
                            onChange={values => formik.setFieldValue('transactionLimit', values?.value)}
                            prefix = ''
                            error={Boolean(formik.touched.transactionLimit && formik.errors.transactionLimit)}
                            onBlur={formik.handleBlur}
                            placeholder={'Enter per transaction limit'}
                            helperText={formik.touched.transactionLimit && formik.errors.transactionLimit}
                        />
                    </Grid>

                    <Grid className={wrapperClass}  item xs={12} md={12} >
                        <FormControlLabel
                            onChange={e => handleOnFilterChange('showDate', e.target.checked)}
                            checked={formik.values.showDate}
                            className={pointerClass}
                            control={<Switch />}
                            label="Set the date range."
                        />
                    </Grid>
                    <Grid className={wrapperClass} item xs={12} md={6} >
                        <Collapse in={Boolean(formik.values.showDate)}>
                            <DMTDatePicker
                                label={'Start Date'}
                                fullWidth
                                className={pointerClass}
                                inputFormat="dd-MMM-yyyy"
                                name={''}
                                value={formik.values.startDate}
                                onChange={handleOnStartDate}
                            />
                        </Collapse>
                    </Grid>
                    <Grid className={wrapperClass} item xs={12} md={6}>
                        <Collapse in={Boolean(formik.values.showDate)}>
                            <DMTDatePicker
                                label={'End Date'}
                                inputFormat="dd-MMM-yyyy"
                                fullWidth
                                className={pointerClass}
                                name={'endDate'}
                                value={formik.values.endDate}
                                onChange={handleOnEndDate}
                            />
                        </Collapse>
                    </Grid>
                </Grid>
                <Collapse in={Boolean(isEditable)}>
                    <MKBox sx={{ display: 'flex', gap:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <MKButton disabled={formik.isSubmitting} onClick={onClose} color={'error'} variant={'contained'}>
                            {"Cancel"}
                        </MKButton>
                        <MKButton
                            disabled={formik.isSubmitting}
                            type={'submit'}
                            color={'success'}
                            variant={'contained'}
                            startIcon={formik.isSubmitting && <LoaderIcon/>}
                        >
                            {"Save"}
                        </MKButton>
                    </MKBox>
                </Collapse>
                <Collapse in={!Boolean(isEditable)}>
                    <MKBox sx={{ display: 'flex', gap:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                    <MKButton disabled={formik.isSubmitting} onClick={handleOnEdit} color={'primary'} variant={'contained'}>
                        {"Edit Limits"}
                    </MKButton>
                    </MKBox>
                </Collapse>
            </form>
        </>
    )
}


export default LimitsForm;