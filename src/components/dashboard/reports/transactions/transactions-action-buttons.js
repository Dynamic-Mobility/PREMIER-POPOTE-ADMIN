import React, { memo} from 'react';
import { ButtonGroup} from '@mui/material';
import TransactionFilterPanel from "./transaction-filter-panel";
import MKButton from "../../../@mui-components/button";

const TransactionsActionButtons = (props) => {
    const { onFilter } = props;
    return (
        <>
            <ButtonGroup color={'primary'} aria-label="action buttons">
                <MKButton variant={'contained'} color={'primary'}>
                    {"Export"}
                </MKButton>
               <TransactionFilterPanel onFilter={onFilter}/>
            </ButtonGroup>
        </>
    );
};

export default memo(TransactionsActionButtons);
