import { store } from '../store'
import { Provider } from 'react-redux'
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from '../theme'
import config from 'react-reveal/globals';
import Head from "next/head";
import {appName} from "../utils/constants";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {LocalizationProvider} from "@mui/x-date-pickers";
import 'devextreme/dist/css/dx.material.blue.light.css';
import '../theme/dx.material.custom-scheme.css'
import '../theme/watermark.css'
// import '../theme/globals.css'
import {AuthConsumer, AuthProvider} from "../contexts/auth-context"
import {SplashScreen} from "../components/splash-screen";
import Script from 'next/script';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'react-toastify';


config({ ssrFadeout: true });


function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout ?? ((page) => page);
  return (
      <>
          <Head>
              <title>{appName}</title>
              <meta name="viewport" content="initial-scale=1, width=device-width" />
              <link rel="icon" href="/favicon.jpg" />
          </Head>
          <Script src={"https://kit.fontawesome.com/42d5adcbca.js"} crossOrigin="anonymous"  async/>
          <Provider store={store}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <AuthProvider>
                  <ThemeProvider theme={theme}>
                      <CssBaseline />

                      <ToastContainer />
                      <AuthConsumer>
                          {(auth) =>
                              !auth.isInitialized ? (
                                  <SplashScreen/>
                              ) : (

                                  getLayout(<Component {...pageProps} />)
                              )
                          }
                      </AuthConsumer>
                  </ThemeProvider>
                  </AuthProvider>
              </LocalizationProvider>
          </Provider>
      </>
  )
}

export default MyApp
