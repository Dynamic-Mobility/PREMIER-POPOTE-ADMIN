
import MKButton from "../../../../@mui-components/button";
import {Search} from "@mui/icons-material";
import {Checkbox, FormControlLabel, Popover} from "@mui/material";
import MKBox from "../../../../@mui-components/box";
import MKTypography from "../../../../@mui-components/typography";
import Grid from "@mui/material/Grid";
import {LoadingButton} from "@mui/lab";
import React, {useState} from "react";

import DMTTextInput from "../../../../@dmt-components/form/text-input";



const AuditTrailFilterPanel = props => {
    const {
        onFilter,
        setFilters,
        setActivePage,
        onResetFilters,
        filters,
        pageSize,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

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



    return <>
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
                        <Grid item xs={12} md={6}>
                            <DMTTextInput
                                label={'Start Date'}
                                type={'datetime-local'}
                                value={filters.startDate}
                                onChange={e => handleOnStartDate( e.target.value)}
                                fullWidth={true}
                                inputProps={{
                                    autoComplete: 'off', // disable autocomplete and autofill
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DMTTextInput
                                label={'End Date'}
                                type={'datetime-local'}
                                value={filters.endDate}
                                onChange={e => handleOnEndDate( e.target.value)}
                                fullWidth={true}
                                inputProps={{
                                    autoComplete: 'off', // disable autocomplete and autofill
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <DMTTextInput
                                label={'Username'}
                                type={'search'}
                                value={filters.username}
                                onChange={e => handleOnFilterChange('username', e.target.value)}
                                fullWidth={true}
                                inputProps={{
                                    autoComplete: 'off', // disable autocomplete and autofill
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <DMTTextInput
                                label={'Email'}
                                type={'search'}
                                value={filters.email}
                                onChange={e => handleOnFilterChange('email', e.target.value)}
                                fullWidth={true}
                                inputProps={{
                                    autoComplete: 'off', // disable autocomplete and autofill
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DMTTextInput
                                label={'Department'}
                                type={'search'}
                                value={filters.department}
                                onChange={e => handleOnFilterChange('department', e.target.value)}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <DMTTextInput
                                label={'Branch'}
                                type={'search'}
                                value={filters.branch}
                                onChange={e => handleOnFilterChange('branch', e.target.value)}
                                fullWidth={true}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <FormControlLabel
                                label="Active Users"
                                control={
                                    <Checkbox
                                        checked={filters.active}
                                        onChange={e => handleOnFilterChange('active', e.target.checked)}
                                    />
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                            <FormControlLabel
                                label="Is logged In?"
                                control={
                                    <Checkbox
                                        checked={filters.loggedIn}
                                        onChange={e => handleOnFilterChange('loggedIn', e.target.checked)}
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
    </>;
}

export default AuditTrailFilterPanel;