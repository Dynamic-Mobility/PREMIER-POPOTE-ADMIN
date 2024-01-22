import useIdleTimer from "../hooks/use-idle-timer";
import {INACTIVITY_TIMEOUT} from "../utils/constants";
import {useAuth} from "../hooks/use-auth";
import {toast} from "react-hot-toast";

const IdleTimerGuard = () => {
    const auth = useAuth();
    const handleOnIdle = async () => {
        await auth.logout();
        toast.error('You have been logged out! Long inactivity period');
    }
    const {showWarning, remainingTime} = useIdleTimer({timeout: INACTIVITY_TIMEOUT,  onIdle: handleOnIdle});

    return null;
}

export default IdleTimerGuard;