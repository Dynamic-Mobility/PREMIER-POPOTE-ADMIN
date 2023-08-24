import React from "react";
import {
  Column,
  HeaderFilter,
  Item,
  SearchPanel,
  Toolbar,
  DataGrid
} from "devextreme-react/data-grid";

const ApproveCustomerDataGrid = () => {
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
        <Column dataField="name" caption="Account No." />
        <Column dataField="description" caption="Customer Name" />
        <Column
          caption="Currency"
          width={200}
          allowFiltering={true}
        //   cellRender={actionsOptions}
        />
        
        <Column
          caption="Action"
          width={200}
          allowFiltering={false}
        //   cellRender={actionsOptions}
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

export default ApproveCustomerDataGrid;
