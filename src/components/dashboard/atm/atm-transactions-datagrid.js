import {Column, HeaderFilter, Pager, Paging} from "devextreme-react/data-grid";
import {ALLOWED_PAGE_LIMITS} from "../../../utils/constants";
import MKButton from "../../@mui-components/button";
import {alpha} from "@mui/material";
import dynamic from "next/dynamic";
import CurrencyFormat from "react-currency-format";
import DMTChip from "../../@dmt-components/chip";
import AtmTransactionDetails from "./atm-transaction-details";
import {useState} from "react";

const DataGrid = dynamic(
    () => import('devextreme-react/data-grid'),
    {
        ssr: false,
    }
);


const AtmTransactionsDatagrid = props => {
    const { data, showFilters = false } = props;

    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleOnClose = () => {
        setOpenDrawer(false);
    }

    const selected = ({ displayValue, data }) => {
        const handleOnSelect = () => {
            setOpenDrawer(true);
            setSelectedTransaction(data);
        }

        return (
            <>
                <MKButton onClick={handleOnSelect} sx={{ fontSize:'inherit'}} variant={'text'} color={'info'}>
                    { displayValue }
                </MKButton>
            </>
        )
    }

    const formatAmount = ({ data, displayValue }) => {
        let color = data.success === 'true' ? 'success' :  'error';
        return (
            <DMTChip
                numeral={true}
                label={displayValue}
                color={color}
                variant={"outlined"}
            />
        )

    }

    return (
        <>
            <DataGrid
                dataSource={data}
                showBorders={true}
                height={'75vh'}
                showColumnLines={true}
                showRowLines={true}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                wordWrapEnabled={true}
                allowColumnResizing={true}
                columnResizingMode="widget"
            >
                <HeaderFilter visible={true} allowSearch={true} />
                <Column dataField="id" key="id" visible={false} />
                <Column cellRender={selected} dataField="affectedAccount" width={180} caption="A/C Affected" />
                <Column dataField="paN02" width={130} caption="Card No" />
                <Column dataField="trxnAmount04" cellRender={formatAmount} width={150} caption="Amount" />
                <Column dataField="cardAcceptorNameLocation43" width={180} caption="Txn Location" />

                <Column dataField="retrievalRefNo37" width={180} caption="Txn Reference" />
                <Column dataField="fromSwitch" alignment="right"
                        dataType="datetime" width={180}
                        format="d/MMM/yyyy HH:mm" />
                <Column dataField="responceCode39" width={150} caption="Response" />
                <Column dataField="ol_error" width={150} caption="Imal Response" />
                <Column dataField="os_err_msg"  caption="Response MSG" width={180} />
                <Paging defaultPageSize={25} />
                <Pager
                    visible={true}
                    allowedPageSizes={ALLOWED_PAGE_LIMITS}
                    showPageSizeSelector={true}
                    showNavigationButtons={true}
                />
            </DataGrid>
            <AtmTransactionDetails {...{
                open: openDrawer,
                onClose: handleOnClose,
                transaction: selectedTransaction
            }}/>

        </>
    );
}

export default AtmTransactionsDatagrid;