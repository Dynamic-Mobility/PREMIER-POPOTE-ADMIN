import {useEffect, useRef, useState} from 'react';

const useIdleTimer = ({timeout, onIdle}) => {
    const timerRef = useRef(null);
    const [showWarning, setShowWarning] = useState(false);
    const [remainingTime, setRemainingTime] = useState(timeout);

    const resetTimer = () => {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(onIdle, remainingTime);
        setShowWarning(false);
        setRemainingTime(timeout);
        console.log('TIMEOUT', timeout)
    };

    const handleUserActivity = () => {
        resetTimer();
    };

    useEffect(() => {
        if (timeout !== null){
            resetTimer();
            window.addEventListener('mousemove', handleUserActivity);
            window.addEventListener('keydown', handleUserActivity);

            return () => {
                clearTimeout(timerRef.current);
                window.removeEventListener('mousemove', handleUserActivity);
                window.removeEventListener('keydown', handleUserActivity);
            };
        }
    }, [remainingTime, onIdle]);

    useEffect(() => {
        if (remainingTime > 60000) {
            // Show warning when 1 minute (60000 ms) is remaining
            const warningTimeout = setTimeout(() => {
                setShowWarning(true);
            }, remainingTime - 60000);

            return () => {
                clearTimeout(warningTimeout);
            };
        }
    }, [remainingTime]);

    return { showWarning, remainingTime };
};

export default useIdleTimer;
