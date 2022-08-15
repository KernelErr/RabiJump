import { getState } from "@app/store/common";
import { Notification } from "@douyinfe/semi-ui";
import axios from "axios";
import { axiosInit } from "./axiosMiddleware";

function showError(content: string, title: string) {
    Notification.error({
        content: content,
        duration: 3,
        title
    })
}

function hidleLoading() {
    getState().toogleLoading(false);
}

const request = axios.create({
})

axiosInit(request, showError, hidleLoading);
export default request;