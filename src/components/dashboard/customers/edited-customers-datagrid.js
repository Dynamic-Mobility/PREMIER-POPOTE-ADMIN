import React from "react";
import dynamic from "next/dynamic";
import { Column } from "devextreme-react/data-grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { MoreHoriz } from "@mui/icons-material";
import ApproveEditedCustomer from "./approve-edited-customer";
import RejectEditedCustomer from "./reject-edited-customer";
import Watermark from "../../watermark";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

export const MenuDots = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <span style={{ fontSize: 20, cursor: "pointer" }}>
        <MoreHoriz onClick={handleClick} />
      </span>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem sx={{ py: 1 }}>
            <ApproveEditedCustomer />
        </MenuItem>
        <MenuItem sx={{ py: 1 }}>
          <RejectEditedCustomer />
        </MenuItem>
      </Menu>
    </div>
  );
};

const EditedCustomersDataGrid = (props) => {
    const { data } = props;
  const actionLink = () => {
    return (
      <div>
        <MenuDots />
      </div>
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
          <Column  minWidth={250} dataField="name" caption="Name" />
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
              width={180}
              alignment={"center"}
              allowFiltering={false}
              cellRender={actionLink}
          />
      </DataGrid>
    </div>
  );
};

export default EditedCustomersDataGrid;
