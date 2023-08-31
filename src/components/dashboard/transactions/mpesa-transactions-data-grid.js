import React, { useState } from "react";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import {
  Grid,
  Autocomplete,
  TextField,
  Card,
  Tabs,
  Box,
  Tab,
  Button, Collapse,
} from "@mui/material";
import {
  Column,
  HeaderFilter,
  Toolbar,
  DataGrid,
  Grouping,
  GroupPanel,
} from "devextreme-react/data-grid";
import moment from "moment";
import * as yup from "yup";
import { useFormik } from "formik";
import { DatePicker, DateTimePicker } from "@mui/x-date-pickers";
import { fetchMpesaTransactions } from "../../../redux/services/dashboard/transactions/mpesa-transactions";
import { useAuth } from "../../../hooks/use-auth";
import { toast } from "react-toastify";
import { LoadingButton } from "@mui/lab";
import { Filter1Outlined } from "@mui/icons-material";
import MpesaDetails from "./mpesa-details-datagrid";
import MKButton from "../../@mui-components/button";
import ExcelExportButton from "../../@dmt-components/export-button";
import DMTChip from "../../@dmt-components/chip";


const MpesaTransactionDataGrid = props => {
  const { showFilters } = props;
  const [responseData, setResponseData] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const authUser = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);


  const handleOnClose = () => {
    setOpenDrawer(false);
  };


  const filterSchema = yup.object({
    dateRange: yup.object({
      datefrom: yup.string("Enter starting date").nullable(),
      dateTo: yup.string("Enter ending date").nullable(),
    }),
    partnerId: yup.string("Enter partner ID").nullable(),
    showCurrent: yup.boolean(),
  });

  const filterFormik = useFormik({
    initialValues: {
      dateRange: {
        datefrom: "",
        dateTo: "",
      },
      partnerId: "",
      showCurrent: false,
    },
    validationSchema: filterSchema,
    onSubmit: async (values, helpers) => {
      const formattedValues = {
        ...values,
        dateRange: {
          datefrom: values.dateRange.datefrom
            ? moment(values.dateRange.datefrom).format("DD MMM YYYY HH:mm")
            : null,
          dateTo: values.dateRange.dateTo
            ? moment(values.dateRange.dateTo).format("DD MMM YYYY HH:mm")
            : null,
        },
      };



      try {
        const res = await fetchMpesaTransactions(authUser, formattedValues);
        setResponseData(res);
        toast.success("Data retrieved successfully");
      } catch (error) {
        console.log("ERROR ", error);
        toast.error("Something went wrong!");
      }
    },
  });

  const displayData = ({ displayValue }) => {
    if (!displayValue) {
      return "-";
    }
    return displayValue;
  };

  const formatAmount = ({ data, displayValue }) => {
    let color = 'info';
    return (
        <DMTChip
            numeral={true}
            label={displayValue}
            color={color}
            variant={"outlined"}
        />
    )
  }

  const selected = ({ displayValue, data }) => {
    const handleOnSelect = () => {
      setOpenDrawer(true);
      setSelectedTransaction(data);
    };

    return (
      <>
        <MKButton
          onClick={handleOnSelect}
          sx={{ fontSize: "inherit" }}
          variant={"text"}
          color={"info"}
        >
          {displayValue}
        </MKButton>
      </>
    );
  };

  return (
    <>
      <Collapse in={showFilters}>
        <form onSubmit={filterFormik.handleSubmit}>
          <Grid
              container
              sx={{ mb: 2 }}
              spacing={2}
              display={"flex"}
              alignItems={"center"}
          >
            <Grid item md={4} xs={12}>
              <DateTimePicker
                  disableFuture
                  label="Starting Date"
                  inputFormat="dd-MMM-yyyy hh:mm a"
                  fullWidth
                  value={filterFormik.values.dateRange.datefrom}
                  onChange={(date) =>
                      filterFormik.setFieldValue("dateRange.datefrom", date)
                  }
                  renderInput={(params) => <TextField {...params} />}
                  error={
                      filterFormik.touched.dateRange?.datefrom &&
                      Boolean(filterFormik.errors.dateRange?.datefrom)
                  }
                  helperText={
                      filterFormik.touched.dateRange?.datefrom &&
                      filterFormik.errors.dateRange?.datefrom
                  }
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <DateTimePicker
                  disableFuture
                  label="Ending Date"
                  inputFormat="dd-MMM-yyyy hh:mm a"
                  fullWidth
                  value={filterFormik.values.dateRange.dateTo}
                  onChange={(date) =>
                      filterFormik.setFieldValue("dateRange.dateTo", date)
                  }
                  renderInput={(params) => <TextField {...params} />}
                  error={
                      filterFormik.touched.dateRange?.dateTo &&
                      Boolean(filterFormik.errors.dateRange?.dateTo)
                  }
                  helperText={
                      filterFormik.touched.dateRange?.dateTo &&
                      filterFormik.errors.dateRange?.dateTo
                  }
              />
            </Grid>
            <Grid item md={2} xs={12}>
              <LoadingButton
                  type="submit"
                  loading={filterFormik.isSubmitting}
                  color="primary"
                  size="small"
                  variant="contained"
                  startIcon={<Filter1Outlined />}
                  loadingPosition={"start"}
              >
                {filterFormik.isSubmitting ? "Filtering" : "Filter"}
              </LoadingButton>
            </Grid>
            <Grid item md={2} xs={12}>
              <ExcelExportButton
                  label={'Export to Excel'}
                  apiData={responseData}
              />
            </Grid>

          </Grid>
        </form>
      </Collapse>

      <DataGrid
        dataSource={responseData}
        allowColumnReordering={true}
        rowAlternationEnabled={true}
        showBorders={true}
        showColumnLines={true}
        showRowLines={true}
        height={"70vh"}
      >
        <HeaderFilter visible={true} allowSearch={true} />
        <Grouping autoExpandAll={false} />
        <GroupPanel visible={false} />
        {/*<Column dataField="name" caption="Batch Ref." width={180} />*/}
        <Column
          cellRender={selected}
          dataField="paymentTransactionId"
          caption="Trx Ref."
          width={180}
        />
        <Column
          dataField="initiatorName"
          cellRender={displayData}
          caption="Initiator Name"
          width={180}
        />
        <Column
          dataField="recipientPhone"
          cellRender={displayData}
          caption="Recipient Phone"
          width={180}
        />
        <Column
            format={formatAmount}
            dataField="amount"
            key="Amount"
            caption="Amount"
            minWidth={180}
        />
        <Column
          dataField="responseDescription"
          caption="Response Description"
          minWidth={200}
          allowFiltering={false}
          cellRender={displayData}
        />
        <Column
          dataField="transactionStatus"
          key="Status"
          caption="Status"
          minWidth={120}
        />
        <Column
          dataField="createdOn"
          key="createdOn"
          caption="Trx Date"
          dataType="datetime"
          minWidth={160}
          allowFiltering={false}
        />

        <Toolbar>{/* <Item location="after" name="searchPanel" /> */}</Toolbar>
      </DataGrid>
      <MpesaDetails
        {...{
          open: openDrawer,
          onClose: handleOnClose,
          transaction: selectedTransaction,
        }}
      />
    </>
  );
};

export default MpesaTransactionDataGrid;
