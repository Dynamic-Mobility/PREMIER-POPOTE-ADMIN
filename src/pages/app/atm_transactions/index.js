import React from "react";
import { DashboardLayout } from "../../../components/layouts/dashboard";
import {Container, Grid} from "@mui/material";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import {appName} from "../../../utils/constants";
import MKTypography from "../../../components/@mui-components/typography";
import AtmTransactionsDatagrid from "../../../components/dashboard/atm/atm-transactions-datagrid";
import {useSelector} from "../../../store";

const title = 'ATM Transactions';

const ATMTransactions = () => {
    const { atmTransactions } = useSelector(({atmReport}) =>atmReport );

    return (
        <>
            <Head>
                <title>{title}| {appName}</title>
            </Head>
            <MKBox
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 2,
                }}
            >
                <Container maxWidth="md">
                    <MKBox sx={{ mb: 2 }}>
                        <Grid container justifyContent="space-between" spacing={3}>
                            <Grid item>
                                <MKTypography variant="h4">{title}</MKTypography>
                            </Grid>
                        </Grid>
                    </MKBox>
                    <MKBox sx={{ p:1, backgroundColor: 'background.paper'}}>
                        <AtmTransactionsDatagrid {...{ data: atmTransactions }}/>
                    </MKBox>
                </Container>
            </MKBox>
        </>
    );
};

ATMTransactions.getLayout = (page) => (
    // <AuthGuard>
    <DashboardLayout>{page}</DashboardLayout>
    //  </AuthGuard>
);

export default ATMTransactions;
