import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MKTypography from "../../@mui-components/typography";
import MKBox from "../../@mui-components/box";
import { customersApis } from "../../../api-requests/customers-api";
import { useAuth } from "../../../hooks/use-auth";
import { toast } from "react-toastify";

const LinkAccountComponent = (props) => {
  const { item, cifResponse } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const [progresStatus, setProgressStatus] = React.useState("");
  const authUser = useAuth();

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  console.log("CIF_PROP ", cifResponse);

  const linkAccount = async () => {
    const formattedData = {
      cif: item?.cif,
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
      console.log("LINK_ACCOUNT_ERR0R ", err);
    }
  };

  console.log("SINGLE_ACCOUNT ", item);

  return (
    <>
      <ListItemButton selected={selectedIndex === 0} onClick={linkAccount}>
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
    </>
  );
};

export default LinkAccountComponent;
