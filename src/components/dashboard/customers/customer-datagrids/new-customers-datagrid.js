import React from "react";
import { Column} from "devextreme-react/data-grid";
import { useRouter } from "next/router";
import DMTChip from "../../../@dmt-components/chip";
import MKTypography from "../../../@mui-components/typography";
import NewCustomerApproval from "../customer-approval/new-customer-approval";
import DMTDatagrid from "../../../@dmt-components/data-grid";

const NewCustomersDatagrid = (props) => {
  const { data, onRefresh } = props;
  const router = useRouter();
  const actionApproval = ({ data }) => {
      return (
          <NewCustomerApproval onRefresh={onRefresh} customer={data}/>
      )
  }
  const actionChannel = ({ displayValue, data }) => {
      if (data?.registeredPlatforms.length > 0){
          return  (
              <>
                  {
                      data?.registeredPlatforms.map(channel => (
                          <>
                              <DMTChip
                                  color={'secondary'}
                                  label={channel}
                              />
                              {" "}
                          </>
                      ))
                  }
              </>

          )
      }
      return displayValue;
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

  return (
    <>
     <DMTDatagrid
         data={data}
     >
         <Column  minWidth={250} dataField="name" caption="Name" cellRender={actionDisplay} />
         <Column  minWidth={200} dataField="customerIdNo" caption="ID No" />
         <Column  minWidth={200} dataField="phoneNumber" caption="Phone Number" />
         <Column
             dataField="email"
             caption="Email"
             minWidth={200}
             allowFiltering={false}
         />
         <Column
             dataField="registeredPlatform"
             caption="Registered Channel(s)"
             minWidth={200}
             allowFiltering={false}
             cellRender={actionChannel}
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

export default NewCustomersDatagrid;
