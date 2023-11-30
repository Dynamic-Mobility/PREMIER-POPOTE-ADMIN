import React, { memo} from 'react';
import { ButtonGroup} from '@mui/material';
import MKButton from '../../../@mui-components/button';
import CustomerFilterPanel from "./customer-filter-panel";

const CustomerActionButtons = (props) => {
    const { filters, onChangeFilters, onResetFilters, onSearch } = props;
    return (
        <>
            <ButtonGroup color={'primary'} aria-label="action buttons">
                <MKButton disabled={true} variant={'contained'} color={'primary'}>
                    {"Export"}
                </MKButton>
               <CustomerFilterPanel {...{filters, onChangeFilters, onResetFilters, onSearch}} />
            </ButtonGroup>
        </>
    );
};

export default memo(CustomerActionButtons);
