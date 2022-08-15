import { AxiosInstance, AxiosRequestConfig } from "axios";
import { getState } from "@app/store/common"
import { getState as globalState } from "@app/store/app";

export interface ExtendedRequest extends AxiosRequestConfig {
    token?: string
}

export function axiosInit(axios: AxiosInstance, showError: (content: string, title: string) => void, hideLoading: () => void) {
    const { toogleLoading } = getState();
    axios.interceptors.request.use((request: ExtendedRequest) => {
        toogleLoading(true);
        //@ts-ignore
        if (request.token) request.headers['Authorization'] = `Bearer ${request.token}`
        return request;
    })
    axios.interceptors.response.use(
        (response) => {
            toogleLoading(false);
            return response;
        },
        function (error) {
            return onError(error);
        }
    )
    function onError(error: any): Promise<any> {
        hideLoading();
        const errPrefix = "Error"
        console.log(error)
        showError(error.response.data || error.code || 'Something wrong', errPrefix);
        return Promise.reject(error);
    }
}