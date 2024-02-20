import React from "react";
import {
  Column,
  Export,
  HeaderFilter,
  Pager, Paging,
  SearchPanel
} from "devextreme-react/data-grid";
import {ALLOWED_PAGE_SIZES} from "../../../../../utils/constants";
import DMTDatagrid from "../../../../@dmt-components/data-grid";


const CustomerAuditTrailDatagrid = props => {
  const {
    data,
    limit,
    activePage,
    onPageSizeChange,
    onPageChange,
    totalRecords
  } = props;


  const renderValue = ({ displayValue }) => {
    if (!displayValue){
      return '-'
    }
    return displayValue;
  }
  const handlePageChange = (value) => {
    onPageChange(value);
  }

  const handlePageSizeChange = (value) => {
    onPageSizeChange(value);
  }

  return (
      <>
        <DMTDatagrid
            keyExpr="id"
            data={data}
            pageSize = {limit}
            activePage ={ activePage}
            totalRecords ={ totalRecords }
            onChangePage = {handlePageChange}
            onChangeSize={handlePageSizeChange}
        >
          <SearchPanel visible={false} />
          <HeaderFilter visible={true} allowSearch={true} />
          <Column
              dataField="auditDate"
              minWidth={100}
              caption="Date"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={true}
              cellRender={renderValue}
          />
          <Column
              dataField="userName"
              minWidth={140}
              caption="Username"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={true}
              cellRender={renderValue}
          />
          <Column
              dataField="name"
              minWidth={140}
              caption="Customer Name"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={true}
              cellRender={renderValue}
          />
          <Column
              dataField="action"
              minWidth={100}
              caption="Action Type"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={true}
              cellRender={renderValue}
          />
          {/*<Column*/}
          {/*    dataField="actionType"*/}
          {/*    minWidth={100}*/}
          {/*    caption="Action Description"*/}
          {/*    allowHeaderFiltering={true}*/}
          {/*    allowSearch={true}*/}
          {/*    allowFiltering={true}*/}
          {/*    cellRender={renderValue}*/}
          {/*/>*/}
          <Column
              dataField="responseMessage"
              minWidth={100}
              caption="Response Message"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={true}
              cellRender={renderValue}
          />
          <Column
              dataField="deviceId"
              minWidth={100}
              caption="Device ID"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={true}
              cellRender={renderValue}
          />
          <Column
              dataField="deviceName"
              minWidth={100}
              caption="Device Name"
              allowHeaderFiltering={true}
              allowSearch={true}
              allowFiltering={true}
              cellRender={renderValue}
          />

          <Paging
              pageIndex={activePage - 1}
              pageSize={limit}
              defaultPageSize={ALLOWED_PAGE_SIZES[1]}
              onPageSizeChange={(pageSize) => handlePageSizeChange(pageSize)}
              onPageIndexChange={handlePageChange}
          />
          <Pager
              visible={false}
              allowedPageSizes={ALLOWED_PAGE_SIZES}
              showPageSizeSelector={true}
              showNavigationButtons={true}

          />
          <Export enabled={false} allowExportSelectedData={false} />
        </DMTDatagrid>
      </>
  )
}

export default React.memo(CustomerAuditTrailDatagrid);