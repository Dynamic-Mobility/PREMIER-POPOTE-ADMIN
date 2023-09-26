import React from "react";
import dynamic from "next/dynamic";
import { Column} from "devextreme-react/data-grid";
import { MoreHoriz } from "@mui/icons-material";
import { useRouter } from "next/router";
import DoneIcon from "@mui/icons-material/Done";
import ApproveRegistration from "./approve-registration";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import RejectRegistration from "./reject-approval";

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
  const { data, onRefresh } = props;

  const MenuDots = ({ data }) => {
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
            <ApproveRegistration customer={data} onRefresh={onRefresh} />
          </MenuItem>
          <MenuItem sx={{ py: 1 }}>
            <RejectRegistration />
          </MenuItem>
        </Menu>
      </div>
    );
  };

  const actionLink = ({ data }) => {
    return (
      <div>
        <MenuDots {...{data}} />
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
    </>
  );
};

export default RegistrationsDatagrid;
