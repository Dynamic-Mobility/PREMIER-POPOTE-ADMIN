import {useFormik} from "formik";
import {Collapse, Grid} from "@mui/material";
import ChargesType from "./charges-type";
import {CHARGES, CHARGES_TYPES} from "../../../../utils/constants";
import DMTCurrencyInput from "../../../@dmt-components/form/currency-input";
import React, {useState} from "react";
import ChargeRange from "./charge-range";

const ChargesForm  = props => {
    const { charge } = props;
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
            </form>
        </>
    )
}

const chargesType = {}

export default ChargesForm;