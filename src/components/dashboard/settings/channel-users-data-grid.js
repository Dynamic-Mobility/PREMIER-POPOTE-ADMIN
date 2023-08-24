import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Column, Item, Toolbar } from "devextreme-react/data-grid";

import MKBox from "../../@mui-components/box";
import { Add } from "@mui/icons-material";
import MKButton from "../../@mui-components/button";
// import PermissionsForm from "./permissions-form";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { getAllTransactions } from "../../../slices/dashboard/transactions/all-transactions";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import { Grid, Autocomplete, TextField, Card } from "@mui/material";
import AddChannelUser from "../../../pages/dashboard/settings/addChannelUser";


const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const ChannelUsersDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const [selectedRole, setSelectedRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState(0);
  const { transactions } = useSelector(({ transaction }) => transaction);
  const { transactionTypes } = useSelector(({ transaction }) => transaction);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  const fetchTransactions = async () => {
    await dispatch(getAllTransactions(authUser));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // const actionsOptions = ({ data }) => {
  //     const handleOnEdit = () => {
  //         setSelectedRole(data);
  //         setOpenDialog(true);
  //     }
  //     return (
  //         <MKBox>
  //             {/*<Tooltip title="Edit">*/}
  //             {/*    <IconButton size={"small"} color={"info"} onClick={handleOnEdit}>*/}
  //             {/*        <Edit />*/}
  //             {/*    </IconButton>*/}
  //             {/*</Tooltip>*/}
  //             <MKButton onClick={handleOnEdit} variant={'outlined'} size={'small'} color={'info'}>
  //                 Manage Permissions
  //             </MKButton>
  //         </MKBox>
  //     );
  // };

  const validationSchema = yup.object({
    transactionId: yup
      .number("Enter transaction")
      .nullable()
      .required("Transaction Type is required"),
  });

  const formik = useFormik({
    initialValues: {
      transactionId: null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      try {
        await dispatch(getATMByType(authUser, values));
        helpers.resetForm();
        toast.success("Data retrieved successfully");
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
  });

  const handleOnTransactionType = (event, value) => {
    if (value !== null) {
      formik.setFieldValue("transactionId", value.transactiontype);
    } else {
      formik.setFieldValue("transactionId", null);
    }
  };

  return (
    <>
      <Card sx={{ p: 2, m: 2 }}>
        {value === 0 && (
          <>
            <DataGrid
              // dataSource={data}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              height={"70vh"}
            >
              {/* <SearchPanel visible={true} highlightCaseSensitive={true} /> */}
              <Column dataField="name" caption="Name" />
              <Column dataField="amount" caption="Configuration" />
              <Column dataField="transaction" caption="Username" />
              <Column dataField="client" caption="PartnerId" />
              <Toolbar>
                <Item location="before">
                  <AddChannelUser />
                </Item>
                <Item location="after" name="searchPanel" />
              </Toolbar>
            </DataGrid>
          </>
        )}
        {value === 1 && (
          <>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Grid item md={3} xs={12}>
                  <TextField
                    label={"Date From"}
                    name="actionDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // onChange={handleOnDateChange}
                    fullWidth
                    type="date"
                    // value={riskDetails?.additionalControlActions[index]?.actionDate}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <TextField
                    label={"Date To"}
                    name="actionDate"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // onChange={handleOnDateChange}
                    fullWidth
                    type="date"
                    // value={riskDetails?.additionalControlActions[index]?.actionDate}
                    variant="outlined"
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <Autocomplete
                    fullWidth
                    //   options={sponsors}
                    width={"400px"}
                    //   value={getAutoCompleteValue(sponsors, formik.values.sponsorId)}
                    getOptionLabel={(option) => option.name}
                    //   onChange={handleOnSponsorId}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        sx={{ marginTop: 1, marginBottom: 1 }}
                        {...params}
                        label="Transaction Type"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <MKButton type="submit" color="primary" variant="contained">
                    Filter
                  </MKButton>
                </Grid>
              </Grid>
            </form>
            <DataGrid
              // dataSource={data}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              height={"70vh"}
            >
              {/* <SearchPanel visible={true} highlightCaseSensitive={true} /> */}
              <Column dataField="name" caption="From Account" />
              <Column dataField="amount" caption="Amount" />
              <Column dataField="transaction" caption="Transaction" />
              <Column dataField="client" caption="Client Number" />
              <Column dataField="refrence" caption="Transaction Reference" />
              <Column dataField="date" caption="Transaction Date" />
              <Column dataField="response" caption="Response" />
              <Toolbar>
                {/* <Item location="before">
                        <MKButton
                            onClick={handleOnAdd}
                            color={'primary'}
                            variant={'contained'}
                            startIcon={<Add/>}>
                            Add User
                        </MKButton>
                    </Item> */}
                <Item location="after" name="searchPanel" />
              </Toolbar>
            </DataGrid>
          </>
        )}
        {value === 2 && (
          <>
            <form onSubmit={formik.handleSubmit}>
              <Grid
                container
                spacing={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Grid item md={10} xs={12}>
                  <Autocomplete
                    fullWidth
                    options={transactionTypes}
                    width={"400px"}
                    value={getAutoCompleteValue(
                      transactionTypes,
                      formik.values.transactionId,
                      "transactiontype"
                    )}
                    getOptionLabel={(option) => option.transactiontypeDesc}
                    // onChange={handleOnTransactionType}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        sx={{ marginTop: 1, marginBottom: 1 }}
                        {...params}
                        label="Transactions"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={2} xs={12}>
                  <MKButton type="submit" color="primary" variant="contained">
                    Search
                  </MKButton>
                </Grid>
              </Grid>
            </form>
            <DataGrid
              // dataSource={data}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              height={"70vh"}
            >
              {/* <SearchPanel visible={true} highlightCaseSensitive={true} /> */}
              <Column dataField="name" caption="From Account" />
              <Column dataField="amount" caption="Amount" />
              <Column dataField="transaction" caption="Transaction" />
              <Column dataField="client" caption="Client Number" />
              <Column dataField="reference" caption="Transaction Refrence" />
              <Column dataField="date" caption="Transaction Date" />
              <Column dataField="response" caption="Response" />
              <Toolbar>
                {/* <Item location="before">
                        <MKButton
                            onClick={handleOnAdd}
                            color={'primary'}
                            variant={'contained'}
                            startIcon={<Add/>}>
                            Add User
                        </MKButton>
                    </Item> */}
                <Item location="after" name="searchPanel" />
              </Toolbar>
            </DataGrid>
          </>
        )}
      </Card>

      {/* <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/> */}
    </>
  );
};

export default ChannelUsersDataGrid;
