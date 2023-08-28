import React from "react";
import {
    Column,
    Export,
    HeaderFilter,
    Pager, Paging,
    SearchPanel
} from "devextreme-react/data-grid";
import dynamic from "next/dynamic";
import {ALLOWED_PAGE_SIZES} from "../../../../utils/constants";
import DMTChip from "../../../@dmt-components/chip";
const DataGrid = dynamic(
    () => import('devextreme-react/data-grid'),
    {
        ssr: false,
    }
);


const dummyData = [
    {
        id:1,
        ref_no: 'K204LLBYGRWQ',
        narration: 'MB- Balance inquiry for 85000324516 - Ref K204LLBYGRWQ',
        mobile_no: '254712345678',
        amount: 1000,
        currency: 'KES',
        txn_type: 'MINISTATEMENT',
        dr_account: '85000324516',
        cr_account: '',
        txn_date: 'Aug 15 2023'

    },
    {
        id:2,
        ref_no: 'K204LLBYGRWQ',
        narration: 'MB- Balance inquiry for 85000324516 - Ref K204LLBYGRWQ',
        mobile_no: '254712345678',
        amount: 1000,
        currency: 'KES',
        txn_type: 'MINISTATEMENT',
        dr_account: '85000324516',
        cr_account: '',
        txn_date: 'Aug 15 2023'

    },
    {
        id:3,
        ref_no: 'K204LLBYGRWQ',
        narration: 'MB- Balance inquiry for 85000324516 - Ref K204LLBYGRWQ',
        mobile_no: '254712345678',
        amount: 100000,
        currency: 'KES',
        txn_type: 'MINISTATEMENT',
        dr_account: '85000324516',
        cr_account: '',
        txn_date: 'Aug 15 2023'

    }
]

const TransactionDataGrid = props => {
    const { data,  limit, activePage, onPageSizeChange, onPageChange } = props;
    const actionAmount = ({ displayValue, data}) => {
        const color =  'success';
        return (
            <>
                <DMTChip
                    numeral = {true}
                    label={displayValue}
                    color={color}
                />
            </>
        )
    }
    const handlePageChange = (value) => {
        onPageChange(value);
    }

    const handlePageSizeChange = (value) => {
        onPageSizeChange(value);
    }
    return (
        <>
            <DataGrid
                keyExpr="id"
                dataSource={dummyData}
                showBorders={true}
                remoteOperations={true}
                loadPanel={true}
                height={'78vh'}
                showColumnLines={true}
                showRowLines={true}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
            >
                <SearchPanel visible={false} />
                <HeaderFilter visible={true} allowSearch={true} />
                <Column
                    dataField="mobile_no"
                    minWidth={150}
                    caption="Mobile No"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="ref_no"
                    minWidth={160}
                    caption="Ref No"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="narration"
                    minWidth={200}
                    caption="Narration"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                />
                <Column
                    dataField="amount"
                    minWidth={150}
                    cellRender={actionAmount}
                    caption="Amount"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="currency"
                    minWidth={100}
                    caption="Currency"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="txn_type"
                    minWidth={160}
                    caption="Txn Type"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="dr_account"
                    minWidth={140}
                    caption="Dr Account"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="cr_account"
                    minWidth={140}
                    caption="Cr Account"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="txn_date"
                    minWidth={100}
                    caption="Txn Date"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Paging
                    pageIndex={activePage - 1}
                    pageSize={limit}
                    defaultPageSize={ALLOWED_PAGE_SIZES[1]}
                    onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
                    onPageIndexChange={handlePageChange}
                />
                <Pager
                    visible={true}
                    allowedPageSizes={ALLOWED_PAGE_SIZES}
                    showPageSizeSelector={true}
                    showNavigationButtons={true}

                />
                <Export enabled={false} allowExportSelectedData={false} />
            </DataGrid>
        </>
    )
}

export default React.memo(TransactionDataGrid);