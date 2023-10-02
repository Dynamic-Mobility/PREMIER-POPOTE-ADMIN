import React, { useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MKTypography from "../../@mui-components/typography";
import MKBox from "../../@mui-components/box";
import { customersApis } from "../../../api-requests/customers-api";
import { useAuth } from "../../../hooks/use-auth";
import { toast } from "react-toastify";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import MKButton from "../../@mui-components/button";

const LinkAccountComponent = (props) => {
  const { item, cifResponse } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [progresStatus, setProgressStatus] = React.useState("");
  const [selectedItems, setSelectedItems] = useState([]); // Initialize as an empty array
  const authUser = useAuth();

  const handleCheckboxToggle = () => {
    if (selectedItems.includes(item)) {
      // If the item is already selected, remove it from selectedItems
      setSelectedItems(selectedItems.filter((selectedItem) => selectedItem !== item));
    } else {
      // If the item is not selected, add it to selectedItems
      setSelectedItems([...selectedItems, item]);
    }
  };

  const linkAccount = async () => {
    const formattedData = {
      cif: item?.cif,
      accountName: item?.longname,
      customerId: cifResponse?.customerId,
      accountNumber: item?.account,
      branchCode: item?.branch,
      accountLongName: item?.longname,
      aliasName: item?.longname,
      secondaryAliasName: "",
      currency: item?.currencyCode,
      accountType: item?.ciftype,
      accountStatus: item?.status,
      userId: authUser?.user?.userid,
      registeredForUSSD: true,
      registeredForAPP: true,
    };
    try {
      setProgressStatus("Operation In progress");
      const res = await customersApis.linkAccounts(authUser, formattedData);
      if (res.success) {
        setProgressStatus("Operation Complete");
        toast.success(res.errorMessage);
      } else {
        toast.error(res.errorMessage);
        setProgressStatus("Operation Failed");
      }
      console.log("LINK_ACCOUNT_RESPONSE ", res);
    } catch (err) {
      console.log("LINK_ACCOUNT_ERROR ", err);
    }
  };

  const handleSaveClick = () => {
    // Execute linkAccount for each selected item
    selectedItems.forEach((selectedItem) => {
      linkAccount(selectedItem);
    });
  };

  return (
    <>
      <MKBox sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={selectedItems.includes(item)}
                onChange={handleCheckboxToggle}
              />
            }
          />
        </FormGroup>
        <ListItemButton selected={selectedIndex === 0}>
          <ListItemText
            primary={item?.account}
            secondary={
              <React.Fragment>
                <MKBox
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <MKTypography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="primary"
                  >
                    Currency Code :{item?.currencyCode}
                  </MKTypography>
                  <MKTypography
                    fontWeight="thin"
                    color={
                      progresStatus === "Operation Complete"
                        ? "success"
                        : progresStatus === "Operation Failed"
                        ? "error"
                        : "grey"
                    }
                    variant="overline"
                    display="block"
                  >
                    {progresStatus}
                  </MKTypography>
                </MKBox>
              </React.Fragment>
            }
          />
        </ListItemButton>
      </MKBox>
      <MKBox sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
        <MKButton onClick={handleSaveClick} size="small" variant="contained" color="primary">
          Save
        </MKButton>
      </MKBox>
    </>
  );
};

export default LinkAccountComponent;
