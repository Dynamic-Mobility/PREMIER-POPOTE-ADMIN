import React from "react";
import { Column} from "devextreme-react/data-grid";
import DMTDatagrid from "../../../@dmt-components/data-grid";
import DMTChip from "../../../@dmt-components/chip";
import ResetSecurityQuestionsApproval from "../customer-approval/reset-security-questions-approval";

const ResetSecurityQuestionsDatagrid = (props) => {
  const { data, onRefresh } = props;
  const actionApproval = ({ data }) => {
      return (
          <ResetSecurityQuestionsApproval onRefresh={onRefresh} customer={data}/>
      )
  }
    const actionChannel = ({ displayValue, data }) => {
        return (
            <>
                <DMTChip
                    color={'secondary'}
                    label={displayValue}
                />
            </>

        );
    }

  return (
    <>
     <DMTDatagrid
         data={data}
     >
         <Column  minWidth={250} dataField="name" caption="Name"/>
         <Column  minWidth={150} dataField="customerIdNo" caption="ID No" />
         <Column  minWidth={150} dataField="phoneNumber" caption="Phone Number" />
         <Column
             dataField="email"
             caption="Email"
             minWidth={200}
             visible={false}
             allowFiltering={false}
         />
         <Column
             dataField="createdBy"
             caption="Initiated By"
             minWidth={200}
             allowFiltering={false}
         />
         <Column
             dataField="createdOn"
             caption="Date"
             minWidth={150}
             format={'datetime'}
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
