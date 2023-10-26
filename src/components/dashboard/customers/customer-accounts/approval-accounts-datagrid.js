import DMTDatagrid from "../../../@dmt-components/data-grid";
import React from "react";
import { Column } from "devextreme-react/data-grid";
import ApproveAccountsModal from "./approve-accounts-modal";

const ApprovalAccountsDatagrid = props => {
    const { data, filters, handleOnChangeFilters, onRefresh } = props;

    const actionLink = ({ data }) => {
        return <ApproveAccountsModal accounts={data?.accounts} onRefresh={onRefresh}/>
    }

    return (
        <>
            <DMTDatagrid
                data={data}
            >
                <Column minWidth={100} dataField="cif" caption="CIF No" />
                <Column minWidth={250} dataField="name" caption=" Customer Name" />
                <Column minWidth={200} dataField="customerIdNo" caption="ID No" />
                <Column minWidth={200} dataField="phoneNumber" caption="Phone Number" />
                <Column
                    dataField="email"
                    caption="Email"
                    visible={false}
                    minWidth={200}
                    allowFiltering={false}
                />
                <Column
                    caption="Action"
                    minWidth={150}
                    alignment={"center"}
                    allowFiltering={false}
                    cellRender={actionLink}
                />
            </DMTDatagrid>
        </>
    )
}

export default ApprovalAccountsDatagrid;