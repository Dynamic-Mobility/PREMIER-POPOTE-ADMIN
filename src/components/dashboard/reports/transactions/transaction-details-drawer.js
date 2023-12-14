import {alpha, Drawer, IconButton} from "@mui/material";
import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import PropertyItem from "../../../@dmt-components/PropertyItem";
import DMTChip from "../../../@dmt-components/chip";
import React from "react";
import GoogleMapComponent from "../../../@dmt-components/google-map";
import CloseIcon from "@mui/icons-material/Close";

const TransactionDetailsDrawer = props => {
    const { transaction, open, onClose } = props;

    if (!transaction) {
        return null;
    }

    const color = transaction?.completed && transaction?.processed
        ? "success"  :
        transaction?.processed ? 'warning' : "error";

    return (
        <div>
            <Drawer
                anchor={"right"}
                open={open}
                onClose={onClose}
                elevation={3}
            >
                <MKBox sx={{ p: 2, width: "400px", backgroundColor: theme => alpha(theme.palette.primary.main, 0.02)}}>
                    <MKBox sx={{ mb:1, display: 'flex', justifyContent: 'flex-start'}}>
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </MKBox>

                    <MKTypography color={'primary'} variant={"h6"} align={"center"} gutterBottom>
                        {"Transaction Details"}
                    </MKTypography>
                    <MKBox>
                        <PropertyItem
                            label={"Txn ID"}
                            value={transaction?.id}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Customer Name"}
                            value={transaction?.customerName}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Account From"}
                            value={transaction?.accountFrom}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Account To"}
                            value={transaction?.accountTo}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Amount"}
                            value={
                                <DMTChip
                                    numeral={true}
                                    label={transaction?.amount ?? "-"}
                                    color={color}
                                />
                            }
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Currency"}
                            value={transaction?.currency}
                            isLoading={false}
                        />
                        {/*<PropertyItem*/}
                        {/*    label={"Reference"}*/}
                        {/*    value={transaction?.refence}*/}
                        {/*    isLoading={false}*/}
                        {/*/>*/}
                        <PropertyItem
                            label={"Txn Reference"}
                            value={transaction?.transactionReference}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Message Reference"}
                            value={transaction?.messageReference}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Recipient Name"}
                            value={transaction?.recipientName}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Transaction Type"}
                            value={transaction?.transactionTypeDesc}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Channel"}
                            value={transaction?.channel}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Narration"}
                            value={transaction?.narration}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Transaction Date"}
                            value={transaction?.transactionDate}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"IMAL Response Code"}
                            value={transaction?.imalResponseCode}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Posted To IMAL"}
                            value={
                                transaction?.postedToImal ?
                                    <DMTChip
                                        label={"True"}
                                        color={"success"}
                                    />
                                    :
                                    <DMTChip
                                        label={"False"}
                                        color={"error"}
                                    />
                            }
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Processed"}
                            value={
                                transaction?.processed ?
                                    <DMTChip
                                        label={"True"}
                                        color={"success"}
                                    />
                                    :
                                    <DMTChip
                                        label={"False"}
                                        color={"error"}
                                    />
                            }
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Completed"}
                            value={
                                transaction?.completed ?
                                    <DMTChip
                                        label={"True"}
                                        color={"success"}
                                    />
                                    :
                                    <DMTChip
                                        label={"False"}
                                        color={"error"}
                                    />
                            }
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Status"}
                            value={transaction?.status}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Error Code"}
                            value={transaction?.errorCode}
                            isLoading={false}
                        />
                        <PropertyItem
                            label={"Error Message"}
                            value={transaction?.errorMsg}
                            isLoading={false}
                        />
                        {Boolean(transaction?.location) && (
                            <MKBox>
                                <PropertyItem
                                    label={"Location"}
                                    value={transaction?.location}
                                    isLoading={false}
                                />
                                <GoogleMapComponent
                                    lat={eval(transaction?.location)?.[0]}
                                    lng={eval(transaction?.location)?.[1]}
                                    height={"200px"}
                                />
                            </MKBox>
                        )}

                    </MKBox>
                </MKBox>
            </Drawer>
        </div>
    );
}

export default TransactionDetailsDrawer;