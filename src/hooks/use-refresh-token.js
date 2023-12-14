import { useEffect } from "react";
import { authApi } from "../api-requests/auth-apis";
import { useAuth } from "./use-auth";
import dayjs from "moment/moment";

const RefreshTokenGuard = (props) => {
    const { children } = props;
    const authUser = useAuth();
    const { user, refreshToken, logout } = authUser;

    useEffect(() => {
        let tokenRefreshTimer = null;

        const checkTokenExpiry = async () => {
            const expiryTime = user?.exp; // Get token expiry time
            const refreshThreshold = 5000;
            const isExpired = dayjs.unix(expiryTime).diff(dayjs()) < refreshThreshold;

            if (isExpired) {
                try {
                    const formData = {
                        token: user?.accessToken,
                        refreshToken: user?.refreshToken,
                        sessionId: user?.sessionId,
                    };

                    // Refresh the token
                    const res = await authApi.refreshUserToken(formData);
                    await refreshToken(res.token, res.refreshToken, res.sessionId);

                    // Restart the token refresh mechanism upon successful refresh
                    scheduleTokenRefresh();
                } catch (error) {
                    console.error("Failed to refresh token:", error);
                    await logout();
                    // Handle token refresh failure
                }
            } else {
                const timeUntilExpiry = dayjs.unix(expiryTime).diff(dayjs()) - refreshThreshold;
                tokenRefreshTimer = setTimeout(checkTokenExpiry, timeUntilExpiry);
            }
        };

        const scheduleTokenRefresh = () => {
            if (tokenRefreshTimer) {
                clearTimeout(tokenRefreshTimer);
            }

            tokenRefreshTimer = setTimeout(checkTokenExpiry, 1000);
        };

        scheduleTokenRefresh();

        return () => {
            if (tokenRefreshTimer) {
                clearTimeout(tokenRefreshTimer);
            }
        };
    }, [refreshToken]); // Add refreshToken to the dependency array

    return <>{children}</>;
};

export default RefreshTokenGuard;