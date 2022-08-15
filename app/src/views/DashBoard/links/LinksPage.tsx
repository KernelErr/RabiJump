import { getRedirect, getRedirectLists } from "@app/api/redirect"
import { getCurrentApiConfig, UseGlobalStore } from "@app/store/app"
import { BackTop, Button } from "@douyinfe/semi-ui"
import { useCallback } from "react"
import LinkForm from "./LinkForm"
import LinksList from "./LinksList"
import LinkManage from "./LinkManage"
import ContentHeader from "@app/views/Share/ContentHeader"
import { useTranslation } from "react-i18next"
import { IconArrowUp } from "@douyinfe/semi-icons"

function LinksPage() {
    const [t] = useTranslation();
    return (
        <>
            <ContentHeader title={t('Links')} />
            <LinkManage />
            <LinksList />
            <BackTop />
        </>
    )
}

export default LinksPage