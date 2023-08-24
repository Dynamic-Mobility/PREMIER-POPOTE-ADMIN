import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Column, Item, SearchPanel, Toolbar } from "devextreme-react/data-grid";

import MKBox from "../../@mui-components/box";
import { Add } from "@mui/icons-material";
import MKButton from "../../@mui-components/button";
import AddProfileDialog from "./addProfileDialog";
import { useSelector } from "react-redux";
// import PermissionsForm from "./permissions-form";
const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});


const ProfileDataGrid = (props) => {
//   const { data, handleOnAdd } = props;
  const [selectedRole, setSelectedRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const { profiles } = useSelector(({ users }) => users)
  const [open, setOpen] = React.useState(false);

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
  return (
    <>
      <DataGrid
        dataSource={profiles}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        height={"70vh"}
      >
        <SearchPanel visible={true} highlightCaseSensitive={true} />
        <Column dataField="profile_name" caption="Name" />
        <Column dataField="remarks" caption="Remarks" />
        <Column dataField="createdAt" caption="Created On" />
        {/* <Column
          caption="Active"
          width={200}
          allowFiltering={false}
          cellRender={actionsOptions}
        /> */}
        <Toolbar>
          <Item location="before">
            <AddProfileDialog {...{ handleClickOpen, handleClose,open,setOpen }} />
          </Item>
          <Item location="after" name="searchPanel" />
        </Toolbar>
      </DataGrid>
      {/* <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/> */}
    </>
  );
};

export default ProfileDataGrid;
