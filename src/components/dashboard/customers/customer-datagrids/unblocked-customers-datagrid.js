import React from "react";
import { Column} from "devextreme-react/data-grid";
import { useRouter } from "next/router";
import DMTChip from "../../../@dmt-components/chip";
import MKTypography from "../../../@mui-components/typography";
import DMTDatagrid from "../../../@dmt-components/data-grid";
import UnblockedCustomerApproval from "../customer-approval/unblocked-customer-approval";

const UnblockedCustomersDatagrid = (props) => {
  const { data, onRefresh } = props;
  const router = useRouter();
  const actionApproval = ({ data }) => {
      return (
          <UnblockedCustomerApproval onRefresh={onRefresh} customer={data}/>
      )
  }
    const actionDisplay = ({ data }) => {
      const name = data?.firstName+" "+ data?.lastName;
        return (
            <>
                <MKTypography fontWeight={'bold'} fontSize={'inherit'}>
                    {name}
                </MKTypography>
            </>
        );
    };

  return (
    <>
     <DMTDatagrid
         data={data}
     >
         <Column  minWidth={200} dataField="name" caption="Name" cellRender={actionDisplay} />
         <Column  minWidth={100} dataField="cif" caption="CIF No" />
         <Column  minWidth={150} dataField="phone" caption="Phone Number" />
         <Column
             dataField="blockDate"
             caption="Block Date"
             minWidth={150}
             allowFiltering={false}
         />
         <Column
             dataField="blockedBy"
             caption="Blocked By"
             minWidth={150}
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

export default UnblockedCustomersDatagrid;
