import React from "react";
import dynamic from "next/dynamic";
import { Column } from "devextreme-react/data-grid";
import Watermark from "../../watermark";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import {useRouter} from "next/router";
import MKTypography from "../../@mui-components/typography";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});
const CustomersDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const router = useRouter();
  const actionLink = ({ data, rowIndex }) => {
    const handleOnView = () => {
        router.push({
            pathname: `/dashboard/customers/${data?.id}`,
            // query: {
            //     id: data?.id
            // }
        })
    }
    return (
      <>
        <IconButton color={'info'} onClick={handleOnView}>
            <Visibility color={'info'}/>
        </IconButton>
      </>
    );
  };
    const actionDisplay = ({ data, displayValue}) => {
        const handleOnClick= e => {
            e.preventDefault();
            router.push({
                pathname: `/dashboard/customers/${data?.id}`,
                // pathname: '/dashboard/customers/customer-details',
                // query: {
                //     id: data?.id
                // }
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
    <div>
         <Watermark/>
          <DataGrid
            dataSource={data}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            remoteOperations={true}
            showColumnLines={true}
            showRowLines={true}
            wordWrapEnabled={true}
            height={"70vh"}
          >
            <Column  minWidth={100} dataField="cif" caption="CIF No" />
              <Column cellRender={actionDisplay}  minWidth={250} dataField="name" caption=" Customer Name" />
            <Column  minWidth={200} dataField="customerIdNo" caption="ID No" />
            <Column  minWidth={200} dataField="phoneNumber" caption="Phone Number" />
            <Column
              dataField="email"
              caption="Email"
              minWidth={200}
              allowFiltering={false}
            />
            <Column
              caption="Action"
              minWidth={150}
              alignment={"center"}
              allowFiltering={false}
              cellRender={actionLink}
            />
          </DataGrid>
    </div>
  );
};

export default CustomersDataGrid;
