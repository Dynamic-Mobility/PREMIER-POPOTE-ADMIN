import MKButton from "../../../@mui-components/button";
import {Search} from "@mui/icons-material";
import {Popover} from "@mui/material";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import Grid from "@mui/material/Grid";
import {LoadingButton} from "@mui/lab";
import React, { useState} from "react";
import DMTTextInput from "../../../@dmt-components/form/text-input";

const CustomerFilterPanel = props => {
    const { filters, onChangeFilters, onResetFilters, onSearch} = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    const handleOnReset = async () => {
        setIsLoading(true);
        await onResetFilters();
        setIsLoading(false);
    }
    const handleOnFilterChange = (name, value) => {
        onChangeFilters({
            ...filters,
            [name]: value,
        })
    }

    const handleOnSearch = async e => {
        e.preventDefault();
        setIsLoading(true);
        try{
            await onSearch();
        }
        catch (e) {
            console.log(e.message);
        }
        finally {
            setIsLoading(false);
        }

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
                                <DMTTextInput
                                    label={'Customer Name'}
                                    value={filters.name}
                                    onChange={e => handleOnFilterChange('name', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput

                                    label={'ID Number'}
                                    type={'number'}
                                    value={filters.idnumber}
                                    onChange={e => handleOnFilterChange('idnumber', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Phone Number'}
                                    value={filters.phonenumber}
                                    onChange={e => handleOnFilterChange('phonenumber', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput

                                    label={'CIF No'}
                                    value={filters.cifNumber}
                                    onChange={e => handleOnFilterChange('cifNumber', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <DMTTextInput
                                    label={'Email'}
                                    type={'email'}
                                    value={filters.email}
                                    onChange={e => handleOnFilterChange('email', e.target.value)}
                                    fullWidth={true}
                                />
                            </Grid>
                        </Grid>
                          <MKBox sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                            <MKButton type={'reset'} disabled={isLoading} onClick={handleOnReset} variant={'text'} color={'primary'}>
                                Reset
                            </MKButton>
                            <LoadingButton
                                type={'submit'}
                                size={'small'}
                                loading={isLoading}
                                variant={'contained'}
                                color={'primary'}
                                startIcon={<Search />}
                                loadingPosition="start"
                            >
                                {isLoading? 'Searching' : 'Search' }
                            </LoadingButton>
                        </MKBox>
                    </MKBox>
                </form>
            </Popover>
        </>
    )
}

export default CustomerFilterPanel;