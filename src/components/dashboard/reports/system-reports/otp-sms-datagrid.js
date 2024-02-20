import React from "react";
import { Column } from "devextreme-react/data-grid";
import DMTDatagrid from "../../../@dmt-components/data-grid";
import {formatDate, toUpperCase} from "../../../../utils/helper-functions";
import DMTChip from "../../../@dmt-components/chip";

const OtpSmsDatagrid = (props) => {
  const { data, isCustomer = false } = props;
  const actionFormatDate = ({ displayValue }) => {
    if (!displayValue){
      return "-";
    }
    return formatDate(displayValue, 'DD MMM YYYY,  hh:m a');
  }

    const actionChannel = ({ displayValue, data }) => {
      if (!displayValue){
          return  "-"
      }
        return (
            <>
                <DMTChip
                    color={'secondary'}
                    label={toUpperCase(displayValue)}
                />
            </>

        );
    }
  return (
      <>
        <DMTDatagrid
            data={data}
        >
          <Column minWidth={120} cellRender={actionFormatDate} dataField="dateInitiated" caption="Date" format={'datetime'} />
          <Column minWidth={120} dataField= {isCustomer ? "customerName" : "adminName"} caption="Name" />
          <Column minWidth={120} dataField="channel" caption="Channel" cellRender={actionChannel} />
          <Column minWidth={180} dataField={isCustomer ? "phone" : "mobileNo"} caption="Phone Number" />
          <Column
              dataField="smsMessage"
              caption="Message"
              minWidth={200}
              allowFiltering={false}
          />
          <Column minWidth={120} cellRender={actionFormatDate} dataField="expiresOn" caption="Expiry Date" format={'datetime'} />
        </DMTDatagrid>
      </>
  );
};

export default OtpSmsDatagrid;
