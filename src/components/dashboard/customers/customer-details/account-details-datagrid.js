import React from "react";
import dynamic from "next/dynamic";
import { Column } from "devextreme-react/data-grid";
import Menu from "@mui/material/Menu";
import { MoreHoriz } from "@mui/icons-material";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import LinkAccountModal from "./link-account-modal";
import DMTChip from "../../../@dmt-components/chip";
import BlockUnblockUnlinkAccount from "./block-unblock-unlink-account";
import {BLOCK_ACTION_TYPES, BLOCK_TYPES} from "../../../../utils/constants";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

export const MenuDots = ({ data }) => {
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
          <BlockUnblockUnlinkAccount
              label={"Block Account"}
              type={"menu"}
              account={data}
              action={BLOCK_ACTION_TYPES.BLOCK}
              blockType = {BLOCK_TYPES.ACCOUNT}
              onClose={handleClose}
          />
          <BlockUnblockUnlinkAccount
              label={"Unlink Account"}
              type={"menu"}
              account={data}
              action={BLOCK_ACTION_TYPES.UNLINK}
              blockType = {BLOCK_TYPES.ACCOUNT}
              onClose={handleClose}
          />
        {/*<MenuItem onClick={() => handleRedirect(data)} sx={{ py: 1 }}>*/}
        {/*  <MKTypography></MKTypography>*/}
        {/*</MenuItem>*/}
        {/*<MenuItem onClick={() => handleRedirect(data)} sx={{ py: 1 }}>*/}
        {/*  <MKTypography>Unlink Account</MKTypography>*/}
        {/*</MenuItem>*/}
      </Menu>
    </div>
  );
};

const filterAccounts = (options) => {
    return options?.filter((option) =>  option.exists ) ?? [];
}


const AccountDetailsDatagrid = (props) => {
  const { data, cifResponse } = props;

  const linkedAccounts = filterAccounts(data);

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

    const formatApprovalStatus = ({ data, displayValue }) => {
        let color = displayValue === 'Approved' ? 'success' :  'error';
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
        <MenuDots data={data} />
      </div>
    );
  };

  return (
    <>
        <MKBox sx={{ my:1, display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <MKTypography fontWeight="bold">{"Linked Accounts"}</MKTypography>
            <LinkAccountModal data={data} cifResponse={cifResponse} />
        </MKBox>

          <DataGrid
            dataSource={linkedAccounts}
            allowColumnReordering={true}
            rowAlternationEnabled={true}
            showBorders={true}
            remoteOperations={true}
            showColumnLines={true}
            showRowLines={true}
            wordWrapEnabled={true}
            // height={"70vh"}
          >
            <Column minWidth={150} dataField="account" caption="A/C Number" />
            <Column minWidth={250} dataField="longname" caption="A/C Name" />
            <Column minWidth={100} dataField="currencyCode" caption="Currency Code" />
            <Column minWidth={110} cellRender={formatStatus} dataField="status" caption="Status" />
            <Column minWidth={150} cellRender={formatApprovalStatus} dataField="localStatus" caption="Approval Status" />
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

export default AccountDetailsDatagrid;
