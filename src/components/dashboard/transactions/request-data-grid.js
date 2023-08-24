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
import {
  Grid,
  Autocomplete,
  TextField,
  Tabs,
  Tab,
  Card,
  Box,
} from "@mui/material";
import { getAllATMTransactionTypes } from "../../../slices/dashboard/transactions/all-transactions";
import { getAutoCompleteValue } from "../../../utils/fileHelper";
import {
  getAllRequestsById,
  getAllRequests,
} from "../../../slices/dashboard/transactions/request";
import { toast } from "react-toastify";

const DataGrid = dynamic(() => import("devextreme-react/data-grid"), {
  ssr: false,
});

const RequestDataGrid = (props) => {
  const { data, handleOnAdd } = props;
  const [selectedRole, setSelectedRole] = useState(null);
  const [value, setValue] = React.useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const { requests, idRequests } = useSelector(({ request }) => request);
  const dispatch = useDispatch();
  const authUser = useAuth();

  const { atmTransactionTypes } = useSelector(({ transaction }) => transaction);

  const handleOnClose = () => {
    setOpenDialog(false);
  };

  //   const actionsOptions = ({ data }) => {
  //     const handleOnEdit = () => {
  //       setSelectedRole(data);
  //       setOpenDialog(true);
  //     };
  //     return (
  //       <MKBox>
  //         {/*<Tooltip title="Edit">*/}
  //         {/*    <IconButton size={"small"} color={"info"} onClick={handleOnEdit}>*/}
  //         {/*        <Edit />*/}
  //         {/*    </IconButton>*/}
  //         {/*</Tooltip>*/}
  //         <MKButton
  //           onClick={handleOnEdit}
  //           variant={"outlined"}
  //           size={"small"}
  //           color={"info"}
  //         >
  //           Manage Permissions
  //         </MKButton>
  //       </MKBox>
  //     );
  //   };

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
        await dispatch(getAllRequestsById(authUser, values?.transactionId));
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
          <Tab onClick={() => setValue(0)} label="Live Requests" />
          <Tab onClick={() => setValue(1)} label="Request Reports" />
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

export default RequestDataGrid;
