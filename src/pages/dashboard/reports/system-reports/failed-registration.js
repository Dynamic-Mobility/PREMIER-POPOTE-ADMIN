import React, {useCallback, useEffect, useState} from "react";
import { Card, Grid } from "@mui/material";
import MKTypography from "../../../../components/@mui-components/typography";
import ExistingCustomersDatagrid from "../../../../components/dashboard/customers/customer-datagrids/existing-customers-datagrid";
import ModernLayout from "../../../../components/layouts/modern";
import Head from "next/head";
import CustomerActionsButton from "../../../../components/dashboard/customers/filters/customer-actions-button";
import MKBox from "../../../../components/@mui-components/box";
import {useDispatch, useSelector} from "../../../../store";
import {getFailedRegistrations} from "../../../../slices/dashboard/customers";
import {useAuth} from "../../../../hooks/use-auth";
import {AuthGuard} from "../../../../hocs/auth-guard";
import FailedRegistrationsDatagrid
    from "../../../../components/dashboard/reports/system-reports/failed-registration-datagrid";
import {customersApis} from "../../../../api-requests/customers-api";

const title = "Failed Registrations";

const FailedRegistrationPage = () => {
    const initialFilters = {
        name: "",
        idnumber: "",
        phonenumber: "",
        cifNumber: "",
        email: "",
    }
    const [filters, setFilters] = useState(initialFilters);
    const dispatch = useDispatch();
    const { failedRegistrations, pageSize, currentPage} = useSelector(( { customers }) => customers);
    const authUser = useAuth();

    const handleOnChangeFilters = values => {
        setFilters(values);
    }

    const handleOnResetFilters = async () => {
        setFilters(initialFilters);
        const values = {
            ...initialFilters,
            pageSize,
            pageNumber: currentPage,
        }
        await dispatch(getFailedRegistrations(authUser,values ))
    }

    const handleOnSearch = async () => {
        await fetchFailedRegistrations();
    }

    const fetchFailedRegistrations = async () => {
        const values = {
            ...filters,
            pageSize,
            pageNumber: currentPage,
        }
        await dispatch(getFailedRegistrations(authUser,values ))
    }

    const getCustomerReports = useCallback(async (filters, reportType) => {
        const values = {
            ...filters,
            reportType,
            pageSize,
            pageNumber: currentPage,
        }
        return await  customersApis.fetchFailedRegistrationsReport(authUser, values);
    },[authUser?.user]);

    useEffect(() => {
        fetchFailedRegistrations();
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
                            <CustomerActionsButton {...{
                                filters,
                                onExport: reportType => getCustomerReports(filters, reportType),
                                onChangeFilters: handleOnChangeFilters,
                                onResetFilters: handleOnResetFilters,
                                onSearch: handleOnSearch
                            }} />
                        </Grid>
                    </Grid>
                </MKBox>
                <Card sx={{ p: 1 }}>
                    <FailedRegistrationsDatagrid data={failedRegistrations} />
                </Card>
            </MKBox>

        </>
    );
};

FailedRegistrationPage.getLayout = (page) => {
    return (
        <>
            <AuthGuard>
                <ModernLayout>{page}</ModernLayout>
            </AuthGuard>
        </>
    );
};

export default FailedRegistrationPage;
