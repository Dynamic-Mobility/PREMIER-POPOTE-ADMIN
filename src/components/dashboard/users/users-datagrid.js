import {Column} from "devextreme-react/data-grid";
import DMTDatagrid from "../../@dmt-components/data-grid";
import React from "react";
import UsersActions from "./users-actions";

const UsersDatagrid = props => {
    const { data, onRefresh } = props;
    const actionOptions = ({ data }) => {
        return (
            <>
                <UsersActions branch={data} onRefresh={onRefresh}/>
            </>
        )
    }

    return(
        <>
            <DMTDatagrid
                data={data}
                height={'80vh'}
            >
                <Column minWidth={120} dataField="branchCode" caption="Branch Code" />
                <Column minWidth={200} dataField="branchName" caption="Branch Name" />
                <Column minWidth={220} dataField="branchAddress" caption="Branch Address" />
                <Column minWidth={200} dataField="branchContacts" caption="Contact" />
                {/*<Column minWidth={100} dataField="active" caption="Status" />*/}
                <Column
                    caption="Actions"
                    minWidth={130}
                    alignment={"center"}
                    allowFiltering={false}
                    cellRender={actionOptions}
                />
            </DMTDatagrid>
        </>
    )
}

export default UsersDatagrid;