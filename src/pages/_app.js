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
              <link rel="icon" href="/favicon.ico" />
              <link rel="preconnect" href="https://fonts.googleapis.com"></link>
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin></link>
              <link href="https://fonts.googleapis.com/css2?family=DM+Sans:opsz@9..40&family=Inter+Tight:wght@300;400;900&family=Inter:wght@200;300;400&family=Josefin+Sans:wght@300;400&family=Kumbh+Sans&family=Montserrat:wght@400;500&family=Nunito:wght@400;500;600;700&family=Poltawski+Nowy:wght@500&family=Roboto+Flex:opsz,wght@8..144,400;8..144,500&family=Space+Grotesk&display=swap" rel="stylesheet"></link>
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
