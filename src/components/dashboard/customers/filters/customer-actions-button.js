import React, { memo} from 'react';
import { ButtonGroup} from '@mui/material';
import MKButton from '../../../@mui-components/button';
import CustomerFilterPanel from "./customer-filter-panel";
import ExportButtonMenu from "../../../@dmt-components/export-button-menu";

const CustomerActionButtons = (props) => {
    const { filters, onChangeFilters, onResetFilters, onSearch, onExport } = props;
    return (
        <>
            <ButtonGroup color={'primary'} aria-label="action buttons">
                <ExportButtonMenu onExport={onExport}/>
               <CustomerFilterPanel {...{filters, onChangeFilters, onResetFilters, onSearch}} />
            </ButtonGroup>
        </>
    );
};

export default memo(CustomerActionButtons);
