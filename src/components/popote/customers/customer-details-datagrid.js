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
import DMTChip from "../../@dmt-components/chip";

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

    const formatStatus = ({ data, displayValue }) => {
        let color = displayValue === 'A' ? 'success' :  'error';
        return (
            <DMTChip
                //numeral={true}
                label={displayValue}
                color={color}
                variant={"outlined"}
            />
        )

    }

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
        <LinkAccountModal cifResponse={data} />
      </MKBox>
      <DataGrid
        dataSource={data}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        remoteOperations={true}
        showColumnLines={true}
        showRowLines={true}
        wordWrapEnabled={true}
        // height={"70vh"}
      >
        <Column dataField="account" caption="A/C Number" />
        <Column minWidth={250} dataField="longname" caption="A/C Name" />
        <Column dataField="currencyCode" caption="Currency Code" />
        <Column cellRender={formatStatus} dataField="status" caption="Status" />
        <Column
          caption="Action"
          width={120}
          alignment={"center"}
          allowFiltering={false}
          cellRender={actionLink}
        />
      </DataGrid>
    </>
  );
};

export default CustomerDetailsDataGrid;
