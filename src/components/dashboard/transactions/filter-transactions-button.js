import React, { useState, useEffect } from "react";
import { Download, Search } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import useDownloader from "react-use-downloader";
import {
  Autocomplete,
  Grid,
  Paper,
  Popover,
  Button,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import MKButton from "../../@mui-components/button";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import { DatePicker } from "@mui/x-date-pickers";
import * as yup from "yup";
import { useFormik } from "formik";
import { filterAllTransactions, getAllATMTransactionTypes } from "../../../slices/dashboard/transactions/all-transactions";
import { filterTransactions } from "../../../redux/services/dashboard/transactions/all-transactions";
import { toast } from "react-toastify";


const FilterTransactionsButton = (props) => {
  const { reportCode, label } = props;
  const [loading, setLoading] = useState(false);
  const { download } = useDownloader();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const authUser = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const initialFilters = {
    placeCensus: null,
    registered: null,
    periodFrom: null,
    periodTo: null,
    memberType: 0,
  };
  const [filters, setFilters] = useState(initialFilters);
  const { atmTransactionTypes } = useSelector(({ transaction }) => transaction);
  const [responseData, setResponseData] = useState([]);


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
        await dispatch(filterAllTransactions(authUser, values));
        toast.success("Data retrieved successfully");
      } catch (error) {
        console.log("ERROR ",error)
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

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleOnStartDate = (value) => {
    if (filters.periodTo === null || filters.periodTo < value) {
      setFilters({
        ...filters,
        periodFrom: value,
        periodTo: value,
      });
      return;
    }
    setFilters({
      ...filters,
      periodFrom: value,
    });
  };

  const handleReset = () => {
    setFilters(initialFilters);
  };

  const handleOnStopDate = (value) => {
    console.log(value);
    if (filters.periodTo === null || filters.periodTo > value) {
      setFilters({
        ...filters,
        periodFrom: value,
        periodTo: value,
      });
      return;
    }
    setFilters({
      ...filters,
      periodTo: value,
    });
  };

  const downloadReport = async () => {
    setLoading(true);
    const formData = {
      cycleId: null,
      reportType: REPORT_TYPE.EXCEL,
      reportCode: reportCode,
      memberType: filters.memberType,
      placeCensus: filters.placeCensus,
      registered: filters.registered,
      periodFrom: filters.periodFrom,
      periodTo: filters.periodTo,
    };
    try {
      const res = await dispatch(getCycleReport(authUser, formData));
      if (res?.success) {
        if (res?.data) {
          await download(res?.data, `${res?.name}${res?.extension}`);
          toast.success(res?.message);
          setLoading(false);
          return;
        }
        toast.error(res?.message ?? "An error occurred while downloading");
      } else {
        toast.error(res?.message ?? "An error occurred while downloading");
      }
    } catch (e) {
      toast.error(e.message);
    }
    setLoading(false);
  };

  const fetchTransactions = async () => {
    await dispatch(getAllATMTransactionTypes(authUser));
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <Button
        aria-describedby={"report_popover"}
        onClick={handleClick}
        // color={"primary"}
        variant={"contained"}
        startIcon={<Download />}
      >
        {label}
      </Button>
      <Popover
        id={"report_popover"}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ p: 2, width: "500px" }}>
          <form onSubmit={filterFormik.handleSubmit}>
            <Grid container spacing={2} display={"flex"} alignItems={"center"}>
              <Grid item md={6} xs={12}>
                <DatePicker
                  disableFuture
                  label="Starting Date"
                  fullWidth
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
              <Grid item md={6} xs={12}>
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
              <Grid item md={12} xs={12}>
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
                      label="Transactions"
                    />
                  )}
                />
              </Grid>
              <Grid item md={12} xs={12} sx={{display:'flex',alignItems:'center',justifyContent:'flex-end'}}>
                <MKButton
                  type="submit"
                  color="primary"
                  size="small"
                  variant="contained"
                >
                  Filter
                </MKButton>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Popover>
    </>
  );
};

export default FilterTransactionsButton;
