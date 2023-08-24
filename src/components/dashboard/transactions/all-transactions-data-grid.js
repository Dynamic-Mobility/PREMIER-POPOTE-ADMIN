import React, { useState, useEffect } from "react";
import { Column, Item, SearchPanel, Toolbar } from "devextreme-react/data-grid";
import MKButton from "../../@mui-components/button";
// import PermissionsForm from "./permissions-form";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/use-auth";
import {
  getAllATMTransactionTypes,
  getAllTransactionsById,
} from "../../../slices/dashboard/transactions/all-transactions";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import { Card, Tabs, Box, Tab } from "@mui/material";
import { filterTransactions } from "../../../redux/services/dashboard/transactions/all-transactions";
import { DataGrid } from "devextreme-react";
import { DatePicker } from "@mui/x-date-pickers";
import FilterTransactionsButton from "./filter-transactions-button";
import TransactionsDetails from "./all-transactions-details";

const TransactionDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const [selectedRole, setSelectedRole] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [responseData, setResponseData] = useState([]);
  const [value, setValue] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { transactions, filterTransactionsResponse } = useSelector(
    ({ transaction }) => transaction
  );

  const handleOnClose = () => {
    setOpenDrawer(false);
  };

  const datum = [
    {
      fromAccount: "21213131331313",
      amount: "3000",
      transaction: "Transaction",
      client: "Jared",
      refrence: "21133",
      date: "03/11/2022",
      response: "This is a response",
    },
    {
      fromAccount: "212131321",
      amount: "3000",
      transaction: "Transaction",
      client: "Jared",
      refrence: "21133",
      date: "03/11/2022",
      response: "This is a response",
    },
  ];
  const { atmTransactionTypes } = useSelector(({ transaction }) => transaction);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);

  const label = "Apply Filters";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const dispatch = useDispatch();
  const authUser = useAuth();

  const fetchTransactions = async () => {
    await dispatch(getAllATMTransactionTypes(authUser));
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
      console.log("values", values);
      try {
        await dispatch(getAllTransactionsById(authUser, values?.transactionId));
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
      <Box sx={{ m: 2 }}>
        <Tabs sx={{ width: "100%" }} value={value} aria-label="members filters">
          <Tab onClick={() => setValue(0)} label="Active Transactions" />
          <Tab onClick={() => setValue(1)} label="Filter Transactions" />
        </Tabs>
      </Box>
      <Card sx={{ p: 2, m: 2 }}>
        {value === 0 && (
          <>
            <DataGrid
              dataSource={datum}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              height={"70vh"}
            >
              <Column
                cellRender={selected}
                dataField="fromAccount"
                caption="From Account"
                width={180}
              />
              <Column dataField="amount" caption="Amount" />
              <Column dataField="transaction" caption="Transaction" />
              <Column dataField="client" caption="Client Number" />
              <Column dataField="reference" caption="Transaction Refrence" />
              <Column dataField="date" caption="Transaction Date" />
              <Column dataField="response" caption="Response" />
            </DataGrid>
            <TransactionsDetails
              {...{
                open: openDrawer,
                onClose: handleOnClose,
                transaction: selectedTransaction,
              }}
            />
          </>
        )}
        {value === 1 && (
          <>
            <DataGrid
              dataSource={datum}
              allowColumnReordering={true}
              rowAlternationEnabled={true}
              showBorders={true}
              height={"70vh"}
            >
              <Column
                cellRender={selected}
                dataField="fromAccount"
                caption="From Account"
                width={180}
              />
              <Column dataField="amount" caption="Amount" />
              <Column dataField="transaction" caption="Transaction" />
              <Column dataField="client" caption="Client Number" />
              <Column dataField="reference" caption="Transaction Refrence" />
              <Column dataField="date" caption="Transaction Date" />
              <Column dataField="response" caption="Response" />
              <Toolbar>
                <Item location="after">
                  <FilterTransactionsButton {...{ label }} />
                </Item>
                <Item location="after" name="searchPanel" />
              </Toolbar>
            </DataGrid>
            <TransactionsDetails
              {...{
                open: openDrawer,
                onClose: handleOnClose,
                transaction: selectedTransaction,
              }}
            />
          </>
        )}
      </Card>

      {/* <PermissionsForm {...{ open: openDialog, onClose: handleOnClose, role: selectedRole }}/> */}
    </>
  );
};

export default TransactionDataGrid;
