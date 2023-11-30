import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Column, Item, SearchPanel, Toolbar } from "devextreme-react/data-grid";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../../hooks/use-auth";
import DoneIcon from "@mui/icons-material/Done";

// import PermissionsForm from "./permissions-form";
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
    router.push("/dashboard/api-users", { query: { state: data } });
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
          <DoneIcon
            sx={{ color: "#002E5E", fontSize: "20px", fontWeight: "bold" }}
          />
        </MenuItem>
      </Menu>
    </div>
  );
};

const SystemUsersDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const [open, setOpen] = React.useState(false);
  //   const { users } = useSelector(({ users }) => users)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const actionLink = ({ data, rowIndex }) => {
    return (
      <div>
        <DoneIcon
          sx={{ cursor: "pointer", color: "#002E5E", fontSize: "80px" }}
        />
      </div>
    );
  };

  return (
    <>
      <DataGrid
        dataSource={[]}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        // height={"70vh"}
      >
        <Column dataField="name" caption="Name" />
        <Column dataField="profile_name" caption="Profile Name" />
        <Column dataField="phoneNumber" caption="Phone Number" />
        <Column
          dataField="email"
          caption="email"
          width={200}
          allowFiltering={false}
        />
        <Column
          dataField="status"
          caption="Status"
          width={200}
          allowFiltering={false}
        />
      </DataGrid>
    </>
  );
};

export default SystemUsersDataGrid;
