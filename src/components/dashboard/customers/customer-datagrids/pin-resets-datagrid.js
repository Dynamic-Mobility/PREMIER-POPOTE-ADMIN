import React from "react";
import { Column} from "devextreme-react/data-grid";
import { useRouter } from "next/router";
import MKTypography from "../../../@mui-components/typography";
import DMTDatagrid from "../../../@dmt-components/data-grid";
import PinResetApproval from "../customer-approval/pin-reset-approval";
import DMTChip from "../../../@dmt-components/chip";

const PinRequestsDatagrid = (props) => {
  const { data, onRefresh } = props;
  const router = useRouter();
  const actionApproval = ({ data }) => {
      return (
          <PinResetApproval onRefresh={onRefresh} customer={data}/>
      )
  }

    const actionDisplay = ({ data, displayValue}) => {
        const handleOnClick= async e => {
            e.preventDefault();
            await router.push({
                pathname: `/dashboard/customers/${data?.id}`,
            })
        }
        return (
            <>
                <MKTypography component={'a'} href={'#'} onClick={handleOnClick} color={'info'} fontWeight={'bold'} fontSize={'inherit'}>
                    {displayValue}
                </MKTypography>
            </>
        );
    };

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
         <Column  minWidth={250} dataField="name" caption="Name" cellRender={actionDisplay} />
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
             dataField="channelType"
             caption="Channel Type"
             minWidth={150}
             allowFiltering={false}
             cellRender={actionChannel}
         />
         <Column
             dataField="pinResetByName"
             caption="Initiated By"
             minWidth={200}
             allowFiltering={false}
         />
         <Column
             dataField="dateInitiated"
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

export default PinRequestsDatagrid;
