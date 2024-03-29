import React, {useEffect, useState} from "react";
import {Card, Grid} from "@mui/material";
import MKTypography from "../../../components/@mui-components/typography";
import ModernLayout from "../../../components/layouts/modern";
import MKBox from "../../../components/@mui-components/box";
import Head from "next/head";
import {useDispatch, useSelector} from "../../../store";
import {useAuth} from "../../../hooks/use-auth";
import {getUpdatedCustomers} from "../../../slices/dashboard/customers";
import CustomerActionsButton from "../../../components/dashboard/customers/filters/customer-actions-button";
import EditedCustomersDataGrid from "../../../components/dashboard/customers/customer-datagrids/edited-customers-datagrid";
import {AuthGuard} from "../../../hocs/auth-guard";
import RoleBasedGuard from "../../../hocs/role-based-guard";
import {PAGES_PATHS} from "../../../utils/constants";

const title = "Updated Customers List";
const NewCustomers = () => {
    const initialFilters = {
        name: "",
        idnumber: "",
        phonenumber: "",
        cifNumber: "",
        email: "",
    }
    const [filters, setFilters] = useState(initialFilters);
    const dispatch = useDispatch();
    const { updatedCustomers , pageSize, currentPage} = useSelector(( { customers }) => customers);
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
        await dispatch(getUpdatedCustomers(authUser,values ))
    }

    const handleOnSearch = async () => {
        await fetchUpdatedCustomers();
    }

    const fetchUpdatedCustomers = async () => {
        const values = {
            ...filters,
            pageSize,
            pageNumber: currentPage,
        }
        await dispatch(getUpdatedCustomers(authUser,values ))
    }


    useEffect(() => {
        fetchUpdatedCustomers();
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
                    <Grid container justifyContent="space-between"  alignItems="center" spacing={2}>
                        <Grid item>
                            <MKTypography variant="h5">{title}</MKTypography>
                        </Grid>
                        <Grid item>
                            <CustomerActionsButton {...{
                                filters,
                                onChangeFilters: handleOnChangeFilters,
                                onResetFilters: handleOnResetFilters,
                                onSearch: handleOnSearch
                            }} />
                        </Grid>
                    </Grid>
                </MKBox>
                <Card sx={{ p: 1 }}>
                    <EditedCustomersDataGrid data={updatedCustomers} onRefresh={fetchUpdatedCustomers} />
                </Card>
            </MKBox>

        </>
    );
};

NewCustomers.getLayout = (page) => {
    return (
        <>
            <AuthGuard>
                <ModernLayout>
                    <RoleBasedGuard path={PAGES_PATHS.APPROVE_EDITED_CUSTOMERS} page={true}>
                        {page}
                    </RoleBasedGuard>
                </ModernLayout>
            </AuthGuard>
        </>
    );
};

export default NewCustomers;
