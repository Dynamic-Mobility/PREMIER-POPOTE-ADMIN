import { createContext, useEffect, useReducer } from "react";

import PropTypes from "prop-types";
import {AUTH_REFRESH_TOKEN_KEY, AUTH_SESSION_KEY, AUTH_TOKEN_KEY} from "../utils/constants";
import {authApi} from "../api-requests/auth-apis";
import {useRouter} from "next/router";
import {toast} from "react-toastify";
import {getFromSessionLocally, removeFromSessionLocally, saveSessionLocally} from "../utils/helper-functions";


let ActionType;
(function (ActionType) {
    ActionType["INITIALIZE"] = "INITIALIZE";
    ActionType["GET_MENUS"] = "GET_MENUS";
    ActionType["LOGIN"] = "LOGIN";
    ActionType["LOGOUT"] = "LOGOUT";
})(ActionType || (ActionType = {}));

const initialState = {
    isAuthenticated: false,
    isInitialized: false,
    isFetchingMenus: true,
    user: null,
    userMenus: [],
};

const handlers = {
    INITIALIZE: (state, action) => {
        const { isAuthenticated, user } = action.payload;

        return {
            ...state,
            isAuthenticated,
            isInitialized: true,
            user,
        };
    },
    LOGIN: (state, action) => {
        const { user } = action.payload;

        return {
            ...state,
            isAuthenticated: true,
            user,
        };
    },
    LOGOUT: (state) => ({
        ...state,
        isAuthenticated: false,
        user: null,
    }),
    GET_MENUS: (state, action) => {
        const {isFetchingMenus, userMenus} = action.payload;

        return {
            ...state,
            isFetchingMenus,
            userMenus
        };
    }
};

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

export const AuthContext = createContext({
    ...initialState,
    login: () => Promise.resolve(),
    refreshToken : () => Promise.resolve(),
    logout: () => Promise.resolve(),
    fetchUserMenus: () => Promise.resolve()
});

export const AuthProvider = (props) => {
    const { children } = props;
    const [state, dispatch] = useReducer(reducer, initialState);
    const router = useRouter();

    useEffect(() => {
        const initialize = async () => {

            try {
                const accessToken = getFromSessionLocally(AUTH_TOKEN_KEY);
                const refreshToken =  getFromSessionLocally(AUTH_REFRESH_TOKEN_KEY);
                const sessionId =  getFromSessionLocally(AUTH_SESSION_KEY);

                if (accessToken) {
                    const decodedToken = await authApi.decodeToken(accessToken);
                    const user = {
                        ...decodedToken,
                        accessToken,
                        refreshToken,
                        sessionId
                    }
                    dispatch({
                        type: ActionType.INITIALIZE,
                        payload: {
                            isAuthenticated: true,
                            user,
                        },
                    });
                    await fetchUserMenus(accessToken, user?.userid);
                } else {
                    dispatch({
                        type: ActionType.INITIALIZE,
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: ActionType.INITIALIZE,
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                });
            }
        };

        initialize();
    }, []);

    const login = async (userDetails) => {
        const decodedToken = await authApi.decodeToken(userDetails.token);
        const user = {
            ...decodedToken,
            accessToken: userDetails?.token,
            refreshToken: userDetails?.refreshToken,
            sessionId: userDetails?.sessionId,
        }
        saveSessionLocally(AUTH_TOKEN_KEY, userDetails?.token);
        saveSessionLocally(AUTH_REFRESH_TOKEN_KEY, userDetails?.refreshToken);
        saveSessionLocally(AUTH_SESSION_KEY, userDetails?.sessionId);

        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });
        await fetchUserMenus(user?.accessToken, user?.userid);
    };


    const fetchUserMenus = async (token, userId) => {
        dispatch({
            type: ActionType.GET_MENUS,
            payload: {
                userMenus: [],
                isFetchingMenus: true,
            },
        });
        try {
            await authApi.fetchUserMenus(token, { id: userId})
                .then(res => {
                dispatch({
                    type: ActionType.GET_MENUS,
                    payload: {
                       userMenus: res,
                        isFetchingMenus: false,
                    },
                });
            })
        }
        catch (e) {
            toast.error("Could not fetch menus. Refresh page");
        }
    }


    const refreshToken = async (newToken, newRefreshToken, newSessionId) => {
        const decodedToken = await authApi.decodeToken(newToken);
        const user = {
            ...decodedToken,
            accessToken: newToken,
            refreshToken: newRefreshToken,
            sessionId: newSessionId,
        }
        saveSessionLocally(AUTH_TOKEN_KEY, newToken);
        saveSessionLocally(AUTH_REFRESH_TOKEN_KEY, newRefreshToken);
        saveSessionLocally(AUTH_SESSION_KEY, newSessionId);

        dispatch({
            type: ActionType.LOGIN,
            payload: {
                user,
            },
        });
    }

    const logout = async (serverLogout = true) => {
        try{
            const accessToken = getFromSessionLocally(AUTH_TOKEN_KEY);
            const refreshToken =  getFromSessionLocally(AUTH_REFRESH_TOKEN_KEY);
            const sessionId =  getFromSessionLocally(AUTH_SESSION_KEY);

            const formData = {
                token:accessToken,
                refreshToken,
                sessionId,
            }
            if (serverLogout){
                const res = await authApi.logoutUser(formData);
            }

        }
        catch (e) {
            console.log(e.message);
        }

        removeFromSessionLocally(AUTH_TOKEN_KEY);
        removeFromSessionLocally(AUTH_REFRESH_TOKEN_KEY);
        removeFromSessionLocally(AUTH_SESSION_KEY);


        await dispatch({ type: ActionType.LOGOUT });
        router
            .push({
                pathname: "/",
                query: { returnUrl: router.asPath },
            })
            .catch(console.error);
    };




    return (
        <AuthContext.Provider
            value={{
                ...state,
                platform: "AD",
                login,
                logout,
                refreshToken,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const AuthConsumer = AuthContext.Consumer;
