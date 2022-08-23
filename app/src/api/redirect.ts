import request from "@app/misc/request/axios"
import { ExtendedRequest } from "@app/misc/request/axiosMiddleware";
import { ApiConfig } from "@app/type/app";
import { LinkProps } from "@app/type/link";
import { AxiosPromise } from "axios";

const endpoint = '/api/redirect'

export function getRedirect(name: string, apiConfig: ApiConfig): AxiosPromise<LinkProps> {
    return request.get(`${endpoint}/${name}`, { ...apiConfig } as ExtendedRequest)
}

export function getRedirectLists(apiConfig: ApiConfig, padding?: any, count?: number, skip?: number): AxiosPromise<{ total: number, data: Array<LinkProps> }> {
    return request.get(`${endpoint};list`, { ...apiConfig, params: { count: count, skip: skip } } as ExtendedRequest)
}

export function createRedirect(linkProps: LinkProps, apiConfig: ApiConfig): AxiosPromise<LinkProps> {
    return request.post(`${endpoint}/${linkProps.name}`, { ...linkProps }, { ...apiConfig } as ExtendedRequest)
}

export function updateRedirect(linkProps: LinkProps, apiConfig: ApiConfig): AxiosPromise<LinkProps> {
    return createRedirect(linkProps, apiConfig)
}

export function deleteRedirect(name: string, apiConfig: ApiConfig): AxiosPromise<{ status: string }> {
    return request.delete(`${endpoint}/${name}`, { ...apiConfig } as ExtendedRequest)
}

export function searchRedirectsByPrefix(apiConfig: ApiConfig, prefix: string, count?: number, skip?: number): AxiosPromise<{ total: number, data: Array<LinkProps> }> {

    return request.get(`${endpoint};search?prefix=${prefix}`, { ...apiConfig, params: { count: count, skip: skip } } as ExtendedRequest)
}

export function getRedirectVisitCount(name: string, apiConfig: ApiConfig): AxiosPromise<{ count: number }> {
    return request.get(`${endpoint}/${name}/count`, { ...apiConfig } as ExtendedRequest)
}