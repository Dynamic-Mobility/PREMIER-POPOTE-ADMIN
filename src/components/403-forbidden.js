import Head from "next/head";
import {Box, Button, Card, Container} from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import NextLink from "next/link";
import {appName} from "../utils/constants";

const Forbidden = () => {
    return (
        <>
            <Head>
                <title>403 | {appName}</title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 2,
                }}
            >
                <Container maxWidth="xl">
                    <Card sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
                        <Box sx={{
                            fontSize:{ xs: 80, sm: 120 },
                            fontWeight: 600,
                            //lineHeight: 2,
                            textShadow: '10px 6px 8px hsla(0,0%,45.9%,.8)',
                        }}
                        >
                            403
                        </Box>
                        <Box sx={{ mb:2, fontWeight: 500, fontSize: {xs: 18, sm: 24}}}>
                            Forbidden
                        </Box>
                        <Box fontSize={{ xs: 12, sm: 18 }} mb={6} color="grey.700">
                            Oops! You do not have the permission to access this page.
                        </Box>
                        <NextLink href={'/dashboard'} passHref>
                            <Button
                                variant={'outlined'}
                                color={'primary'}
                                startIcon ={<ArrowBack/>}
                                sx={{mb:8}}
                            >
                                Go Back to Dashboard
                            </Button>
                        </NextLink>
                    </Card>

                </Container>
            </Box>
        </>
    )
}

export default Forbidden