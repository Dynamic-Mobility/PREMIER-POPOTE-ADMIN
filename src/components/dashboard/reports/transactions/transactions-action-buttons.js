import React, { memo} from 'react';
import { ButtonGroup} from '@mui/material';
import TransactionFilterPanel from "./transaction-filter-panel";
import ExportButtonMenu from "../../../@dmt-components/export-button-menu";

const TransactionsActionButtons = (props) => {
    const {
        transactionType,
        onFilter,
        onExport,
        setFilters,
        setActivePage,
        onResetFilters,
        filters,
        pageSize,
    } = props;
    return (
        <>
            <ButtonGroup color={'primary'} aria-label="action buttons">
               <ExportButtonMenu onExport={onExport}/>
               <TransactionFilterPanel {...{
                   transactionType,
                   onFilter,
                   setFilters,
                   setActivePage,
                   onResetFilters,
                   filters,
                   pageSize,
               }}/>
            </ButtonGroup>
        </>
    );
};

export default memo(TransactionsActionButtons);
