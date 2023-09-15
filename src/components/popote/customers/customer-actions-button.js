import React, { memo} from 'react';
import { ButtonGroup} from '@mui/material';
import CustomerFilterPanel from './customer-filter-panel';
import MKButton from '../../@mui-components/button';

const TransactionsActionButtons = (props) => {

    return (
        <>
            <ButtonGroup color={'primary'} aria-label="action buttons">
                <MKButton variant={'contained'} color={'primary'}>
                    {"Export"}
                </MKButton>
               <CustomerFilterPanel />
            </ButtonGroup>
        </>
    );
};

export default memo(TransactionsActionButtons);
