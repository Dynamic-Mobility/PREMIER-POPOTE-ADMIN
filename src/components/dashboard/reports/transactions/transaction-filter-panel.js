import {useDispatch, useSelector} from "../../../../store";
import {resetFilters, setActivePage, setFilters} from "../../../../slices/dashboard/transactions/all";
import MKButton from "../../../@mui-components/button";
import {Search} from "@mui/icons-material";
import {Checkbox, Chip, FormControlLabel, Popover} from "@mui/material";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import Grid from "@mui/material/Grid";
import {LoadingButton} from "@mui/lab";
import React, {useCallback, useEffect, useState} from "react";
import Autocomplete from "@mui/material/Autocomplete";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import {getTransactionTypes} from "../../../../slices/dashboard/settings";
import {useAuth} from "../../../../hooks/use-auth";
import {CHANNEL_TYPES} from "../../../../utils/constants";
import {getAutoCompleteValue} from "../../../../utils/helper-functions";
import {getAutocompleteMultipleValues} from "../../../../utils/fileHelper";
import {DateTimePicker} from "@mui/x-date-pickers";

const TransactionFilterPanel = props => {
    const {
        onFilter,
        setFilters,
        setActivePage,
        onResetFilters,
        filters,
        pageSize,
    } = props;
    const dispatch = useDispatch();
    const { transactionTypes } = useSelector(({ settings }) => settings );

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const authUser = useAuth();

    const handleOnReset = () => {
        onResetFilters();
    }
    const handleOnFilterChange = (name, value) => {
       setFilters({
            ...filters,
            [name]: value,
        })
    }

    const handleOnSearch = async e => {
        e.preventDefault();
        await onFilter(filters, pageSize, 1);
        setActivePage(1);
    }

    const handleOnStartDate = value => {
        if (filters.endDate === null || filters.endDate < value){
            handleOnFilterChange('startDate', value);
            handleOnFilterChange('endDate', value);
            return
        }
        handleOnFilterChange('startDate', value);;
    }
    const handleOnEndDate = value => {
        // console.log(value);
        if (filters.startDate  === null || filters.startDate > value){
            handleOnFilterChange('startDate', value);
            handleOnFilterChange('endDate', value);
            return
        }
        handleOnFilterChange('endDate', value);
    }

    const handleOnTransactionTypes = (values) => {
        let types = [];
        values.map(val => types.push(val?.slug));
        handleOnFilterChange("txnType", types);
    }


    const fetchTransactionTypes = useCallback(async () => {
        await dispatch(getTransactionTypes(authUser));
    },[]);

    useEffect(() => {
        fetchTransactionTypes();
    },[])

    return (
        <>
            <MKButton
                aria-describedby={id}
                onClick={handleClick}
                color={'primary'}
                variant={'outlined'}
                startIcon={<Search />}
            >
                Search
            </MKButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
            >
                <form onSubmit={handleOnSearch}>
                    <MKBox sx={{ width: '500px', p: 2, minHeight: '100px' }}>
                        <MKTypography variant={'h6'} gutterBottom>Search Panel</MKTypography>
                        <Grid container spacing={1} alignItems={'center'}>
                            <Grid item xs={12} md={12}>
                                <Autocomplete
                                    options={transactionTypes}
                                    autoHighlight
                                    onChange={(e, values) => handleOnTransactionTypes(values)}
                                    multiple
                                    value={getAutocompleteMultipleValues(filters?.txnType,transactionTypes, "slug")}
                                    getOptionLabel={(option) => option?.name?.toUpperCase()}
                                    renderInput={(params) => (
                                        <DMTTextInput
                                            {...params}
                                            label={'Transaction Types'}
                                            fullWidth={true}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'off', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DateTimePicker
                                    disableFuture
                                    label="Start Date"
                                    required
                                    inputFormat="dd-MMM-yyyy hh:mm a"
                                    fullWidth
                                    value={filters.startDate}
                                    onChange={handleOnStartDate}
                                    renderInput={(params) => <DMTTextInput {...params} />}
                                />
                                {/*<DMTDatePicker*/}
                                {/*    label={'Start Date'}*/}
                                {/*    fullWidth*/}
                                {/*    type={'search'}*/}
                                {/*    inputFormat="dd-MMM-yyyy"*/}
                                {/*    disableFuture = {true}*/}
                                {/*    name={''}*/}
                                {/*    value={filters.startDate}*/}
                                {/*    onChange={handleOnStartDate}*/}
                                {/*/>*/}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DateTimePicker
                                    disableFuture
                                    label="End Date"
                                    required
                                    inputFormat="dd-MMM-yyyy hh:mm a"
                                    fullWidth
                                    value={filters.endDate}
                                    onChange={handleOnEndDate}
                                    renderInput={(params) => <DMTTextInput {...params} />}
                                    />
                                {/*<DMTDatePicker*/}
                                {/*    label={'End Date'}*/}
                                {/*    type={'search'}*/}
                                {/*    inputFormat="dd-MMM-yyyy"*/}
                                {/*    fullWidth*/}
                                {/*    disableFuture = {true}*/}
                                {/*    name={'endDate'}*/}
                                {/*    value={filters.endDate}*/}
                                {/*    onChange={handleOnEndDate}*/}
                                {/*/>*/}
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Autocomplete
                                    options={CHANNEL_TYPES}
                                    autoHighlight
                                    onChange={(e, values) => handleOnFilterChange('channel', values?.value)}
                                    //multiple
                                    value={getAutoCompleteValue(CHANNEL_TYPES, filters?.channel,"value" )}
                                    getOptionLabel={(option) => option?.label}
                                    renderInput={(params) => (
                                        <DMTTextInput
                                            {...params}
                                            label={'Channels'}
                                            placeholder={'-- All Channels --'}
                                            fullWidth={true}
                                            inputProps={{
                                                ...params.inputProps,
                                                autoComplete: 'off', // disable autocomplete and autofill
                                            }}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12} md={12}>
                                <DMTTextInput
                                    label={'Amount'}
                                    type={'search'}
                                    helperText={'To get amount range separate with "," e.g 1000,5000'}
                                    value={filters.amount}
                                    onChange={e => handleOnFilterChange('amount', e.target.value)}
                                    fullWidth={true}
                                    inputProps={{
                                        autoComplete: 'off', // disable autocomplete and autofill
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Mobile No'}
                                    type={'search'}
                                    value={filters.mobileNo}
                                    onChange={e => handleOnFilterChange('mobileNo', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Account From'}
                                    type={'search'}
                                    value={filters.accountFrom}
                                    onChange={e => handleOnFilterChange('accountFrom', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <FormControlLabel
                                    label="Processed Transactions"
                                    control={
                                        <Checkbox
                                            checked={filters.isProcessed}
                                            onChange={e => handleOnFilterChange('isProcessed', e.target.checked)}
                                        />
                                    }
                                />
                            </Grid>

                        </Grid>
                        <MKBox sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <MKButton type={'reset'} onClick={handleOnReset} variant={'text'} color={'primary'}>
                                Reset
                            </MKButton>
                            <LoadingButton
                                type={'submit'}
                                size={'small'}
                               // loading={isLoading}
                                variant={'contained'}
                                color={'primary'}
                                startIcon={<Search />}
                                loadingPosition="start"
                            >
                               Search
                            </LoadingButton>
                        </MKBox>
                    </MKBox>
                </form>
            </Popover>
        </>
    )
}

export default TransactionFilterPanel;