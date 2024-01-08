import React from "react";
import { Column} from "devextreme-react/data-grid";
import DMTDatagrid from "../../../@dmt-components/data-grid";
import ResetSecurityQuestionsApproval from "../customer-approval/reset-security-questions-approval";
import {formatDate} from "../../../../utils/helper-functions";

const ResetSecurityQuestionsDatagrid = (props) => {
  const { data, onRefresh } = props;
  const actionApproval = ({ data }) => {
      return (
          <ResetSecurityQuestionsApproval onRefresh={onRefresh} customer={data}/>
      )
  }


  const actionFormatDate = ({ displayValue }) => {
      return formatDate(displayValue, 'Do MMM YYYY h:mm:ss a')
  }

  return (
    <>
     <DMTDatagrid
         data={data}
     >
         <Column  minWidth={250} dataField="name" caption="Name"/>
         <Column  minWidth={150} dataField="customerIdNo" caption="ID No" />
         <Column  minWidth={150} dataField="phone" caption="Phone Number" />
         <Column
             dataField="createdByName"
             caption="Initiated By"
             minWidth={200}
             allowFiltering={false}
         />
         <Column
             dataField="createdOn"
             caption="Date"
             minWidth={150}
             cellRender={actionFormatDate}
             allowFiltering={false}
         />
         <Column
             caption="Action"
             width={180}
             alignment={"center"}
             allowFiltering={false}
             cellRender={actionApproval}
         />
     </DMTDatagrid>
    </>
  );
};

export default ResetSecurityQuestionsDatagrid;
