import { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { useRouter } from "next/router";
import {useAuth} from "../hooks/use-auth";
import {SplashScreen} from "../components/splash-screen";
import {useMounted} from "../hooks/use-mounted";

export const GuestGuard = (props) => {
    const { children } = props;
    const auth = useAuth();
    const router = useRouter();
    const [checked, setChecked] = useState(false);
    const isMounted  = useMounted();

    const initialize = () => {
        if (!router.isReady) {
            return(  <SplashScreen/> );
        }

        if (auth.isAuthenticated) {
            router.push("/dashboard").catch(console.error);
        } else {
            setChecked(true);
        }
    }

    useEffect(
        () => {
          initialize();
        },
        [router.isReady]
    );

    if (!checked) {
        return null;
    }

    // If got here, it means that the redirect did not occur, and that tells us that the user is
    // not authenticated / authorized.

    return <>{children}</>;
};

GuestGuard.propTypes = {
    children: PropTypes.node,
};
