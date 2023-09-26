import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

export const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 19,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                `linear-gradient( 95deg,${theme.palette.gradients.success.main} 0%,${theme.palette.gradients.success.state} 50%,${theme.palette.gradients.success.main} 100%)`,
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundImage:
                `linear-gradient( 95deg,${theme.palette.gradients.success.main} 0%,rgb(233,64,87) 50%,${theme.palette.gradients.success.main} 100%)`,
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 40,
    height: 40,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            `linear-gradient( 136deg, ${theme.palette.gradients.primary.main} 0%, ${theme.palette.gradients.primary.state} 50%, ${theme.palette.gradients.primary.main} 100%)`,
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage: `linear-gradient( 136deg,${theme.palette.gradients.success.main} 0%, ${theme.palette.gradients.success.state} 50%, ${theme.palette.gradients.success.main} 100%)`,
    }),
}));

export function ColorlibStepIcon(props) {
    const { active, completed, className, icon } = props;
    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icon}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};
