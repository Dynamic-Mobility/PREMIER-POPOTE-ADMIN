import React, {useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import ModernLayout from "../../../components/layouts/modern";
import Head from "next/head";
import MKBox from "../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import ApprovalLimitsDatagrid from "../../../components/dashboard/limits/limit-approvals/approval-limits-datagrid";
import {getEditedUnapprovedLimits, getUnapprovedLimits} from "../../../slices/dashboard/settings";
import RefreshButton from "../../../components/@dmt-components/refresh-button";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {PAGES_PATHS} from "../../../utils/constants";

const title = "Edited Limits Approval";

const  EditedLimitsPage = () => {
    const dispatch = useDispatch();
    const { unapprovedEditedLimits } = useSelector(( { settings }) => settings);
    const authUser = useAuth();
    
    const fetchPendingLimits = async () => {
        await dispatch(getEditedUnapprovedLimits(authUser));
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
                        <Grid item>
                            <RefreshButton onRefresh={fetchPendingLimits}/>
                        </Grid>
                    </Grid>
                </MKBox>
                <Card sx={{ p: 1 }}>
                    <ApprovalLimitsDatagrid
                        data={unapprovedEditedLimits}
                        onRefresh={fetchPendingLimits}
                        edited={true}
                    />
                </Card>
            </MKBox>

        </>
    );
};

EditedLimitsPage.getLayout = (page) => {
    return (
        <>
            <AuthGuard>
                <ModernLayout>
                    <RoleBasedGuard path={PAGES_PATHS.APPROVE_EDITED_LIMITS} page={true}>
                        {page}
                    </RoleBasedGuard>
                </ModernLayout>
            </AuthGuard>
        </>
    );
};

export default EditedLimitsPage;
