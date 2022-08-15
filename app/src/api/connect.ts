import request from "@app/misc/request/axios"
import { ExtendedRequest } from "@app/misc/request/axiosMiddleware";
import { ApiConfig } from "@app/type/app";
import { AxiosPromise } from "axios";

const endpoint = '/api'

export function backendAuth(apiConfig: ApiConfig): AxiosPromise<{ status: string }> {
    return request.get(`${endpoint}/auth`, { ...apiConfig } as ExtendedRequest);
}