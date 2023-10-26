import React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MKTypography from "../../@mui-components/typography";
import MKBox from "../../@mui-components/box";
import Checkbox from "@mui/material/Checkbox";
import {ListItemIcon} from "@mui/material";

const LinkAccountComponent = (props) => {
  const { item, selectedAccounts, onSelect, field= 'account' } = props;
  const labelId = `checkbox-list-label-${item?.[field]}`;

  const isSelected = selectedAccounts.some((selectedAccount) => selectedAccount?.[field] === item?.[field])

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
            primary={item?.account ?? item?.accountNumber}
            secondary={
              <>
                <MKBox sx={{ display: 'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <MKTypography
                      sx={{ display: "inline" }}
                      variant="body2"
                      color="primary"
                  >
                    {item?.longname ?? item?.accountName}
                  </MKTypography>
                  <MKTypography
                      sx={{ display: "inline" }}
                      variant="body2"
                      color="primary"
                  >
                    {"Currency: "}{item?.currencyCode ?? item?.currency}
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
