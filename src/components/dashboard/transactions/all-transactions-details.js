import { Collapse, Drawer } from "@mui/material";
import MKBox from "../../@mui-components/box";
import PropertyItem from "../../@dmt-components/PropertyItem";
import MKTypography from "../../@mui-components/typography";

const TransactionsDetails = (props) => {
  const { transaction, open, onClose } = props;

  if (!transaction) {
    return null;
  }

  return (
    <>
      <Drawer anchor={"right"} open={open} onClose={onClose} elevation={3}>
        <MKBox sx={{ p: 2, width: "400px" }}>
          <MKTypography variant={"h6"} align={"center"} gutterBottom>
            {"Transaction Details"}
          </MKTypography>
          <Collapse in={Boolean(open)}>
            <MKBox>
              <PropertyItem
                label={"From Account"}
                value={transaction?.fromAccount}
                isLoading={false}
              />
              <PropertyItem
                label={"Amount"}
                value={transaction?.amount}
                isLoading={false}
              />
              <PropertyItem
                label={"Transactions"}
                value={transaction?.transaction}
                isLoading={false}
              />
              <PropertyItem
                label={"Client Number"}
                value={transaction?.client}
                isLoading={false}
              />
              <PropertyItem
                label={"Transaction Reference"}
                value={transaction?.reference}
                isLoading={false}
              />
              <PropertyItem
                label={"Transaction Date"}
                value={transaction?.date}
                isLoading={false}
              />
              <PropertyItem
                label={"Currency Code"}
                value={transaction?.ccycode}
                isLoading={false}
              />
              <PropertyItem
                label={"Other Desc"}
                value={transaction?.briefdesc}
                isLoading={false}
              />
              <PropertyItem
                label={"Transaction Type"}
                value={transaction?.transactiondesc}
                isLoading={false}
              />
              <PropertyItem
                label={"External Ref"}
                value={transaction?.externalRefNo}
                isLoading={false}
              />
              <PropertyItem
                label={"Source"}
                value={transaction?.source}
                isLoading={false}
              />
              <PropertyItem
                label={"Imal Response Code"}
                value={transaction?.olError}
                isLoading={false}
              />
              <PropertyItem
                label={"Imal Response"}
                value={transaction?.osErrMsg}
                isLoading={false}
              />
              <PropertyItem
                label={"Imal Transaction Code"}
                value={transaction?.olTrxCode}
                isLoading={false}
              />
              <PropertyItem
                label={"Imal Response"}
                value={transaction?.osErrMsg}
                isLoading={false}
              />
            </MKBox>
          </Collapse>
        </MKBox>
      </Drawer>
    </>
  );
};

export default TransactionsDetails;
