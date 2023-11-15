import {useState} from "react";
import MKButton from "../../../@mui-components/button";
import DMTDialog from "../../../@dmt-components/dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import {CHANNEL_TYPES} from "../../../../utils/constants";
import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import {Icon, ToggleButton, ToggleButtonGroup} from "@mui/material";
import * as React from "react";
import {CheckBox, CheckBoxOutlineBlank} from "@mui/icons-material";
import {LoaderIcon} from "react-hot-toast";

const AddCustomerDialog = props => {
    const { customer, disabled, onAddUpdate } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [channelTypes, setChannelTypes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnProceed = async () => {
        setIsLoading(true);
        await onAddUpdate(channelTypes);
        handleOnClose();
        setIsLoading(false);
    }

    const handleOnOpen = () => {
        setOpenDialog(true);
    }
    const handleOnClose = () => {
        setOpenDialog(false);
    }

    const handleOnChannelChange = values => {
        setChannelTypes(values);
    }
    return (
        <>
            <MKButton
                color={'success'}
                variant={'contained'}
                onClick={handleOnOpen}
                disabled={disabled}
            >
                {"Add New"}
            </MKButton>
            <DMTDialog
                open={openDialog}
                onClose={handleOnClose}
            >
                <DialogContent>
                    <MKBox sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <MKTypography sx={{ mb: 2}} color={'primary'} variant={'h5'} align={'center'} gutterBottom>
                            {"New Customer Alert"}
                        </MKTypography>
                        <MKTypography sx={{ mb: 2 }} align={'center'} gutterBottom>
                            {`Please choose the channel type(s) you are registering `}
                            <b>{customer?.name}</b>
                        </MKTypography>
                        <ChannelTypesOptions
                            selectedMode={channelTypes}
                            handleOnChange={handleOnChannelChange}
                        />
                        <MKBox sx={{ mt:2 }}>
                            <MKButton
                                onClick={handleOnProceed}
                                disabled={isLoading || !Boolean(channelTypes.length > 0)}
                                endIcon={isLoading && <LoaderIcon/>}
                                variant={'contained'}
                                color={'success'}
                            >
                                {"Proceed"}
                            </MKButton>
                        </MKBox>
                    </MKBox>

                </DialogContent>
            </DMTDialog>
        </>
    )
}

 const ChannelTypesOptions = props => {
    const { selectedMode, handleOnChange } = props;
    const [modes] = useState(CHANNEL_TYPES);

    const handleModeChange = (e, values) => {
        handleOnChange(values);
    }

    return (
        <>
            <MKTypography variant={'caption'} align={'center'} gutterBottom>
                {'Select Channel Type(s)'}
            </MKTypography>
            <MKBox >
                <ToggleButtonGroup
                    color="primary"
                    value={selectedMode}
                    //exclusive
                    onChange={handleModeChange}
                    aria-label="Modes"
                >
                    {modes.map((mode, index) => {
                        const isSelected = selectedMode.includes(mode.value);
                        return (
                        <ToggleButton
                            key={index}
                            //color={'success'}
                            value={mode.value}
                        >
                            <MKBox sx={{ display: 'flex', alignItems:'center', gap: 1}}>
                                { isSelected ? (<CheckBox fontSize={'small'}/>) : (<CheckBoxOutlineBlank fontSize={'small'}/>)}
                                <Icon sx={{ ml:1, display:{ md: 'grid', xs: 'none'} }} fontSize={'small'}>{mode.icon}</Icon>
                                <MKTypography fontWeight={'bold'}>{mode.label}</MKTypography>
                            </MKBox>
                        </ToggleButton>
                    )})}

                </ToggleButtonGroup>
            </MKBox>
        </>
    )
}

export default AddCustomerDialog;