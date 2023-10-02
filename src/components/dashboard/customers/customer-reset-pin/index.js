import {useState} from "react";
import MKButton from "../../../@mui-components/button";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import * as React from "react";
import {ColorlibConnector, ColorlibStepIcon} from "../../../@dmt-components/stepper";
import { Pin, Info} from "@mui/icons-material";
import MKTypography from "../../../@mui-components/typography";
import MKBox from "../../../@mui-components/box";
import InitializationStep from "./initialization-step";
import OtpForm from "./otp-form";
import {customersApis} from "../../../../api-requests/customers-api";
import {useAuth} from "../../../../hooks/use-auth";
import DMTDialog from "../../../@dmt-components/dialog";

const steps = [
    {
        label:'Initialization',
        icon: <Info/>
    }
    ,
    {
        label:'OTP Validation',
        icon: <Pin/>
    }
    ];
const CustomerResetPin = props => {
    const { customer } = props;
    const [openDialog, setOpenDialog] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [channelType, setChannelType] = useState('USSD');
    const authUser = useAuth();
    const [message, setMessage] = useState("");


    const handleOnChangeChannelType = value => {
        setChannelType(value);
    }

    const handleOnNext = () => {
        setActiveStep(prevState =>  prevState + 1);
    }

    const handleOnOpenDialog  = () => {
        setOpenDialog(true);
    }
    const handleOnCloseDialog = () =>{
        setOpenDialog(false);
        setActiveStep(0);
    }

    const handleOnInitialization = async () => {
        try{
            const formData = {
                customerId: customer?.customerId,
                customerUserId: "",
                attachedCopy: "",
                channelType: channelType,
                ip: "",
            }
            const res = await customersApis.resetCustomerPin(authUser, formData);
            if (res?.success){
                setMessage(res?.error);
                handleOnNext();
            }
        }
        catch (e) {
            console.log(e.message);
        }
    }

    const handleOnOTPValidate = async otp => {
        try{
            const formData = {
                customerId: customer?.customerId,
                customerUserId: "",
                attachedCopy: "",
                channelType: channelType,
                ip: "",
                otp: otp,
            }
            const res = await customersApis.validateResetOTP(authUser, formData);
            console.log(res);
        }
        catch (e){
           console.log(e.message);
        }
    }
    
    return (
        <>
            <MKButton 
                variant={'outlined'}
                color={'primary'}
                onClick={handleOnOpenDialog}
            >
                {"Reset Pin"}
            </MKButton>
            <DMTDialog
                open={openDialog}
                onClose={handleOnCloseDialog}
            >
                <DialogTitle>
                    {"Reset Customer Pin"}
                </DialogTitle>
                <DialogContent>
                    <MKBox>
                        <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                            {steps.map((step, index) => (
                                <Step key={index}>
                                    <StepLabel StepIconComponent={props => <ColorlibStepIcon {...props} icon={step.icon}/>}>
                                       <MKTypography mt={-1} fontWeight={'bold'}>
                                           {step.label}
                                       </MKTypography>
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        {activeStep === 0 && (
                            <>
                                <InitializationStep
                                    customer={customer}
                                    channelType = {channelType}
                                    onChangeChannelType = {handleOnChangeChannelType}
                                    onInitialize = {handleOnInitialization}
                                    onCancel={handleOnCloseDialog}
                                />
                            </>
                        )}
                        {activeStep === 1 && (
                            <>
                                <OtpForm
                                    onCancel={handleOnCloseDialog}
                                    phoneNumber={customer?.phoneNumber}
                                    message={message}
                                    onSuccess={handleOnOTPValidate}
                                />
                            </>
                        )}
                    </MKBox>
                </DialogContent>
            </DMTDialog>
        </>
    )
}


export default CustomerResetPin;