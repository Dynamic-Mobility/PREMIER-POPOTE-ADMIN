import React from "react";
import {
  Column,
  Item,
  SearchPanel,
  FilterRow,
  HeaderFilter,
  Toolbar,
  DataGrid,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";

const PesaLinkTransactionDatagrid = () => {
  return (
    <>
      <DataGrid
        // dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        showColumnLines={true}
        showRowLines={true}
        height={"70vh"}
      >
        <HeaderFilter visible={true} allowSearch={true} />
        <Grouping autoExpandAll={true} />
        <GroupPanel visible={true} />
        <Column dataField="name" caption="Batch Ref." width={180} />
        <Column dataField="description" caption="Trx Ref." width={180} />
        <Column dataField="description" caption="Amount" width={180} />
        <Column caption="Debtor" alignment="center">
          <Column
            dataField="debtorAccountNumber"
            key="debtorAccountNumber"
            caption="Account No"
            minWidth={120}
            format="fixedPoint"
          />
          <Column
            dataField="debtorSchemeName"
            key="debtorSchemeName"
            caption="Scheme Name"
            minWidth={120}
            format="percent"
          />
          <Column
            dataField="debtorPhoneNumber"
            key="debtorPhoneNumber"
            caption="Phone No"
            minWidth={140}
            format="percent"
          />
        </Column>
        <Column caption="Creditor" alignment="center">
          <Column
            dataField="creditorAccountNumber"
            key="creditorAccountNumber"
            caption="Account No"
            minWidth={140}
            format="fixedPoint"
          />
          <Column
            dataField="creditorSchemeName"
            key="creditorSchemeName"
            caption="Scheme Name"
            minWidth={120}
            format="percent"
          />
          <Column
            dataField="creditorPhoneNumber"
            key="creditorPhoneNumber"
            caption="Phone No"
            minWidth={140}
            format="percent"
          />
          <Column
            dataField="creditorBankCode"
            key="creditorBankCode"
            caption="Bank Code"
            minWidth={120}
            format="percent"
          />
        </Column>
        <Column
          dataField="status"
          key="Status"
          caption="Status"
          minWidth={120}
        />
        <Column
          dataField="channelType"
          key="channelType"
          caption="Channel Type"
          minWidth={120}
        />
        <Column
          dataField="transactionDate"
          key="transactionDate"
          caption="Trx Date"
          dataType="date"
          minWidth={120}
          allowFiltering={false}
        />

        <Toolbar>{/* <Item location="after" name="searchPanel" /> */}</Toolbar>
      </DataGrid>
    </>
  );
};

export default PesaLinkTransactionDatagrid;
