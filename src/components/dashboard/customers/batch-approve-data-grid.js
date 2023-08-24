import React from "react";
import {Column, HeaderFilter, Item, SearchPanel, Toolbar,DataGrid} from "devextreme-react/data-grid";


const BatchApproveDataGrid = () => {
  return (
    <>
      <DataGrid
        // dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        height={"70vh"}
      >
        <HeaderFilter visible={true} />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="name" caption="Date" width={120} />
        <Column dataField="description" caption="Batch No." width={200} />
        <Column
          caption="Client Name"
          width={200}
        />

        <Column
          caption="A/C No."
          width={200}
        />
        <Column
          caption="Total Amount(KSH)"
          width={200}
        />
        <Column
          caption="Total Records"
          width={200}
        />
        <Column
          caption="Action"
          width={200}
        />
        <Toolbar>
          {/* <Item location="before">
                        <MKButton
                            onClick={handleOnAdd}
                            color={'primary'}
                            variant={'contained'}
                            startIcon={<Add/>}>
                            Add User
                        </MKButton>
                    </Item> */}
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
    </>
  );
};

export default BatchApproveDataGrid;
