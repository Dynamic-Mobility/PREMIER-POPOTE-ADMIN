import React from "react";
import { Column } from "devextreme-react/data-grid";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import {useRouter} from "next/router";
import MKTypography from "../../../@mui-components/typography";
import DMTChip from "../../../@dmt-components/chip";
import DMTDatagrid from "../../../@dmt-components/data-grid";

const IncompleteRegistrationsDatagrid = (props) => {
  const { data } = props;
  const router = useRouter();
  const actionLink = ({ data }) => {
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
    const actionChannel = ({ displayValue}) => {
        return (
            <DMTChip
                color={'secondary'}
                label={displayValue}
            />
        );
    }

  return (
    <>
          <DMTDatagrid
            data={data}
          >
            <Column minWidth={100} dataField="cif" caption="CIF No" />
            <Column cellRender={actionDisplay}  minWidth={250} dataField="name" caption=" Customer Name" />
            <Column minWidth={120} dataField="idNumber" caption="ID No" />
            <Column minWidth={120} dataField="accountNo" caption="A/C No" />
            <Column minWidth={180} dataField="phone" caption="Phone Number" />
            <Column
              dataField="email"
              caption="Email"
              minWidth={200}
              allowFiltering={false}
            />
              <Column
              dataField="registrationStatusName"
              caption="Stage"
              minWidth={150}
              allowFiltering={false}
            />
              <Column
                  dataField="registeredPlatform"
                  caption="Channel"
                  minWidth={120}
                  allowFiltering={false}
                  cellRender={actionChannel}
              />
          </DMTDatagrid>
    </>
  );
};

export default IncompleteRegistrationsDatagrid;
