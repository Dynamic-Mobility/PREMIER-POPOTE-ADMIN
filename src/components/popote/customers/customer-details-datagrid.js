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
import MKTypography from "../../@mui-components/typography";
import LinkAccountModal from "./link-account-modal";

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
    router.push("/popote/customers/add-new-customer", {
      query: { state: data },
    });
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
          <MKTypography>Block Account</MKTypography>
        </MenuItem>
        <MenuItem onClick={() => handleRedirect(data)} sx={{ py: 1 }}>
          <MKTypography>Unlink Account</MKTypography>
        </MenuItem>
      </Menu>
    </div>
  );
};

const CustomerDetailsDataGrid = (props) => {
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
  const accounts = [
    {
      account_number: "0110282332394",
      currency_code: "404",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
    {
      account_number: "0110292392391",
      currency_code: "404",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
    {
      account_number: "0110292392392",
      currency_code: "404",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
    {
      account_number: "0110292392397",
      currency_code: "404",
      phoneNumber: "073242432",
      email: "marcos@gmail.com",
    },
  ];

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
        size="small"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          my: 1,
        }}
      >
        <MKTypography fontWeight="bold">Account Details</MKTypography>
        <LinkAccountModal />
      </MKBox>
      <DataGrid
        dataSource={accounts}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        remoteOperations={true}
        showColumnLines={true}
        showRowLines={true}
        wordWrapEnabled={true}
        // height={"70vh"}
      >
        <Column dataField="account_number" caption="A/C Number" />
        <Column dataField="" caption="Transaction Limit" />
        <Column dataField="currency_code" caption="Currency Code" />
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

export default CustomerDetailsDataGrid;
