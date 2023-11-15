import {Column} from "devextreme-react/data-grid";
import DMTDatagrid from "../../@dmt-components/data-grid";
import React from "react";
import DepartmentsActions from "./departments-actions";

const DepartmentsDatagrid = props => {
    const { data, onRefresh } = props;
    const actionOptions = ({ data }) => {
        return (
            <>
                <DepartmentsActions department={data} onRefresh={onRefresh}/>
            </>
        )
    }

    return(
        <>
            <DMTDatagrid
                data={data}
                height={'80vh'}
            >
                <Column minWidth={200} dataField="name" caption="Department Name" />
                <Column minWidth={200} dataField="description" caption="Description" />
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

export default DepartmentsDatagrid;