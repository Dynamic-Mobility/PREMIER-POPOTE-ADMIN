import LinkAccountComponent from "../link-account-component";
import {useState} from "react";
import MKBox from "../../../@mui-components/box";
import MKButton from "../../../@mui-components/button";
import {useAuth} from "../../../../hooks/use-auth";
import {getBrowserDetails, getIPAddress} from "../../../../utils/helper-functions";
import {customersApis} from "../../../../api-requests/customers-api";
import {LoaderIcon, toast} from "react-hot-toast";

const AccountsSelectionList = props => {
    const { accounts, onRefresh, onClose } = props;
    const [selectedAccounts, setSelectedAccounts] = useState([]);
    const authUser = useAuth();
    const [isLoading, setIsLoading]  = useState(false);

    const onSelectAccount = (values) => {
        let data = [...selectedAccounts];
        const exists = data.some(datum => datum?.id === values?.id)
        if (exists){
            data = data.filter((datum) => datum?.id !== values.id )
        }
        else{
            data.push(values);
        }
        setSelectedAccounts(data);
    }

    const handleOnApprove = async () => {
        setIsLoading(true);
        const browser =  getBrowserDetails();
        const ipAddress = await getIPAddress();
        try{
            const formData = selectedAccounts.map((selectedAccount) => {
                return {
                    id: selectedAccount?.id,
                    customerId: selectedAccount?.customerId,
                    ip: ipAddress,
                    browser: browser,
                    userId: authUser.user?.userid
                }
            });
            const res = await customersApis.approveAccounts(authUser, formData);
            if (res?.success){
                toast.success(res?.errorMessage ?? "Account(s) approved successfully!");
                setIsLoading(false);
                onClose?.();
                await onRefresh?.();
            }
            else{
                toast.error(res?.errorMessage ?? res?.error ?? "An error occurred! Try again!");
            }
            // console.log(res);
        }
        catch (e) {
            console.log(e?.message);
        }
        setIsLoading(false);
    }




    return (
        <>
            {accounts.map((account, index) =>(
                <LinkAccountComponent
                    key={index}
                    item={account}
                    selectedAccounts={selectedAccounts}
                    onSelect={onSelectAccount}
                    field={"id"}
                />
            ))}
            <MKBox sx={{
                display: 'flex',
                justifyContent:'flex-end',
                alignItems: 'center',
                gap: 1,
                mt: 2
            }}>

                <MKButton disabled={isLoading || Boolean(selectedAccounts.length < 1)} size={'small'} variant={'outlined'} color={'error'}>
                    {"Reject"}
                </MKButton>
                <MKButton
                    disabled={isLoading || Boolean(selectedAccounts.length < 1)}
                    onClick={handleOnApprove}
                    startIcon={isLoading && <LoaderIcon/>}
                    size={'small'}
                    variant={'contained'}
                    color={'success'}
                >
                    {"Approve"}
                </MKButton>
            </MKBox>
        </>
    )
}

export default AccountsSelectionList;