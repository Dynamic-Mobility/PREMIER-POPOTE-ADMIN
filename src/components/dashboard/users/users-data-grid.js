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
import AddUser from "../../../pages/dashboard/users/addUser";
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

  const handleRedirect = (data) =>{
    router.push('/dashboard/api-users',{ query:  {state: data}})
  }


  return (
    <div>
      <span style={{ fontSize: 20,cursor: 'pointer' }}>
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
        <MenuItem onClick={()=> handleRedirect(data)} sx={{textTransform: 'uppercase'}}>Set Permissions</MenuItem>
      </Menu>
    </div>
  );
};

const UsersDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const [open, setOpen] = React.useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const { users } = useSelector(({ users }) => users)
  const [openDialog, setOpenDialog] = useState(false);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };



  const actionsOptions = ({ data }) => {
    const handleOnEdit = () => {
      setSelectedRole(data);
      setOpenDialog(true);
    };

    

    return (
      <MKBox>
        {/*<Tooltip title="Edit">*/}
        {/*    <IconButton size={"small"} color={"info"} onClick={handleOnEdit}>*/}
        {/*        <Edit />*/}
        {/*    </IconButton>*/}
        {/*</Tooltip>*/}
        <MKButton
          onClick={handleOnEdit}
          variant={"outlined"}
          size={"small"}
          color={"info"}
        >
          Manage Permissions
        </MKButton>
      </MKBox>
    );
  };

  //   users dummy data
  // const users = [
  //   {
  //     name: "Marcos Ochieng",
  //     phone: "3123242432",
  //     email: "marcos@gmail.com",
  //   },
  //   {
  //     name: "Derrick Ochieng",
  //     phone: "3123242432",
  //     email: "marcos@gmail.com",
  //   },
  //   {
  //     name: "Jane Ochieng",
  //     phone: "3123242432",
  //     email: "marcos@gmail.com",
  //   },
  //   {
  //     name: "Ann Ochieng",
  //     phone: "3123242432",
  //     email: "marcos@gmail.com",
  //   },
  // ];

  //   redirect to API Users Page
  const setPermissions = (data) => {
    router.push({
      pathname: "/dashboard/api-users",
      query: { key: data },
    });
  };

  const actionLink = ({ data, rowIndex }) => {
    return (
      <div>
        <MenuDots data={data} />
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
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        {/* <Column
          caption="Action"
          width={180}
          alignment={"center"}
          allowFiltering={false}
          cellRender={actionLink}
        /> */}
        <Column dataField="fullName" caption="Name" />
        <Column dataField="profile_name" caption="Profile Name" />
        <Column dataField="phoneNumber" caption="Phone Number" />
        <Column
          dataField="email"
          caption="Email"
          width={200}
          allowFiltering={false}
        />
        <Toolbar>
          <Item location="before">
                        {/* <MKButton
                            onClick={handleOnAdd}
                            color={'primary'}
                            variant={'contained'}
                            startIcon={<Add/>}>
                            Add User
                        </MKButton> */}
                        <AddUser {...{ handleClickOpen, handleClose,open,setOpen }} />
                    </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
      {/* <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/> */}
    </>
  );
};

export default UsersDataGrid;
