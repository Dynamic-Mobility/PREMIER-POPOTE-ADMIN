import Grid from "@mui/material/Grid";
import MKBox from "../../@mui-components/box";
import MKTypography from "../../@mui-components/typography";
import CurrencyFormat from "react-currency-format";
import Icon from "@mui/material/Icon";
import {alpha} from "@mui/material/styles";
import TransactionsGraph from "./transactions-graph";

const transactionCardsOpts = [
    {
        id:1,
        title: 'Total Transactions',
        value: 0,
        icon: 'paid',
        color: 'primary',
    },
    {
        id:2,
        title: 'Successful Transactions',
        value: 0,
        icon: 'published_with_changes',
        color: 'success',
    },
    {
        id:3,
        title: 'Failed Transactions',
        value: 0,
        icon: 'unpublished',
        color: 'error',
    }
]

const TransactionsCards = () => {
    return (
        <>
            <Grid container spacing={4}>
                {transactionCardsOpts.map((opt, index) => (
                    <Grid key={index} item md={4} sm={12} xs={12}>
                        <MKBox sx={{ borderRadius: 2, backgroundColor: theme => alpha(theme.palette?.[opt?.color]?.main, 0.1), p:2, display: 'flex', alignItems: 'center', justifyContent:'center', flexDirection: 'column'}}>
                            <MKTypography variant={'h6'}>
                                <CurrencyFormat
                                    displayType={"text"}
                                    value={opt.value}
                                    thousandSeparator={true}
                                    prefix={""}
                                />
                            </MKTypography>
                            <MKTypography gutterBottom>{opt.title}</MKTypography>
                            <Icon color={opt.color} fontSize={'90px'}>
                                {opt?.icon}
                            </Icon>
                        </MKBox>
                    </Grid>
                ))}
                <Grid item xs={12} md={12} sm={12}>
                    <TransactionsGraph/>
                </Grid>
            </Grid>
        </>
    )
}

export default TransactionsCards;

