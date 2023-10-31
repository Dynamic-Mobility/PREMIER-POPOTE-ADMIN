import DMTDatagrid from "../../../@dmt-components/data-grid";
import React from "react";
import { Column } from "devextreme-react/data-grid";
import DMTChip from "../../../@dmt-components/chip";
import ApprovalLimitsActions from "./approval-limits-actions";

const ApprovalLimitsDatagrid = props => {
    const { data, onRefresh } = props;

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
        return <ApprovalLimitsActions limit={data} onRefresh={onRefresh}/>
    }


    return (
        <>
            <DMTDatagrid
                data={data}
            >
                <Column minWidth={250} dataField="name" caption="Transaction Type" />
                <Column minWidth={250} dataField="limitType" caption="Limit Type" />
                <Column minWidth={200} dataField="dailyAmtLimit" caption="Daily Limit" cellRender={actionAmount} format={'raw'} />
                <Column minWidth={200} dataField="transactionAmtLimit" caption="Transaction Limit" cellRender={actionAmount} format={'raw'} />
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