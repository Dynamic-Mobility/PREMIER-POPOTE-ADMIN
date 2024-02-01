import React from "react";
import { Column } from "devextreme-react/data-grid";
import DMTDatagrid from "../../../@dmt-components/data-grid";
import {formatDate} from "../../../../utils/helper-functions";

const FailedRegistrationsDatagrid = (props) => {
  const { data } = props;
  const actionFormatDate = ({ displayValue }) => {
      if (!displayValue){
          return "-";
      }
      return formatDate(displayValue, 'DD MMM YYYY,  hh:m a');
  }
  return (
      <>
        <DMTDatagrid
            data={data}
        >
          <Column minWidth={120} cellRender={actionFormatDate} dataField="createdDate" caption="Date" format={'datetime'} />
          <Column minWidth={120} dataField="idNumber" caption="ID No" />
          <Column minWidth={120} dataField="accountNumber" caption="A/C No" />
          <Column minWidth={180} dataField="phoneNumber" caption="Phone Number" />
          <Column
              dataField="responseMessage"
              caption="Message"
              minWidth={200}
              allowFiltering={false}
          />

        </DMTDatagrid>
      </>
  );
};

export default FailedRegistrationsDatagrid;
