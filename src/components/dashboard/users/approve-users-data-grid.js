import React, { useState } from "react";
import dynamic from "next/dynamic";
import {
  Column,
  Item,
  SearchPanel,
  Toolbar,
  Selection,
} from "devextreme-react/data-grid";
import { SelectBox } from "devextreme-react/select-box";
import ApproveUsers from "../../../pages/dashboard/users/approve-users";

import MKBox from "../../@mui-components/box";
import { Add } from "@mui/icons-material";
import MKButton from "../../@mui-components/button";
import { useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
// import PermissionsForm from "./permissions-form";
const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const ApproveUsersDataGrid = (props) => {
  // const { data, handleOnAdd } = props;
  const [selectedRole, setSelectedRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { unapprovedUsers } = useSelector(({ users }) => users);
  const authUser = useAuth();

  const handleOnClose = () => {
    setOpenDialog(false);
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

  const approveUser = async() =>{
    const res = await ApproveUsers(authUser,userId);
  }
  return (
    <>
      <DataGrid
        dataSource={unapprovedUsers}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        height={"70vh"}
      >
        <Selection mode="multiple" />
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="fullName" caption="Name" />
        <Column dataField="phoneNumber" caption="Phone Number" />
        <Column dataField="email" caption="Email" />
        <Column dataField="approvedOn" caption="Approved On" />
        <Toolbar>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
      {/* <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/> */}
    </>
  );
};

export default ApproveUsersDataGrid;
