import {API_METHODS, API_URL} from "../../../utils/api-endpoints";
import {backendAxiosInstance} from "../../../api-requests/backend-axios-instance";

const SimpleCrypto = require("simple-crypto-js").default;
const secretKey = new SimpleCrypto(process.env.NEXT_PUBLIC_ENCRYPTION_KEY);

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1024mb' // Set desired value here
        }
    }
}

export default async function handler(req, res) {
    if (req.method === API_METHODS.POST) {
        const body = req.body;
        if (body?.data !== undefined) {
            try {
                const formData = secretKey.decrypt(body.data);
                console.log(formData);

                // const responseData = {
                   // token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJEZW5uaXMiLCJMYXN0TmFtZSI6Ik11bWlyYSIsInBob25lbnVtYmVyIjoiMDcwMTgyNDE0NSIsImVtYWlsIjoibmpvcm9kZW5vMjBAZ21haWwuY29tIiwiUGFydG5lclNlY3JldCI6InN0cmluZyIsIlBhcnRuZXJJZCI6InN0cmluZyIsImp0aSI6ImY3OTlmM2QxLWExYWMtNDVhZC05ZDVhLTMzNWFjNjQ2OTMwNyIsImV4cCI6MTY5NDAyODc1NSwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo2MTk1NSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDIwMCJ9.HND7ZE6TAWswsdRhNmzOvQgM444vnQThMR-w1e5cRR0'
                // }

                // if (formData?.Username === 'njorodeno20@gmail.com' && formData?.Password === 'njoroge123'){
                //     res.status(200).json(secretKey.encrypt(responseData));
                // }
                // else {
                //     res.status(400).json('Wrong Credentials Provided');
                // }

                await backendAxiosInstance.post(API_URL.LOGIN, formData).then(response => {
                    res.status(response.status).json(secretKey.encrypt(response.data));

                    console.log(response.data);
                }).catch(e => res.status(e?.response?.status ?? 500).json(e.response?.data))

            } catch (e) {
                res.status(500).json(e.message);
            }
        } else {
            res.status(400).json({message: 'No body found!'})
        }
    } else {
        res.status(404).json({message: 'path not found!'});
    }
}



  
  