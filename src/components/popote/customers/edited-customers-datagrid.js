import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Column, Item, SearchPanel, Toolbar } from "devextreme-react/data-grid";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { TextField, Typography } from "@mui/material";
import { MoreHoriz } from "@mui/icons-material";
import { useRouter } from "next/router";
import MKBox from "../../@mui-components/box";
import { Add } from "@mui/icons-material";
import MKButton from "../../@mui-components/button";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import ApproveEditedCustomer from "./approve-edited-customer";
import RejectEditedCustomer from "./reject-edited-customer";

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
  const { data, handleOnAdd } = props;
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
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

  //   filter users based on search query
  const filteredUser = users.filter((user) => {
    return user.name.toLocaleLowerCase().includes(searchQuery.toLowerCase());
  });

  const actionLink = ({ data, rowIndex }) => {
    return (
      <div>
        <MenuDots />
      </div>
    );
  };

  return (
    <>
      <MKBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          my: 1,
        }}
      >
        <form>
          <TextField
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            fullWidth
            label="Search..."
          />
        </form>
      </MKBox>
      <DataGrid
        dataSource={filteredUser}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        remoteOperations={true}
        showColumnLines={true}
        showRowLines={true}
        wordWrapEnabled={true}
        height={"70vh"}
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
          caption="Action"
          width={180}
          alignment={"center"}
          allowFiltering={false}
          cellRender={actionLink}
        />
      </DataGrid>
    </>
  );
};

export default EditedCustomersDataGrid;
