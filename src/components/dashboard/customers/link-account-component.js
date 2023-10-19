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
import {ListItemIcon} from "@mui/material";

const LinkAccountComponent = (props) => {
  const { item, selectedAccounts, onSelect } = props;
  const labelId = `checkbox-list-label-${item?.account}`;

  const isSelected = selectedAccounts.some((selectedAccount) => selectedAccount?.account === item?.account )

  return (
    <>
        <ListItemButton disabled={Boolean(item?.exists)}  onClick={() => onSelect(item)}>
          <ListItemIcon>
            <Checkbox
                edge="start"
                checked={isSelected}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText
            primary={item?.account}
            secondary={
              <>
                <MKBox sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <MKTypography
                      sx={{ display: "inline" }}
                      variant="body2"
                      color="primary"
                  >
                    {item?.longname}
                  </MKTypography>
                  <MKTypography
                      sx={{ display: "inline" }}
                      variant="body2"
                      color="primary"
                  >
                    {"Currency: "}{item?.currencyCode}
                  </MKTypography>
                </MKBox>

              </>
            }
          />
        </ListItemButton>
    </>
  );
};

export default LinkAccountComponent;
