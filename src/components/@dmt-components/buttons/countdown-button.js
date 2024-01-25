import React, { useState, useEffect } from 'react';
import {Typography} from "@mui/material";
import MKButton from "../../@mui-components/button";
import {LoaderIcon} from "react-hot-toast";

const timeout = 59;

const  CountDownButton = (props) =>  {
    const {label, onClick} = props;

    const [count, setCount] = useState(timeout);
    const [isLoading, setIsLoading] = useState(false);

    const onRefreshCount = () => {
       setCount(timeout);
    }

    const handleOnClick = async () => {
        setIsLoading(true);
        await onClick?.(onRefreshCount);
        setIsLoading(false);
    }

    useEffect(() => {
        const countdown = setInterval(() => {
            if (count > 0) {
                setCount(count - 1);
            } else {
                clearInterval(countdown);
            }
        }, 1000);

        // Clean up the interval on unmount
        return () => clearInterval(countdown);
    }, [count]);

    // Format the countdown value to mm:ss
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <>
            <MKButton
                onClick={handleOnClick}
                startIcon={isLoading ? <LoaderIcon/> : ""}
                disabled={isLoading || count !== 0}
                variant={'text'}
                color={"primary"}
            >
                {label} {" "}
                {(count !== 0 && !isLoading) && (
                    <Typography sx={{ ml:1 }} variant={"inherit"} color={"error.main"}>({formatTime(count)})</Typography>
                )}
            </MKButton>
        </>
    );
}

export default CountDownButton;
