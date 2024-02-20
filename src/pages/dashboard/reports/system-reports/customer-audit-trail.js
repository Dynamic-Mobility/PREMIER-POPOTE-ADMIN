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
    fetchCustomerAuditTrail
} from "../../../../slices/dashboard/audit-trail";
import ModernLayout from "../../../../components/layouts/modern";
import {useCallback, useEffect, useState} from "react";
import {useAuth} from "../../../../hooks/use-auth";
import {AuthGuard} from "../../../../hocs/auth-guard";
import {customersApis} from "../../../../api-requests/customers-api";
import CustomerActionButtons from "../../../../components/dashboard/customers/filters/customer-actions-button";
import CustomerAuditTrailDatagrid
    from "../../../../components/dashboard/reports/system-reports/customer-audit-trail/customer-audit-trail-datagrid";
import {getInactiveCustomers} from "../../../../slices/dashboard/customers";


const title = "Customer Audit Trail";

const CustomerAuditTrailPage = () => {
    const initialFilters = {
        name: "",
        idnumber: "",
        phonenumber: "",
        cifNumber: "",
        email: "",
        active: "false",
    }
    const dispatch = useDispatch();
    const authUser = useAuth();
    const [filters, setFilters] = useState(initialFilters);

    const {
        customerAuditTrail,
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

    const handleOnReset = async () => {
        setFilters(initialFilters);
        const values = {
            ...initialFilters,
            pageSize,
            pageNumber: 1,
        }
        await dispatch(fetchCustomerAuditTrail(authUser,values ))
    }

    const handleOnSetFilters = filters => {
        setFilters(filters);
    }
    const handleSetActivePage= value => {
        dispatch(setActivePage(value));
    }

    const handleOnChangeFilters = values => {
        setFilters(values);
    }


    const handleOnSearch = async () => {
        await getAuditTrail(pageSize, 1);
        dispatch(setActivePage(1));
    }


    const getAuditTrail = useCallback(async (pageSize, activePage) => {
        const values = {
            ...filters,
            pageNumber: activePage,
            pageSize: pageSize
        };
        await dispatch(fetchCustomerAuditTrail(authUser, values));
    },[authUser?.user, filters]);

    const getAuditTrailReports = useCallback(async ( filters, reportType) => {
        const values = {
            ...filters,
            reportType
        }
        return await  customersApis.fetchCustomerAuditTrailReport(authUser, values);
    },[authUser?.user, filters]);


    useEffect(() => {
        getAuditTrail(pageSize, activePage);
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
                            <CustomerActionButtons
                                {...{
                                    setFilters: handleOnSetFilters,
                                    setActivePage: handleSetActivePage,
                                    onChangeFilters: handleOnChangeFilters  ,
                                    onSearch: handleOnSearch,
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
                    <CustomerAuditTrailDatagrid
                        data={customerAuditTrail}
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

CustomerAuditTrailPage.getLayout = (page) => (
    <AuthGuard>
        <ModernLayout>
            {page}
        </ModernLayout>
    </AuthGuard>
);

export default CustomerAuditTrailPage;
