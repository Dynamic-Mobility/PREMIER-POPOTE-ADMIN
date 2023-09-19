import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import TransactionFilters from "./transaction-filters";
import Divider from "@mui/material/Divider";
import TransactionsCards from "./transactions-cards";

const DashboardSummary = () => {
    return (
        <>
            <MKBox sx={{ p:2, borderTop: 4, borderColor: 'primary.main', borderRadius:3, minHeight: '60vh', backgroundColor: 'background.paper'}}>
                <MKBox sx={{ display: 'flex', mb:1, justifyContent:'space-between'}}>
                    <MKTypography variant={'h6'}>
                        {'Transactions Summary'}
                    </MKTypography>
                    <TransactionFilters/>
                </MKBox>
                <Divider sx={{ mx:-2}}/>
                <MKBox sx={{ mt: 1}}>
                    <TransactionsCards/>
                </MKBox>
            </MKBox>
        </>
    )
}

export default DashboardSummary;