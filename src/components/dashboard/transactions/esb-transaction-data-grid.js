import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Column, Item, SearchPanel, Toolbar } from "devextreme-react/data-grid";

import MKButton from "../../@mui-components/button";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import {
  Tabs,
  Tab,
  Card,
  Box,
  Grid,
  TextField,
  Autocomplete,
} from "@mui/material";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import { getAllATMTransactionTypes } from "../../../slices/dashboard/transactions/all-transactions";
import { getAllRequests } from "../../../slices/dashboard/transactions/request";
import * as yup from "yup";
import { useFormik } from "formik";
import { DatePicker } from "@mui/x-date-pickers";
import { toast } from "react-toastify";
import { downloadEsbTransactions } from "../../../redux/services/dashboard/transactions/all-transactions";
import useDownloader from "react-use-downloader";
import { saveAs } from "file-saver";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

export const EsbTransactionDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const [selectedRole, setSelectedRole] = useState(null);
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const { requests, idRequests } = useSelector(({ request }) => request);
  const { atmTransactionTypes } = useSelector(({ transaction }) => transaction);
  const dispatch = useDispatch();
  const authUser = useAuth();
  const { download } = useDownloader();

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  const filterSchema = yup.object({
    dateFrom: yup.string("Enter starting date").nullable(),
    dateTo: yup.string("Enter ending date").nullable(),
    trnType: yup.number("Enter transaction").nullable(),
  });

  const filterFormik = useFormik({
    initialValues: {
      dateFrom: "",
      dateTo: "",
      trnType: null,
    },
    validationSchema: filterSchema,
    onSubmit: async (values, helpers) => {
      try {
        const res = await downloadEsbTransactions(authUser, values);

        let filename = "Transactions.xlsx";
        let url = window.URL.createObjectURL(new Blob([res]));
        saveAs(url, filename);
        toast.success("Download successful");
      } catch (error) {
        console.log("ERROR ", error);
        toast.error("Something went wrong!");
      }
    },
  });

  const handleOnType = (event, value) => {
    if (value !== null) {
      filterFormik.setFieldValue("trnType", value.transactiontype);
    } else {
      filterFormik.setFieldValue("trnType", null);
    }
  };

  const fetchRequests = async () => {
    await dispatch(getAllRequests(authUser));
    await dispatch(getAllATMTransactionTypes(authUser));
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <>
      <Box sx={{ m: 2 }}>
        <Tabs
          sx={{ width: "100%" }}
          value={value}
          // onChange={handleOnChange}
          aria-label="members filters"
        >
          <Tab onClick={() => setValue(0)} label="Live Transactions" />
          <Tab onClick={() => setValue(1)} label="Transactions Reports" />
        </Tabs>
      </Box>

      <Card sx={{ p: 2, m: 2 }}>
        {value === 0 && (
          <>
            <DataGrid
              dataSource={requests}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              height={"70vh"}
            >
              <Column
                // cellRender={Selected}
                dataField="fromAccount"
                width={130}
                caption="From Account"
              />
              <Column
                dataField="transactionAmt"
                // cellRender={DiffCell}
                width={130}
                dataType="number"
                format="currency"
                caption="Amount"
              />
              <Column
                dataField="transactiondesc"
                width={130}
                caption="Transaction"
              />
              <Column
                dataField="clientNumber"
                width={120}
                caption="Client Number"
              />
              <Column
                dataField="externalRefNo"
                width={200}
                caption="Transaction Reference"
              />
              <Column
                dataField="transactionDate"
                alignment="right"
                dataType="datetime"
                width={180}
                format="d/MMM/yyyy, HH:mm"
              />
              <Column dataField="response" width={100} caption="Response" />
              <Column dataField="osErrMsg" caption="Response MSG" width={230} />
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
                {/* <Item location="after" name="searchPanel" /> */}
              </Toolbar>
            </DataGrid>
          </>
        )}
        {value === 1 && (
          <>
            <form onSubmit={filterFormik.handleSubmit}>
              <Grid
                sx={{ my: 2 }}
                container
                spacing={2}
                display={"flex"}
                alignItems={"center"}
              >
                <Grid item md={3} xs={12}>
                  <Autocomplete
                    fullWidth
                    options={atmTransactionTypes}
                    value={getAutoCompleteValue(
                      atmTransactionTypes,
                      filterFormik.values.trnType,
                      "transactiontype"
                    )}
                    getOptionLabel={(option) => option.transactiontypeDesc}
                    onChange={handleOnType}
                    renderInput={(params) => (
                      <TextField
                        fullWidth
                        sx={{ marginTop: 1, marginBottom: 1 }}
                        {...params}
                        label="Transaction type"
                      />
                    )}
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <DatePicker
                    fullWidth
                    disableFuture
                    label="Starting Date"
                    value={filterFormik.values.dateFrom}
                    onChange={(date) =>
                      filterFormik.setFieldValue("dateFrom", date)
                    }
                    renderInput={(params) => <TextField {...params} />}
                    error={
                      filterFormik.touched.dateFrom &&
                      Boolean(filterFormik.errors.dateFrom)
                    }
                    helperText={
                      filterFormik.touched.dateFrom &&
                      filterFormik.errors.dateFrom
                    }
                  />
                </Grid>
                <Grid item md={3} xs={12}>
                  <DatePicker
                    disableFuture
                    label="Ending Date"
                    fullWidth
                    value={filterFormik.values.dateTo}
                    onChange={(date) =>
                      filterFormik.setFieldValue("dateTo", date)
                    }
                    renderInput={(params) => <TextField {...params} />}
                    error={
                      filterFormik.touched.dateTo &&
                      Boolean(filterFormik.errors.dateTo)
                    }
                    helperText={
                      filterFormik.touched.dateTo && filterFormik.errors.dateTo
                    }
                  />
                </Grid>

                <Grid
                  item
                  md={3}
                  xs={12}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MKButton type="submit" color="primary" variant="contained">
                    Download Excel
                  </MKButton>
                </Grid>
              </Grid>
            </form>
            <DataGrid
              dataSource={idRequests}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              height={"70vh"}
            >
              <Column
                dataField="account"
                minWidth={130}
                caption="From Account"
              />
              <Column
                dataField="transactiondesc"
                minWidth={130}
                caption="Transaction"
              />
              <Column
                dataField="clientNumber"
                minWidth={120}
                caption="Client Number"
              />
              <Column
                dataField="transactionDate"
                alignment="right"
                minWidth={120}
                format="d/MMM/yyyy, HH:mm"
                dataType="date"
              />
              <Column dataField="ol_error" minWidth={100} caption="Response" />
              <Column
                dataField="os_err_msg"
                caption="Response MSG"
                minWidth={230}
              />{" "}
              <Toolbar></Toolbar>
            </DataGrid>
          </>
        )}

        {/* <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/> */}
      </Card>
    </>
  );
};
