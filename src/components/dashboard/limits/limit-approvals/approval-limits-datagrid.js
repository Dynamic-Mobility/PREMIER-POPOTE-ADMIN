import DMTDatagrid from "../../../@dmt-components/data-grid";
import React from "react";
import { Column } from "devextreme-react/data-grid";
import DMTChip from "../../../@dmt-components/chip";
import ApprovalLimitsActions from "./approval-limits-actions";

const ApprovalLimitsDatagrid = props => {
    const { data, onRefresh, edited } = props;

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

    const actionOptions = ({ data }) => {
        return <ApprovalLimitsActions edited={edited} limit={data} onRefresh={onRefresh}/>
    }


    return (
        <>
            <DMTDatagrid
                data={data}
            >
                <Column minWidth={150} dataField="name" caption="Transaction Type" />
                <Column minWidth={120} dataField="limitType" caption="Limit Type" />
                <Column minWidth={180} dataField="dailyAmtLimit" caption="Daily Limit" cellRender={actionAmount} format={'raw'} />
                <Column minWidth={180} dataField="transactionAmtLimit" caption="Transaction Limit" cellRender={actionAmount} format={'raw'} />
                <Column minWidth={250} dataField="accountName" caption="A/C Name" />
                <Column minWidth={150} dataField="accountNumber" caption="A/C No" />
                <Column
                    dataField="startDate"
                    caption="Start Date"
                    visible={false}
                    minWidth={200}
                    allowFiltering={false}
                />
                <Column
                    dataField="endDate"
                    caption="End Date"
                    visible={false}
                    minWidth={200}
                    allowFiltering={false}
                />
                <Column
                    caption="Actions"
                    minWidth={150}
                    alignment={"center"}
                    allowFiltering={false}
                    cellRender={actionOptions}
                />
            </DMTDatagrid>
        </>
    )
}

export default ApprovalLimitsDatagrid;