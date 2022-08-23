import { getRedirectLists, searchRedirectsByPrefix } from "@app/api/redirect";
import { getCurrentApiConfig, useGlobalStore } from "@app/store/app";
import { useLinkListStore } from "@app/store/links";
import { Card, LocaleProvider, Pagination } from "@douyinfe/semi-ui";
import { useEffect, useCallback } from "react";

import s0 from './LinkPagination.module.scss'

import { useTranslation } from "react-i18next";
import { semiLocalesOptions } from "@i18n/resources";


function LinkPagination() {
    const [total, paginationConfig, setPaginationConfig, setLinkList, prefix] =
        useLinkListStore(state => [state.total, state.paginationConfig, state.setPaginationConfig, state.setLinkList, state.prefix])
    const [app] = useGlobalStore(state => [state.app])
    const { i18n } = useTranslation();
    const fetchCurrentHandler = useCallback(prefix === '' ? getRedirectLists : searchRedirectsByPrefix, [prefix])
    return (
        <Card >
            <LocaleProvider locale={semiLocalesOptions[i18n.language]}>
                <Pagination showTotal showSizeChanger showQuickJumper total={total} pageSize={paginationConfig.count} className={s0.page}
                    currentPage={(paginationConfig.skip) / paginationConfig.count + 1}
                    onChange={(page, count) => {
                        let skip = (page - 1) * count
                        setPaginationConfig(count, skip)
                        fetchCurrentHandler(getCurrentApiConfig(app), prefix, count, skip).then(
                            (res) => {
                                setLinkList(res.data.data)
                            }
                        )
                    }}
                />
            </LocaleProvider>

        </Card>
    )
}

export default LinkPagination;