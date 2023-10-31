import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import DMTCurrencyInput from "../../../@dmt-components/form/currency-input";
import React from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import MKButton from "../../../@mui-components/button";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const ChargeRange = props => {
    const { values, onChange } = props;
    const initialValues = {
        id: null,
        minValue: '',
        maxValue: '',
        charge:''
    }

    const handleOnAdd = () => {
        let data = [...values];
        data.push(initialValues);
        data = autoFill(data);
        onChange(data);
    }

    const autoFill = (data) => {
        let updatedData = [...data]
        const size = data.length;
        if (size > 1){
            const previousValue = updatedData[size - 2]
            updatedData[size -1] = {
                ...updatedData,
                minValue: Boolean(previousValue.maxValue) ? (Number(previousValue?.maxValue) + 1) : ""
            }
        }
        return updatedData;
    }

    const handleOnRemove = (index) => {
        let data = [...values];
        data.splice(index, 1);
        onChange(data);
    }

    const handleOnChange = (index) => e => {
        const { name, value} = e;
        let data = [...values];
        data[index] = {...data[index], [name]: value}
        onChange(data);
    }


    return (
        <>
            <TableContainer>
                <Table  size={'small'} sx={{ width: '100%', border: 1, borderColor: 'grey.300'}}>
                    <TableHead sx={{ backgroundColor: 'grey.200'}}>
                        <TableRow>
                            <TableCell sx={{ width: '30%'}}>
                                {"Min Amt"}
                            </TableCell>
                            <TableCell sx={{ width: '30%'}}>
                                {"Max Amt"}
                            </TableCell>
                            <TableCell sx={{ width: '30%'}}>
                                {"Charge Amt"}
                            </TableCell>
                            <TableCell sx={{ width: '10%'}}>
                                {""}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {values.map((value, index) => (
                            <ChargeRangeForm
                                value={value}
                                key={index}
                                onChange={handleOnChange(index)}
                                onRemove = {() => handleOnRemove(index)}
                            />
                        ))}
                        <TableRow>
                            <TableCell colSpan={4} align={'right'}>
                                <MKButton
                                    size={'small'}
                                    color={'primary'}
                                    variant={'text'}
                                    startIcon={<AddCircleIcon/>}
                                    onClick={handleOnAdd}
                                >
                                    {"Add Range"}
                                </MKButton>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

const ChargeRangeForm = props => {
    const { value, onChange, onRemove } = props;

    return (
        <TableRow>
            <TableCell>
                <DMTCurrencyInput
                    fullWidth
                    label={'Min Value'}
                    size={'small'}
                    name={"minValue"}
                    placeholder={'Min Value'}
                    value={value.minValue}
                    onChange={ values => onChange({ name: "minValue", value: values.value})}
                    prefix = ''
                />
            </TableCell>
            <TableCell>
                <DMTCurrencyInput
                    fullWidth
                    label={'Max Value'}
                    placeholder={'Max Value'}
                    value={value.maxValue}
                    name={"maxValue"}
                    size={'small'}
                    onChange={ values => onChange({ name: "maxValue", value: values.value})}
                    prefix = ''
                />
            </TableCell>
            <TableCell>
                <DMTCurrencyInput
                    fullWidth
                    label={'Charge'}
                    placeholder = {'Charge'}
                    value={value.charge}
                    size={'small'}
                    onChange={ values => onChange({ name: "charge", value: values.value})}
                    prefix = ''
                />
            </TableCell>
            <TableCell>
                <IconButton onClick={onRemove} color={'error'}>
                    <DeleteIcon/>
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default ChargeRange;