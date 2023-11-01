import {useFormik} from "formik";
import {Collapse, Grid} from "@mui/material";
import ChargesType from "./charges-type";
import {CHARGES, CHARGES_TYPES} from "../../../../utils/constants";
import DMTCurrencyInput from "../../../@dmt-components/form/currency-input";
import React, {useEffect, useState} from "react";
import ChargeRange from "./charge-range";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import {LoaderIcon} from "react-hot-toast";
import {settingsApis} from "../../../../api-requests/settings-apis";
import {useAuth} from "../../../../hooks/use-auth";
import {getBrowserDetails, getIPAddress} from "../../../../utils/helper-functions";
import {toast} from "react-toastify";

const ChargesForm  = props => {
    const { product, charge, onClose, existingCharge, onRefresh } = props;
    const [isEditable, setIsEditable] = useState(false);
    const authUser = useAuth();
    const formik = useFormik({
        initialValues: {
            chargeType: CHARGES.FLAT,
            amount: "",
            percentage: "",
            amountRange: [
                {
                    id: 0,
                    minValue: '',
                    maxValue: '',
                    charge: '',
                }
            ],
        },
        onSubmit: async (values, helpers) => {
            const ipAddress = await getIPAddress();
            const browser = getBrowserDetails();
            try{
                let formData = [
                    {
                        id: existingCharge?.id ?? 0,
                        name: product?.name ,
                        transactionsId: product?.id,
                        chargeType: values.chargeType,
                        userId: "",
                        ip: ipAddress,
                        browser: browser,
                        charge: values.chargeType === CHARGES.FLAT ? Number(values?.amount) : Number(values?.percentage) ,
                        miniAmt: 0,
                        maxAmt: 0
                    }
                ];
                if (values.chargeType === CHARGES.RANGE){
                    formData = [];
                    values?.amountRange.map((range) => formData.push({
                        id: range?.id ?? 0,
                        name: product?.name ,
                        transactionsId: product?.id,
                        chargeType: values.chargeType,
                        userId: "",
                        ip: ipAddress,
                        browser: browser,
                        charge:  Number(range.charge) ,
                        miniAmt: Number(range.minValue),
                        maxAmt: Number(range.maxValue)
                    }))
                }

                const res = await settingsApis.createTransactionCharge(authUser, formData);
                if (res?.success){
                    toast.success(`${product?.name} charges updated successfully!`);
                    setIsEditable(false);
                    await onRefresh();
                }
                else{
                    toast.error("An error occurred while processing request!")
                }
            }
            catch (e) {
                console.log(e.message)
            }
        }
    });
    const wrapperClass = !isEditable ? "wrapper-disabled" : "";
    const pointerClass =  !isEditable ? "disabled-field" : "";

    const handleOnEdit = () => {
        setIsEditable(true);
    }

    const handleOnClose = () => {
        setIsEditable(false);
        initializeValues(existingCharge);
    }

    const initializeValues = (existingCharge) => {
        let amountRange = [];
        if (existingCharge?.chargeType === CHARGES.RANGE){
             amountRange = existingCharge?.rangeDetails?.map((charge) => {
                return {
                    id: charge?.id,
                    minValue: charge?.miniamt,
                    maxValue: charge?.maxAmt,
                    charge: charge?.charge,
                }
            });
        }

        formik.setValues({
            chargeType: existingCharge?.chargeType,
            amount: existingCharge?.chargeType === CHARGES.FLAT ? existingCharge?.charge : "" ,
            percentage: existingCharge?.chargeType === CHARGES.PERCENTAGE ? existingCharge?.charge : "",
            amountRange: amountRange
        })
    }

    useEffect(() => {
        if(existingCharge){
            initializeValues(existingCharge);
        }
    },[existingCharge]);

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <ChargesType
                            value={formik.values.chargeType}
                            onChange={value => formik.setFieldValue('chargeType', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} className={wrapperClass}>
                        <Collapse in={formik.values.chargeType === CHARGES.FLAT}>
                            {formik.values.chargeType === CHARGES.FLAT &&
                                (
                                    <>
                                        <DMTCurrencyInput
                                            className={pointerClass}
                                            fullWidth
                                            label={'Charge Amount'}
                                            placeholder={'Enter the charge amount'}
                                            value={formik.values.amount}
                                            onChange={values => formik.setFieldValue('amount', values?.value)}
                                            prefix = ''
                                            error={Boolean(formik.touched.amount && formik.errors.amount)}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.amount && formik.errors.amount}
                                        />
                                    </>
                                )
                            }
                        </Collapse>
                        <Collapse in={formik.values.chargeType === CHARGES.PERCENTAGE}>
                            {formik.values.chargeType === CHARGES.PERCENTAGE &&
                                (
                                    <>
                                        <DMTCurrencyInput
                                            fullWidth
                                            className={pointerClass}
                                            label={'Charge In %'}
                                            placeholder={'Enter the charge in percentage'}
                                            value={formik.values.percentage}
                                            onChange={values => formik.setFieldValue('percentage', values?.value)}
                                            prefix = ''
                                            error={Boolean(formik.touched.percentage && formik.errors.percentage)}
                                            onBlur={formik.handleBlur}
                                            helperText={formik.touched.percentage && formik.errors.percentage}
                                        />
                                    </>
                                )
                            }
                        </Collapse>
                        <Collapse in={formik.values.chargeType === CHARGES.RANGE}>
                            {formik.values.chargeType === CHARGES.RANGE &&
                                (
                                    <>
                                        <ChargeRange
                                            isEditable={isEditable}
                                            values={formik.values.amountRange}
                                            onChange={values => formik.setFieldValue('amountRange', values)}
                                        />
                                    </>
                                )
                            }
                        </Collapse>

                    </Grid>
                </Grid>
                <Collapse in={Boolean(isEditable)}>
                    <MKBox sx={{ mt:2, display: 'flex', gap:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <MKButton disabled={formik.isSubmitting} onClick={handleOnClose} color={'error'} variant={'contained'}>
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
                <Collapse  in={!Boolean(isEditable)}>
                    <MKBox sx={{ mt:2, display: 'flex', gap:1, alignItems: 'center', justifyContent: 'flex-end'}}>
                        <MKButton disabled={formik.isSubmitting} onClick={handleOnEdit} color={'primary'} variant={'contained'}>
                            {"Edit Limits"}
                        </MKButton>
                    </MKBox>
                </Collapse>
            </form>
        </>
    )
}

const chargesType = {}

export default ChargesForm;