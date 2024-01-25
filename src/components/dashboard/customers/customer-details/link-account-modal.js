import React, {useState} from "react";
import DialogContent from "@mui/material/DialogContent";
import MKButton from "../../../@mui-components/button";
import List from "@mui/material/List";
import LinkAccountComponent from "../link-account-component";
import {customersApis} from "../../../../api-requests/customers-api";
import {toast} from "react-toastify";
import {useAuth} from "../../../../hooks/use-auth";
import MKBox from "../../../@mui-components/box";
import SaveIcon from "@mui/icons-material/Save";
import DialogTitle from "@mui/material/DialogTitle";
import DMTDialog from "../../../@dmt-components/dialog";
import {LoaderIcon} from "react-hot-toast";

const LinkAccountModal = (props) => {
  const { cifResponse, data, onRefresh } = props;
  const [open, setOpen] = React.useState(false);
  const [ selectedAccounts, setSelectedAccounts] = useState([]);
  const authUser = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const onLinkAccounts = async () => {
      const formData = selectedAccounts.map((item) => {
          return {
              id:"",
              cif: item?.cif,
              accountName: item?.longname,
              customerId: cifResponse?.customerId,
              accountNumber: item?.account,
              branchCode: item?.branch,
              accountLongName: item?.longname,
              aliasName: item?.longname,
              secondaryAliasName:  item?.longname,
              currency: item?.currencyCode,
              accountType: item?.ciftype,
              accountStatus: item?.status,
              userId: authUser?.user?.userid,
              registeredForUSSD: true,
              registeredForAPP: true,
          }
      } );
      setIsLoading(true);
        try {
            const res = await customersApis.linkAccounts(authUser, formData);
            if (res.success) {
                toast.success(Boolean(res?.errorMessage) ? res?.errorMessage : "Account(s) linked successfully!");
                handleClose();
                await onRefresh?.();
            } else {
                toast.error(res?.errorMessage ?? "An error occurred while processing request!");
            }
        } catch (err) {
            console.log("LINK_ACCOUNT_ERROR ", err);
        }
        setIsLoading(false);
    };
  const onSelectAccount = (values) => {
      let data = [...selectedAccounts];
      const exists = data.some(datum => datum?.account === values.account)
      if (exists){
          data = data.filter((datum) => datum.account !== values.account )
      }
      else{
          data.push(values);
      }
      setSelectedAccounts(data);
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MKButton
        onClick={handleClickOpen}
        color="primary"
        disabled={!Boolean(cifResponse?.custExist)}
        size="small"
        variant="contained"
      >
        Link Account
      </MKButton>
      <DMTDialog
        maxWidth="sm"
        fullWidth
        open={open}
        //onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <DialogTitle>
              {"Account List"}
          </DialogTitle>
        <DialogContent>
          <MKBox>
            <List component="nav" aria-label="main mailbox folders">
              {data?.map((item, index) => (
                <LinkAccountComponent
                    key={index} item={item}
                    onSelect={onSelectAccount}
                    selectedAccounts={selectedAccounts}
                />
              ))}
            </List>
          </MKBox>
            <MKBox sx={{ mt:2, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap:2}}>
                <MKButton  disabled={ isLoading } size={'small'} variant={'outlined'} color={'error'} onClick={handleClose}>
                    {"Cancel"}
                </MKButton>
                <MKButton
                    size={'small'}
                    variant={'contained'}
                    color={'success'}
                    onClick={onLinkAccounts}
                    startIcon={isLoading ? <LoaderIcon/> : <SaveIcon/>}
                    disabled={isLoading || Boolean(selectedAccounts.length <= 0)}
                >
                    {"Save"}
                </MKButton>
            </MKBox>
        </DialogContent>
      </DMTDialog>
    </>
  );
};

export default LinkAccountModal;
