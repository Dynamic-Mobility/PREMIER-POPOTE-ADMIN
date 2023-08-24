import {API_METHODS, API_URL} from "../../../utils/api-endpoints";
import {backendAxiosInstance} from "../../../api-requests/backend-axios-instance";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1024mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
    if (req.method === API_METHODS.GET) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            const config = {
                headers: {
                    'Authorization': req?.headers.authorization,
                },
            }

            const { trnId } = req.query;
            await backendAxiosInstance.get(`${API_URL.GET_REQUESTS_BY_ID}/${trnId}`, config).then(response => {
                res.status(200).json(response.data);
            }).catch(e => {
                    res.status(e.response?.status ?? 500).json(e.response?.data)
                }
            )

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else if (req.method === API_METHODS.POST) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
    
            const config = {
                headers: {
                    'Authorization': req.headers.authorization,
                    'Content-Type': req.headers.contentType,
                    //'ContentType':"application/json",
                }
            };
            const body = req.body;
            console.log("BODY ",body);
            await backendAxiosInstance.get(`${API_URL.GET_REQUESTS_BY_ID}/${body.transactionId}`, body, config)
                .then(response => {
                    res.status(200).json(response.data);
                })
                .catch(e => {
                        res.status(e.response?.status ?? 500).json(e.response?.data)
                    }
                )

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else if (req.method === API_METHODS.PUT) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            const config = {
                headers: {
                    'Authorization': req.headers.authorization,
                }
            };
            const body = req.body;

            await backendAxiosInstance.post(`${API_URL.SAVE_UPLOADED_FILE}/${body.id}/${body.sponsorId}`,{}, config).then(response => {
                res.status(200).json(response.data);

            }).catch(e => {
                    res.status(e.response?.status ?? 500).json(e.response?.data)

                }
            )

        } catch (e) {
            res.status(500).json(e.message);
        }
    }
    else {
        res.status(404).json({message: 'path not found!'});
    }
}