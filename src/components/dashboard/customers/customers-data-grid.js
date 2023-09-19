import React from "react";
import dynamic from "next/dynamic";
import { Column } from "devextreme-react/data-grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useRouter } from "next/router";
import MKBox from "../../@mui-components/box";
import MKButton from "../../@mui-components/button";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

export const MenuDots = ({ data }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRedirect = (data) => {
    router.push("/popote/customers/add-new-customer", { query: { state: data } });
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
        <MenuItem onClick={() => handleRedirect(data)} sx={{ py: 1 }}>
            <EditIcon sx={{ color: "#002E5E", fontSize: "20px" }} />
        </MenuItem>
        <MenuItem onClick={() => handleRedirect(data)} sx={{ py: 1 }}>
          <RemoveRedEyeIcon sx={{ color: "#002E5E", fontSize: "20px" }} />
        </MenuItem>
      </Menu>
    </div>
  );
};

const CustomersDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const actionLink = ({ data, rowIndex }) => {
    return (
      <div>
        <MenuDots />
      </div>
    );
  };

  return (
    <>
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
          minWidth={150}
          alignment={"center"}
          allowFiltering={false}
          cellRender={actionLink}
        />
      </DataGrid>
    </>
  );
};

export default CustomersDataGrid;
