import {Collapse, Drawer} from "@mui/material";
import MKBox from "../../@mui-components/box";
import PropertyItem from "../../@dmt-components/PropertyItem";
import MKTypography from "../../@mui-components/typography";

const AtmTransactionDetails = props => {
    const { transaction , open, onClose} = props;

    if (!transaction){
        return null;
    }

    return (
        <>
            <Drawer
                anchor={'right'}
                open={open}
                onClose={onClose}
                elevation={3}

            >
                <MKBox  sx={{p:2, width: '400px'}}>
                    <MKTypography variant={'h6'} align={'center'} gutterBottom>
                        {"Transaction Details"}
                    </MKTypography>
                    <Collapse in={Boolean(open)}>
                        <MKBox>
                            <PropertyItem
                                label={'Customer Name'}
                                value={transaction?.names}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Account'}
                                value={transaction?.account}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Client Phone'}
                                value={transaction?.clientNumber}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Balance'}
                                value={transaction?.bar}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Account Status'}
                                value={transaction?.status}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Currency Code'}
                                value={transaction?.ccycode}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Other Desc'}
                                value={transaction?.briefdesc}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Transaction Type'}
                                value={transaction?.[0]?.transactiondesc}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'External Ref'}
                                value={transaction?.[0]?.externalRefNo}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Source'}
                                value={transaction?.[0]?.source}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'Amount'}
                                value={transaction?.[0]?.transactionAmt}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'IMAL Response Code'}
                                value={transaction?.[0]?.olError}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'IMAL Response'}
                                value={transaction?.[0]?.osErrMsg}
                                isLoading = {false}
                            />
                            <PropertyItem
                                label={'IMAL Transaction Code'}
                                value={transaction?.[0]?.olTrxCode}
                                isLoading = {false}
                            />
                        </MKBox>
                    </Collapse>
                </MKBox>
            </Drawer>
        </>
    )
}

export default AtmTransactionDetails;