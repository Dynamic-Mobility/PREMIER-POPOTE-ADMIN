import { appName } from "../../../../utils/constants";
import MKTypography from "../../../../components/@mui-components/typography";
import Head from "next/head";
import MKBox from "../../../../components/@mui-components/box";
import Grid from "@mui/material/Grid";
import { useDispatch, useSelector } from "../../../../store";
import {Card} from "@mui/material";
import {
    setPageSize,
    setActivePage,
    setFilters,
    fetchAuditTrail,
    resetFilters
} from "../../../../slices/dashboard/audit-trail";
import ModernLayout from "../../../../components/layouts/modern";
import {useCallback, useEffect} from "react";
import {useAuth} from "../../../../hooks/use-auth";
import {formatDate} from "../../../../utils/helper-functions";
import {AuthGuard} from "../../../../hocs/auth-guard";
import {usersApis} from "../../../../api-requests/users-apis";
import AuditTrailDataGrid from "../../../../components/dashboard/reports/system-reports/audit-trail/audit-trail-datagrid";
import AuditTrailActionButtons
    from "../../../../components/dashboard/reports/system-reports/audit-trail/audit-trail-action-buttons";


const title = "Audit Trail";

const AuditTrailPage = () => {
    const dispatch = useDispatch();
    const authUser = useAuth();

    const {
        auditTrail,
        filters,
        pageSize,
        activePage,
        totalRecords
    } = useSelector(({ auditTrail }) => auditTrail);


    const handleOnPageSizeChange = async value => {
        await getAuditTrail(filters, value, 1);
        dispatch(setPageSize(value));
        dispatch(setActivePage(1));
    }

    const handleOnPageChange = async value => {
        await getAuditTrail(filters, pageSize, value);
        dispatch(setActivePage(value));
    }

    const handleOnReset = () => {
        dispatch(resetFilters());
    }

    const handleOnSetFilters = filters => {
        dispatch(setFilters(filters));
    }
    const handleSetActivePage= value => {
        dispatch(setActivePage(value));
    }



    const getAuditTrail = useCallback(async (filters, pageSize, activePage) => {
        const values = {

            username: filters.username,
            department: filters.department,
            branch: filters.branch,
            loginDate: filters.startDate && filters.endDate ?
                [
                    formatDate(filters.startDate, "DD MMM YYYY HH:mm"),
                    formatDate(filters.endDate, "DD MMM YYYY HH:mm")
                ] : null,
            loggedIn: filters.loggedIn,
            email: filters.email,
            active: filters.active,
            pageNumber: activePage,
            pageSize: pageSize
        };
        await dispatch(fetchAuditTrail(authUser, values));
    },[authUser?.user]);

    const getAuditTrailReports = useCallback(async (filters, reportType) => {
        const values = {
            reportType: reportType,
            username: filters.username,
            department: filters.department,
            branch: filters.branch,
            loginDate: filters.startDate && filters.endDate ?
                [
                    formatDate(filters.startDate, "DD MMM YYYY HH:mm"),
                    formatDate(filters.endDate, "DD MMM YYYY HH:mm")
                ] : null,
            loggedIn: filters.loggedIn,
            email: filters.email,
            active: filters.active,
        }
        return await  usersApis.fetchAuditTrailReport(authUser, values);
    },[authUser?.user]);


    useEffect(() => {
        getAuditTrail(filters, pageSize, activePage);
    },[])

    return (
        <>
            <Head>
                <title>{title} | {appName}</title>
            </Head>
            <MKBox
                //component="main"
                sx={{
                    flexGrow: 1,
                    pt: 2,
                    px:2,
                }}
            >
                <MKBox sx={{ mb: 2 }}>
                    <Grid container justifyContent="space-between" spacing={3}>
                        <Grid item>
                            <MKTypography variant="h5">{title}</MKTypography>
                        </Grid>
                        <Grid item>
                            <AuditTrailActionButtons
                                {...{
                                    setFilters: handleOnSetFilters,
                                    setActivePage: handleSetActivePage,
                                    onFilter: getAuditTrail,
                                    onExport: reportType => getAuditTrailReports(filters, reportType),
                                    onResetFilters: handleOnReset,
                                    filters,
                                    pageSize,
                                    activePage
                                }}/>
                        </Grid>
                    </Grid>
                </MKBox>
                <Card sx={{p:1}}>
                    <AuditTrailDataGrid
                        data={auditTrail}
                        limit={pageSize}
                        totalRecords={totalRecords}
                        activePage={activePage}
                        onPageSizeChange = {handleOnPageSizeChange}
                        onPageChange={handleOnPageChange}
                    />
                </Card>
            </MKBox>
        </>
    );
};

AuditTrailPage.getLayout = (page) => (
    <AuthGuard>
        <ModernLayout>
            {page}
        </ModernLayout>
    </AuthGuard>
);

export default AuditTrailPage;
