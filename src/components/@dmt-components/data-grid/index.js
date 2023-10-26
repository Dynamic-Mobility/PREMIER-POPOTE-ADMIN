import Watermark from "../../watermark";
import React from "react";
import DataGrid from "devextreme-react/data-grid";

const DMTDatagrid = props => {
    const { children, data, height = "70vh" } = props;

    return (
        <div>
            <Watermark/>
            <DataGrid
                dataSource={data}
                allowColumnReordering={true}
                rowAlternationEnabled={true}
                showBorders={true}
                remoteOperations={true}
                showColumnLines={true}
                showRowLines={true}
                wordWrapEnabled={true}
                height={height}
            >
                {children}
            </DataGrid>
        </div>
    )

}


export default DMTDatagrid;