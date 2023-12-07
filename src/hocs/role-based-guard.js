import {useAuth} from "../hooks/use-auth";
import {checkPermission} from "../utils/helper-functions";
import Forbidden from "../components/403-forbidden";


const RoleBasedGuard = ({ children, permission, path, page= false }) => {
    const { userMenus, isFetchingMenus } = useAuth();

    if (isFetchingMenus){
        return null
    }

    if (!checkPermission(userMenus, permission, path, page)){
        if (page){
            return <Forbidden/>
        }
        return null;
    }
    return (
        <>
            {children}
        </>
    )
}

export default RoleBasedGuard;