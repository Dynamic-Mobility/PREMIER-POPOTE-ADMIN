import {useDispatch, useSelector} from "../../../../store";
import {resetFilters, setFilters} from "../../../../slices/dashboard/transactions";
import MKButton from "../../../@mui-components/button";
import {Search} from "@mui/icons-material";
import {Checkbox, FormControlLabel, Popover, TextField} from "@mui/material";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import Grid from "@mui/material/Grid";
import {LoadingButton} from "@mui/lab";
import React, {useRef, useState} from "react";
import {useRouter} from "next/router";
import Autocomplete from "@mui/material/Autocomplete";
import DMTTextInput from "../../../@dmt-components/form/text-input";
import DMTDatePicker from "../../../@dmt-components/form/datepicker";

const TransactionFilterPanel = () => {
    const dispatch = useDispatch();
    const {
        filters
    } = useSelector(({ allTransactions }) => allTransactions);

    const [anchorEl, setAnchorEl] = useState(null);
    const textFieldRef = useRef(null);

    const router = useRouter();

    const handleOnNavigation = (url) => async e => {
        await router.push(url);
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleOnReset = () => {
        dispatch(resetFilters());
    }
    const handleOnFilterChange = (name, value) => {
        dispatch(setFilters({
            ...filters,
            [name]: value,
        }))
    }

    const handleOnSearch = e => {
        e.preventDefault();
        console.log(filters);
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
                                    options={[]}
                                    autoHighlight
                                    onChange={(e, value) => setFilters({...filters, memberType:  value?.id })}
                                    //multiple
                                    value={filters?.txnType}
                                    getOptionLabel={(option) => option?.name?.toUpperCase()}
                                    renderInput={(params) => (
                                        <DMTTextInput
                                            {...params}
                                            label={'Transaction Types'}
                                            placeholder={'-- All Transactions --'}
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
                                <DMTDatePicker
                                    label={'Start Date'}
                                    fullWidth
                                    inputFormat="dd-MMM-yyyy"
                                    margin={'normal'}
                                    disableFuture = {true}
                                    name={''}
                                    value={filters.startDate}
                                    onChange={handleOnStartDate}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTDatePicker
                                    label={'End Date'}
                                    inputFormat="dd-MMM-yyyy"
                                    fullWidth
                                    disableFuture = {true}
                                    margin={'normal'}
                                    name={'endDate'}
                                    value={filters.endDate}
                                    onChange={handleOnEndDate}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Mobile No'}
                                    value={filters.mobileNo}
                                    onChange={e => handleOnFilterChange('mobileNo', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Ref No'}
                                    value={filters.refNo}
                                    onChange={e => handleOnFilterChange('refNo', e.target.value)}
                                    fullWidth={true}
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