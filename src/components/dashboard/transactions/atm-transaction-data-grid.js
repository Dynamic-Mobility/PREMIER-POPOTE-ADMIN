import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Column, Item, SearchPanel, Toolbar } from "devextreme-react/data-grid";
import MKBox from "../../@mui-components/box";
import { Add } from "@mui/icons-material";
import MKButton from "../../@mui-components/button";
// import PermissionsForm from "./permissions-form";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import { getAllTransactionTypes } from "../../../slices/dashboard/transactions/all-transactions";
import { Grid, Autocomplete, TextField } from "@mui/material";
import {
  fetchAllAtmReports,
  getATMByType,
} from "../../../slices/dashboard/transactions/atm-report";
import { getAutocompleteMultipleValues } from "../../../utils/fileHelper";
import DMTDatePicker from "../../@dmt-components/form/datepicker";
import DMTTextInput from "../../@dmt-components/form/text-input";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const AtmTransactionDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const [selectedRole, setSelectedRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const { transactionTypes } = useSelector(({ transaction }) => transaction);

  const handleOnClose = () => {
    setOpenDialog(false);
  };

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
      .string()
      .nullable()
      .required("Transaction type is required"),
    dateFrom: yup.string().nullable().required("Date is required"),
    dateTo: yup.string().nullable().required("Date is required"),
    channel: yup.array().nullable(),
  });

  const formik = useFormik({
    initialValues: {
      transactionId: null,
      dateFrom: null,
      dateTo: null,
      channel: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values, helpers) => {
      console.log("VALUES ", values);
      try {
        await dispatch(fetchAllAtmReports(authUser, values));
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

  const handleOnTypeChange = (e, values) => {
    if (values) {
      const data = [];
      values.map((value) => data.push(value.channel));
      formik.setFieldValue("channel", data);
    } else {
      formik.setFieldValue("channel", null);
    }
  };

  const handleOnStartDate = (value) => {
    if (formik.values.dateFrom === "" || formik.values.dateFrom < value) {
      formik.setFieldValue("dateFrom", value);
    }
    formik.setFieldValue("dateFrom", value);
  };
  
  const handleOnStopDate = (value) => {
    if (formik.values.dateTo === "" || formik.values.dateTo > value) {
      formik.setFieldValue("dateTo", value);
    }
    formik.setFieldValue("dateTo", value);
  };

  // channel types
  const channelTypes = [];

  useEffect(() => {
    dispatch(getAllTransactionTypes(authUser));
  }, []);

  return (
    <>
      {/* <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} display={"flex"} alignItems={"center"}>
          <Grid item md={10} xs={12}>
            <Autocomplete
              fullWidth
              options={transactionTypes}
              width={"400px"}
              value={getAutoCompleteValue(
                transactionTypes,
                formik.values.transactionId,
                'transactiontype'
              )}
              getOptionLabel={(option) => option.transactiontypeDesc}
              onChange={handleOnTransactionType}
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
              Search
            </MKButton>
          </Grid>
        </Grid>
      </form> */}
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} display={"flex"} alignItems={"center"}>
          <Grid item md={2} xs={12}>
            <DMTDatePicker
              label={"Start Date"}
              fullWidth
              margin={"normal"}
              disablePast={true}
              name={""}
              value={formik.values.dateFrom}
              onChange={(value) => handleOnStartDate(value)}
              onBlur={formik.handleBlur}
              error={Boolean(
                formik.touched.dateFrom && formik.errors.dateFrom
              )}
              helperText={formik.touched.dateFrom && formik.errors.dateFrom}
            />
            
          </Grid>
          <Grid item md={2} xs={12}>
            <DMTDatePicker
              label={"End Date"}
              fullWidth
              margin={"normal"}
              disablePast={true}
              name={""}
              value={formik.values.dateTo}
              onChange={(value) => handleOnStopDate(value)}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.dateTo && formik.errors.dateTo)}
              helperText={formik.touched.dateTo && formik.errors.dateTo}
            />
            
          </Grid>

          <Grid item md={3} xs={12}>
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
              onChange={handleOnTransactionType}
              renderInput={(params) => (
                <DMTTextInput
                  fullWidth
                  sx={{ marginTop: 1, marginBottom: 1 }}
                  {...params}
                  label="Transaction Type"
                />
              )}
            />
          </Grid>
          <Grid item md={3} xs={12}>
            <Autocomplete
              options={channelTypes}
              autoHighlight
              onChange={handleOnTypeChange}
              multiple
              value={getAutocompleteMultipleValues(
                formik.values.channel,
                channelTypes,
                "channel"
              )}
              getOptionLabel={(option) =>
                option?.pensionerType_name?.toUpperCase()
              }
              renderInput={(params) => (
                <DMTTextInput
                  {...params}
                  label={"Channels"}
                  fullWidth={true}
                  error={Boolean(
                    formik.touched.channel && formik.errors.channel
                  )}
                  onBlur={formik.handleBlur}
                  helperText={formik.touched.channel && formik.errors.channel}
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: "off", // disable autocomplete and autofill
                  }}
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
        showColumnLines={true}
        showRowLines={true}
        height={"70vh"}
      >
        {/* <SearchPanel visible={true} highlightCaseSensitive={true} /> */}
        <Column dataField="name" caption="Account Affected" width={180} />
        <Column dataField="description" caption="Card No" width={180} />
        <Column dataField="description" caption="Amount" width={180} />
        <Column dataField="description" caption="Trn Location" width={180} />
        <Column
          dataField="description"
          caption="Transaction Refrence"
          width={180}
        />
        <Column dataField="description" caption="From Switch" width={180} />
        <Column dataField="description" caption="Response" width={180} />
        <Column dataField="description" caption="Imal Response" width={180} />
        <Column dataField="description" caption="Response MSG" width={180} />

        <Toolbar>{/* <Item location="after" name="searchPanel" /> */}</Toolbar>
      </DataGrid>
      {/* <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/> */}
    </>
  );
};

export default AtmTransactionDataGrid;
