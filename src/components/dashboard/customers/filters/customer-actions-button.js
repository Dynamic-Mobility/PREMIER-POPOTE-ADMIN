import React, { memo} from 'react';
import { ButtonGroup} from '@mui/material';
import CustomerFilterPanel from "./customer-filter-panel";
import ExportButtonMenu from "../../../@dmt-components/export-button-menu";

const CustomerActionButtons = (props) => {
    const { filters, onChangeFilters, onResetFilters, onSearch, onExport, hideExport = false } = props;
    return (
        <>
            <ButtonGroup color={'primary'} aria-label="action buttons">
                {Boolean(onExport) && (
                    <ExportButtonMenu onExport={onExport}/>
                )}
               <CustomerFilterPanel {...{filters, onChangeFilters, onResetFilters, onSearch}} />
            </ButtonGroup>
        </>
    );
};

export default memo(CustomerActionButtons);
