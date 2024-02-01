import React, { memo} from 'react';
import { ButtonGroup} from '@mui/material';
import AuditTrailFilterPanel from "./audit-trail-filter-panel";
import ExportButtonMenu from "../../../../@dmt-components/export-button-menu";

const AuditTrailActionButtons = (props) => {
    const {
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
               <AuditTrailFilterPanel {...{
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

export default memo(AuditTrailActionButtons);
