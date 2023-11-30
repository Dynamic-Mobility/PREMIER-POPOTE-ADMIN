import React, {useState} from "react";
import {
    Column,
    Export,
    HeaderFilter,
    Pager, Paging,
    SearchPanel
} from "devextreme-react/data-grid";
import {ALLOWED_PAGE_SIZES} from "../../../../utils/constants";
import DMTChip from "../../../@dmt-components/chip";
import DMTDatagrid from "../../../@dmt-components/data-grid";
import MKTypography from "../../../@mui-components/typography";
import TransactionDetailsDrawer from "./transaction-details-drawer";

const TransactionDataGrid = props => {
    const {
        data,
        limit,
        activePage,
        onPageSizeChange,
        onPageChange,
        totalRecords
    } = props;

    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const actionAmount = ({ displayValue, data}) => {
        const color =  data?.completed ?  'success' : 'error';
        const handleOnSelect = () => {
            setSelectedTransaction(data);
            setOpenDialog(true);
        }

        return (
            <>
                <DMTChip
                    numeral = {true}
                    label={displayValue}
                    color={color}
                    onClick={handleOnSelect}
                />
            </>
        )
    }

    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const actionLink = ( { displayValue, data}) => {
        const handleOnSelect = () => {
            setSelectedTransaction(data);
            setOpenDialog(true);
        }

        if (!displayValue){
            return '-'
        }
        return (
            <>
                <MKTypography fontSize={"inherit"} sx={{ cursor: 'pointer' }} onClick={handleOnSelect} color={'info'}>
                    {displayValue }
                </MKTypography>
            </>
        )
    }

    const renderValue = ({ displayValue }) => {
        if (!displayValue){
            return '-'
        }
        return displayValue;
    }
    const handlePageChange = (value) => {
        onPageChange(value);
    }

    const handlePageSizeChange = (value) => {
        onPageSizeChange(value);
    }

    return (
        <>
            <DMTDatagrid
                keyExpr="id"
                data={data}
                pageSize = {limit}
                activePage ={ activePage}
                totalRecords ={ totalRecords }
                onChangePage = {handlePageChange}
                onChangeSize={handlePageSizeChange}
            >
                <SearchPanel visible={false} />
                <HeaderFilter visible={true} allowSearch={true} />
                <Column
                    dataField="customerName"
                    minWidth={140}
                    caption="Customer Name"
                    cellRender={actionLink}
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="accountFrom"
                    minWidth={150}
                    caption="Account From"
                    cellRender={actionLink}
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                />
                <Column
                    dataField="accountTo"
                    minWidth={150}
                    caption="Account To"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={actionLink}
                />

                <Column
                    dataField="narration"
                    minWidth={200}
                    caption="Narration"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                    cellRender={renderValue}
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
                    dataField="refence"
                    minWidth={160}
                    caption="Ref No"
                    allowHeaderFiltering={true}
                    allowSearch={true}
                    allowFiltering={true}
                    cellRender={renderValue}
                />
                <Column
                    dataField="currency"
                    minWidth={100}
                    caption="Currency"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={renderValue}
                />
                <Column
                    dataField="channel"
                    minWidth={160}
                    caption="Channel"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={renderValue}
                />
                <Column
                    dataField="phone"
                    minWidth={150}
                    caption="Mobile No"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={renderValue}
                />

                <Column
                    dataField="transactionTypeDesc"
                    minWidth={160}
                    caption="Txn Type"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={renderValue}
                />

                <Column
                    dataField="transactionDate"
                    minWidth={180}
                    caption="Txn Date"
                    allowHeaderFiltering={false}
                    allowSearch={true}
                    allowFiltering={false}
                    cellRender={renderValue}
                />
                <Paging
                    pageIndex={activePage - 1}
                    pageSize={limit}
                    defaultPageSize={ALLOWED_PAGE_SIZES[1]}
                    onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
                    onPageIndexChange={handlePageChange}
                />
                <Pager
                    visible={false}
                    allowedPageSizes={ALLOWED_PAGE_SIZES}
                    showPageSizeSelector={true}
                    showNavigationButtons={true}

                />
                <Export enabled={false} allowExportSelectedData={false} />
            </DMTDatagrid>
            <TransactionDetailsDrawer
                open={openDialog}
                transaction={selectedTransaction}
                onClose={handleOnClose}
            />
        </>
    )
}

export default React.memo(TransactionDataGrid);