import { backendAxiosInstance } from "../../../../api-requests/backend-axios-instance";
import { API_METHODS,API_URL } from "../../../../utils/api-endpoints";

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '1024mb' // Set desired value here
        }
    }
}
export default async function handler(req, res) {
     if (req.method === API_METHODS.POST) {
        try {
            if (!req.headers?.authorization){
                res.status(401).send('Unauthorized');
            }
            let config = {
                headers: {
                    'Authorization': req.headers.authorization,
                }
            };
            const body = req.body;

            if (body?.active){
                config = {
                    ...config,
                    params: {
                        active: body.active,
                    }
                }
            }

            await backendAxiosInstance.post(`${API_URL.FETCH_ALL_CUSTOMERS}`,body, config)
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
    else {
        res.status(404).json({message: 'path not found!'});
    }
}