import { IconAlertCircle, IconApps, IconServer, IconWrench } from "@douyinfe/semi-icons";
import { Button, Layout, Nav } from "@douyinfe/semi-ui"
import { useMemo } from "react";
import * as React from 'react';
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

import s0 from "./SiderBar.module.scss"

interface SiderBarRowProps {
    itemKey: string,
    text: string,
    icon?: React.ReactNode | any,
    to: string,
    onSelected: (itemKey: string) => void
}

const pages = [
    // {
    //     itemKey: '',
    //     text: 'Overview',
    //     icon: IconServer,
    //     to: '',
    // },
    {
        itemKey: 'links',
        text: 'Links',
        icon: IconApps,
        to: 'links'
    },
    {
        itemKey: 'configs',
        text: 'Config',
        icon: IconWrench,
        to: 'configs'
    }, {
        itemKey: 'about',
        text: 'About',
        icon: IconAlertCircle,
        to: 'about'
    }
]

const SiderBarRow = React.memo(function SiderBarRow({
    itemKey,
    text,
    icon,
    to,
    onSelected
}: SiderBarRowProps) {
    return (
        <Link to={to}>
            <Nav.Item itemKey={itemKey} text={text} icon={icon ? icon.render() : null} onClick={() => onSelected(itemKey)} />
        </Link>
    )
})

function SideBar() {
    const { Sider } = Layout;
    const { t } = useTranslation();
    const [selectedKey, setSelectedKey] = React.useState<string[]>([]);

    const onSelect = React.useCallback((v: any) => {
        setSelectedKey([v])
    }, [])
    React.useLayoutEffect(() => {
        const itemKey = location.hash.substring("#/dashboard".length).substring(1)
        setSelectedKey([itemKey])
        return () => {
            setSelectedKey([])
        }
    }, [])
    return (
        <Sider>
            <Nav
                style={{ maxWidth: 220, height: '100%' }}
                selectedKeys={selectedKey}
                footer={{
                    collapseButton: true,
                    collapseText: (c) => t('collapse')
                }}
            >
                {pages.map(({ itemKey, text, icon, to }) => (
                    <SiderBarRow
                        key={itemKey}
                        itemKey={itemKey}
                        text={t(text)}
                        icon={icon}
                        to={to}
                        onSelected={onSelect}
                    />
                ))}
            </Nav>
        </Sider>
    )
}
export default SideBar