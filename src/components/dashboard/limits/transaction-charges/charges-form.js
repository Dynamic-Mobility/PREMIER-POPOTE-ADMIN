import {useFormik} from "formik";
import {Collapse, Grid} from "@mui/material";
import ChargesType from "./charges-type";
import {CHARGES, CHARGES_TYPES} from "../../../../utils/constants";
import DMTCurrencyInput from "../../../@dmt-components/form/currency-input";
import React, {useState} from "react";
import ChargeRange from "./charge-range";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import {LoaderIcon} from "react-hot-toast";

const ChargesForm  = props => {
    const { charge, onClose } = props;
    const [isEditable, setIsEditable] = useState(false);
    const formik = useFormik({
        initialValues: {
            chargeType: CHARGES_TYPES[0].value,
            amount: "",
            percentage: "",
            amountRange: [
                {
                    id: null,
                    minValue: '',
                    maxValue: '',
                    charge: '',
                }
            ],
        },
        onSubmit: async (values, helpers) => {

        }
    });
    const wrapperClass = !isEditable ? "wrapper-disabled" : "";
    const pointerClass =  !isEditable ? "disabled-field" : "";

    const handleOnEdit = () => {
        setIsEditable(true);
    }


    return (
        <>
            <form onSubmit={formik.submitForm}>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={12}>
                        <ChargesType
                            value={formik.values.chargeType}
                            onChange={value => formik.setFieldValue('chargeType', value)}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                        <Collapse in={formik.values.chargeType === CHARGES.FLAT}>
                            {formik.values.chargeType === CHARGES.FLAT &&
                                (
                                    <>
                                        <DMTCurrencyInput
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