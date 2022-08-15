import { CardGroup, Button, Card, Input, Notification } from "@douyinfe/semi-ui"
import { getCurrentApiConfig, UseGlobalStore } from "@app/store/app"
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

async function fetchRedirectList(apiConfig: ApiConfig) {
    const { data } = await getRedirectLists(apiConfig)
    return await data
}

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
    const [app] = UseGlobalStore((state) => [state.app])
    const [linkList, setLinkList] = useLinkListStore(state => [state.linkList, state.setLinkList])
    useEffect(() => {
        fetchRedirectList(getCurrentApiConfig(app))
            .then(setLinkList)
    }, [])
    const onActive = (index: number, active: boolean) => {
        let linkItem = linkList[index]
        setLinkActive(active, linkItem, getCurrentApiConfig(app))
            .then((value) => {
                linkList[index] = value
                setLinkList([...linkList])
            })
    }
    const onUpdate = (index: number, data: LinkProps) => {
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
            })
    }

    const [prefix, setPrefix] = useState('');
    const onSearch = React.useCallback((prefix: string) => {
        searchRedirectsByPrefix(prefix, getCurrentApiConfig(app))
            .then(res => {
                setLinkList(res.data)
            })
    }, [])
    const onSearchDebouce = React.useMemo(() => {

        return debounce(onSearch, 500)
    }, [onSearch])
    return (
        <Card className="linklist-body"
            // headerExtraContent={
            //     <Button icon={<IconFilter />}></Button>
            // }
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