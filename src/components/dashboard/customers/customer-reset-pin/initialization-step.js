import MKBox from "../../../@mui-components/box";
import MKTypography from "../../../@mui-components/typography";
import MKButton from "../../../@mui-components/button";
import * as React from "react";
import {useState} from "react";
import {LoaderIcon} from "react-hot-toast";
import {CHANNEL_TYPES} from "../../../../utils/constants";
import {Icon, ToggleButton, ToggleButtonGroup} from "@mui/material";

const InitializationStep = props => {
    const { onInitialize, onCancel, customer, channelType, onChangeChannelType} = props;
    const [isLoading, setIsLoading] = useState(false);

    const handleOnProceed = async () => {
        setIsLoading(true);
        try{
            await onInitialize?.();
        }
        catch (e) {

        }
        finally {
            setIsLoading(false);
        }
    }

     return (
         <>
             <MKBox sx={{ display: 'flex', justifyContent:'center', gap: 2, alignItems: 'center', flexDirection: 'column'}}>
                 <MKTypography align={'center'} >
                     {"Are you sure you want to reset pin for"}
                     {" "}
                     <b>
                         {`${customer?.name}?`}
                     </b>
                 </MKTypography>

                 <ChannelTypesOptions selectedMode={channelType} handleOnChange={onChangeChannelType}/>

                 <MKBox sx={{ mt:2, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2}}>
                     <MKButton onClick={onCancel} sx={{ width: 'auto'}} variant={'outlined'} color={'error'}>
                         {"No, Cancel"}
                     </MKButton>
                     <MKButton disabled={isLoading} startIcon={isLoading && <LoaderIcon/>} onClick={handleOnProceed} sx={{ width: 'auto'}} variant={'contained'} color={'success'}>
                         {isLoading ? "Initializing" : "Yes, Proceed"}
                     </MKButton>
                 </MKBox>
             </MKBox>

         </>
     )
}

export const ChannelTypesOptions = props => {
    const { selectedMode, handleOnChange } = props;
    const [modes] = useState(CHANNEL_TYPES);

    const handleModeChange = (e, value) => {
        handleOnChange(value);
    }

    return (
        <>
            <MKTypography variant={'caption'} align={'center'}>{'Select Channel Type'}</MKTypography>
            <MKBox >
                <ToggleButtonGroup
                    color="primary"
                    value={selectedMode}
                    exclusive
                    onChange={handleModeChange}
                    aria-label="Modes"
                >
                    {modes.map((mode, index) => (
                        <ToggleButton
                            key={index}
                            //color={'success'}
                            value={mode.value}
                        >
                            <Icon sx={{ mr:1 }}>{mode.icon}</Icon>
                            {mode.label}
                        </ToggleButton>
                    ))}

                </ToggleButtonGroup>
            </MKBox>
        </>
    )
}

export default InitializationStep;