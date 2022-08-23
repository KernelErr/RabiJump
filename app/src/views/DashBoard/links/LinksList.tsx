import { CardGroup, Button, Card, Input, Notification } from "@douyinfe/semi-ui"
import { getCurrentApiConfig, useGlobalStore } from "@app/store/app"
import { useState, useEffect } from "react"
import * as React from 'react';
import { ApiConfig } from "@app/type/app"
import { BasicLinkProps, LinkProps } from "@app/type/link";
import { deleteRedirect, getRedirectLists, searchRedirectsByPrefix, updateRedirect } from "@app/api/redirect"

import LinkCard from "./LinkCard";

import "./LinksList.scss"
import { useLinkListStore } from "@app/store/links";
import { useTranslation } from "react-i18next";
import { IconSearch, IconFilter } from "@douyinfe/semi-icons";
import { debounce } from "@app/misc/util";

async function setLinkActive(active: boolean, linkProps: LinkProps, apiConfig: ApiConfig) {
    let l: LinkProps = {
        ...linkProps,
        active: active
    }
    const { data } = await updateRedirect(l, apiConfig)
    return await data
}

function LinksList() {
    const [t] = useTranslation();
    const [app] = useGlobalStore((state) => [state.app])
    const [linkList, total, setLinkList, setTotal, paginationConfig, setPaginationConfig, prefix, setPrefix] =
        useLinkListStore(state => [state.linkList, state.total, state.setLinkList, state.setTotal, state.paginationConfig, state.setPaginationConfig, state.prefix, state.setPrefix])
    useEffect(() => {
        getRedirectLists(getCurrentApiConfig(app), '', paginationConfig.count, paginationConfig.skip)
            .then((res) => { setTotal(res.data.total); setLinkList(res.data.data) })
    }, [])
    const onActive = (active: boolean, index: number) => {
        let linkItem = linkList[index]
        setLinkActive(active, linkItem, getCurrentApiConfig(app))
            .then((value) => {
                linkList[index] = value
                setLinkList([...linkList])
            })
    }
    const onUpdate = (data: LinkProps, index: number) => {
        updateRedirect(data, getCurrentApiConfig(app))
            .then((value) => {
                linkList[index] = value.data
                setLinkList([...linkList])
                Notification.success({
                    content: 'Update success',
                    duration: 1
                })
            })
    }
    const onRemove = (index: number) => {
        let name = linkList[index].name
        deleteRedirect(name, getCurrentApiConfig(app))
            .then((value) => {
                linkList.splice(index, 1)
                setLinkList([...linkList])
                setTotal(total - 1);
            })
    }

    const onSearch = React.useCallback((prefix: string) => {
        searchRedirectsByPrefix(getCurrentApiConfig(app), prefix, paginationConfig.count)
            .then(res => {
                setTotal(res.data.total)
                setPaginationConfig(paginationConfig.count)
                setLinkList(res.data.data)
            })
    }, [paginationConfig.count, paginationConfig.skip])
    const onSearchDebouce = React.useMemo(() => {
        return debounce(onSearch, 500)
    }, [onSearch])
    return (
        <Card className="linklist-body"
            title={
                <Input
                    prefix={<IconSearch />}
                    placeholder={t('search.ByPrefix')}
                    onChange={(v) => { setPrefix(v); onSearchDebouce(v) }}
                    suffix={
                        <Button onClick={() => onSearch(prefix)}>{t('search')}</Button>
                    } />
            }
        >
            <CardGroup>
                {linkList.map((item, idx) => (
                    <LinkCard
                        key={idx}
                        linkData={item}
                        index={idx}
                        onActive={onActive}
                        onUpdate={onUpdate}
                        onRemove={onRemove}
                    />
                )
                )}
            </CardGroup>
        </Card>

    )
}




export default LinksList