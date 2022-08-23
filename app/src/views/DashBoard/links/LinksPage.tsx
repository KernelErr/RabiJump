import { getApiConfigs, getCurrentApiConfig, useGlobalStore } from "@app/store/app"

import ContentHeader from "@app/views/Share/ContentHeader"
import { useTranslation } from "react-i18next"
import { IconArrowUp } from "@douyinfe/semi-icons"

import LinksList from "./LinksList"
import LinkManage from "./LinkManage"
import LinkPagination from "./LinkPagination"

function LinksPage() {
    const [t] = useTranslation();
    const [app] = useGlobalStore(state => [state.app])
    return (
        <>
            <ContentHeader title={t('Links')} extraContent={getCurrentApiConfig(app).baseURL} />
            <LinkPagination />
            <LinksList />
            <LinkManage />
        </>
    )
}

export default LinksPage