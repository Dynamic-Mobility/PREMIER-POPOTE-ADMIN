import MKButton from "../@mui-components/button";
import RefreshIcon from "@mui/icons-material/Refresh";
import {useState} from "react";
import {LoaderIcon} from "react-hot-toast";
import {toast} from "react-toastify";

const RefreshButton = props =>{
    const [isLoading, setIsLoading] = useState(false);
    const { onRefresh } = props;


    const handleOnClick = async () => {
        setIsLoading(true);
        await onRefresh();
        toast.success("Data Refreshed successfully!")
        setIsLoading(false)
    }


    return (
        <>
            <MKButton
                variant={'outlined'}
                color={'primary'}
                startIcon={isLoading ? <LoaderIcon/> : <RefreshIcon/>}
                onClick={handleOnClick}
                disabled={isLoading}
            >
                {isLoading ? "Refreshing..." : "Refresh"}
            </MKButton>
        </>
    )
}

export default RefreshButton;