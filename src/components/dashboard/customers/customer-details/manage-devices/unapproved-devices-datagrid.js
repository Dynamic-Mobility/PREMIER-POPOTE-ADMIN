import React from "react";
import { Column} from "devextreme-react/data-grid";
import { useRouter } from "next/router";
import MKTypography from "../../../../@mui-components/typography";
import DMTDatagrid from "../../../../@dmt-components/data-grid";
import DeviceApproval from "./device-approval";

const UnapprovedDevicesDatagrid = (props) => {
  const { data, onRefresh } = props;
  const router = useRouter();
  const actionApproval = ({ data }) => {
      return (
          <DeviceApproval onRefresh={onRefresh} device={data}/>
      )
  }

    const actionDisplay = ({ data, displayValue}) => {
        const handleOnClick= async e => {
            e.preventDefault();
            await router.push({
                pathname: `/dashboard/customers/${data?.customerId}`,
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

    // const actionChannel = ({ displayValue, data }) => {
    //     return (
    //         <>
    //             <DMTChip
    //                 color={'secondary'}
    //                 label={displayValue}
    //             />
    //         </>
    //
    //     );
    // }

  return (
    <>
     <DMTDatagrid
         data={data}
     >
         <Column  minWidth={250} dataField="name" caption="Name" cellRender={actionDisplay} />
         <Column  minWidth={150} dataField="customerIdNo" caption="ID No" />
         <Column  minWidth={150} dataField="phone" caption="Phone Number" />
         <Column
             dataField="email"
             caption="Email"
             minWidth={200}
             visible={false}
             allowFiltering={false}
         />
         {/*<Column*/}
         {/*    dataField="channelType"*/}
         {/*    caption="Channel Type"*/}
         {/*    minWidth={150}*/}
         {/*    allowFiltering={false}*/}
         {/*    cellRender={actionChannel}*/}
         {/*/>*/}
         <Column
             dataField="deviceName"
             caption="Device Name"
             minWidth={200}
             allowFiltering={false}
         />
         <Column
             dataField="deviceId"
             caption="Device ID"
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

export default UnapprovedDevicesDatagrid;
