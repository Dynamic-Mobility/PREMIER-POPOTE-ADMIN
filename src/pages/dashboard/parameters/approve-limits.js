import React, {useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import ApprovalLimitsDatagrid from "../../../components/dashboard/limits/limit-approvals/approval-limits-datagrid";
import { getUnapprovedLimits } from "../../../slices/dashboard/settings";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {PAGES_PATHS} from "../../../utils/constants";

const title = "Transaction Limits Approval";

const  LimitsApprovalPage = () => {
    const dispatch = useDispatch();
    const { unapprovedLimits } = useSelector(( { settings }) => settings);
    const authUser = useAuth();
    
    const fetchPendingLimits = async () => {
        await dispatch(getUnapprovedLimits(authUser));
    }


    useEffect(() => {
        fetchPendingLimits();
    }, [])

    return (
        <>
            <Head>{title}</Head>
            <MKBox
                component={'main'}
                sx={{
                    flexGrow: 1,
                    pt: 2,
                    px:2,
                }}
            >
                <MKBox sx={{ mb: 2 }}>
                    <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                        <Grid item>
                            <MKTypography variant="h5">{title}</MKTypography>
                        </Grid>
                    </Grid>
                </MKBox>
                <Card sx={{ p: 1 }}>
                    <ApprovalLimitsDatagrid
                        data={unapprovedLimits}
                        onRefresh={fetchPendingLimits}
                    />
                </Card>
            </MKBox>

        </>
    );
};

LimitsApprovalPage.getLayout = (page) => {
    return (
        <>
            <AuthGuard>
                <ModernLayout>
                    <RoleBasedGuard path={PAGES_PATHS.APPROVE_LIMITS} page={true}>
                        {page}
                    </RoleBasedGuard>
                </ModernLayout>
            </AuthGuard>
        </>
    );
};

export default LimitsApprovalPage;
