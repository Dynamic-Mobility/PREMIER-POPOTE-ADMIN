import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Column, Item, SearchPanel, Toolbar } from "devextreme-react/data-grid";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useRouter } from "next/router";
import MKBox from "../../@mui-components/box";
import { Add } from "@mui/icons-material";
import MKButton from "../../@mui-components/button";
import { getAllUsers } from "../../../slices/dashboard/users";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
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

const RegistrationsDatagrid = (props) => {
  const { data, handleOnAdd } = props;
  const [open, setOpen] = React.useState(false);
  //   const { users } = useSelector(({ users }) => users)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //   users dummy data
  const users = [
    {
      name: "Marcos Ochieng",
      profile_name: "Marcos",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
    {
      name: "Derrick Ochieng",
      profile_name: "Marcos",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
    {
      name: "Jane Ochieng",
      profile_name: "Marcos",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
    {
      name: "Ann Ochieng",
      profile_name: "Marcos",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
  ];

  const actionLink = ({ data, rowIndex }) => {
    return (
      <div>
        <DoneIcon
          sx={{ cursor: "pointer", color: "#002E5E",fontSize:"80px"}}
        />
      </div>
    );
  };

  return (
    <>
      <DataGrid
        dataSource={users}
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
          caption="Email"
          width={200}
          allowFiltering={false}
        />
        <Column
          caption="Approve"
          width={180}
          alignment={"center"}
          allowFiltering={false}
          cellRender={actionLink}
        />
      </DataGrid>
    </>
  );
};

export default RegistrationsDatagrid;
