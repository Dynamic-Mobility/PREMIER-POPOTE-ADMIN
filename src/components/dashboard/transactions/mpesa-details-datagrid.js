import { Collapse, Drawer } from "@mui/material";
import MKBox from "../../@mui-components/box";
import PropertyItem from "../../@dmt-components/PropertyItem";
import MKTypography from "../../@mui-components/typography";

const MpesaDetails = (props) => {
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
                label={"Transaction Id"}
                value={transaction?.paymentTransactionId}
                isLoading={false}
              />
              <PropertyItem
                label={"Initiator"}
                value={transaction?.initiatorName}
                isLoading={false}
              />
              <PropertyItem
                label={"Amount"}
                value={transaction?.amount}
                isLoading={false}
              />
              <PropertyItem
                label={"Recipient Phone Number"}
                value={transaction?.recipientPhone}
                isLoading={false}
              />
              <PropertyItem
                label={"Remarks"}
                value={transaction?.remarks}
                isLoading={false}
              />
              <PropertyItem
                label={"Created On"}
                value={transaction?.createdOn}
                isLoading={false}
              />
              <PropertyItem
                label={"Responded"}
                value={transaction?.responded}
                isLoading={false}
              />
              <PropertyItem
                label={"Response"}
                value={transaction?.responseDescription}
                isLoading={false}
              />
              <PropertyItem
                label={"Conversation Id"}
                value={transaction?.conversationId}
                isLoading={false}
              />
              <PropertyItem
                label={"Originator Conversation Id"}
                value={transaction?.originatorConversationId}
                isLoading={false}
              />
              <PropertyItem
                label={"Result Description"}
                value={transaction?.resultDesc}
                isLoading={false}
              />
              <PropertyItem
                label={"Result Type"}
                value={transaction?.resultType}
                isLoading={false}
              />
              <PropertyItem
                label={"Result Code"}
                value={transaction?.resultCode}
                isLoading={false}
              />
              <PropertyItem
                label={"Transaction Receipt"}
                value={transaction?.transactionReceipt}
                isLoading={false}
              />
              <PropertyItem
                label={"Mpesa Number"}
                value={transaction?.mpesaRegisteredPhone}
                isLoading={false}
              />
              <PropertyItem
                label={"Processed"}
                value={transaction?.processed}
                isLoading={false}
              />
              <PropertyItem
                label={"B2C Response Code"}
                value={transaction?.b2CResponseCode}
                isLoading={false}
              />
              <PropertyItem
                label={"Imal Response Code"}
                value={transaction?.imalResponseCode}
                isLoading={false}
              />
              <PropertyItem
                label={"Imal Response Message"}
                value={transaction?.imalResponseMsg}
                isLoading={false}
              />
              <PropertyItem
                label={"Posted To"}
                value={transaction?.postedToImal}
                isLoading={false}
              />
              <PropertyItem
                label={"Acknowledged"}
                value={transaction?.acknowledged}
                isLoading={false}
              />
              <PropertyItem
                label={"Transaction Status"}
                value={transaction?.transactionStatus}
                isLoading={false}
              />
              <PropertyItem
                label={"Completed"}
                value={transaction?.completed}
                isLoading={false}
              />
              <PropertyItem
                label={"Reversed"}
                value={transaction?.reversed}
                isLoading={false}
              />
              <PropertyItem
                label={"Reversal Imal Code"}
                value={transaction?.reversalImalCode}
                isLoading={false}
              />
              <PropertyItem
                label={"Reversal Imal Description"}
                value={transaction?.reversalImalDesc}
                isLoading={false}
              />
            </MKBox>
          </Collapse>
        </MKBox>
      </Drawer>
    </>
  );
};

export default MpesaDetails;
