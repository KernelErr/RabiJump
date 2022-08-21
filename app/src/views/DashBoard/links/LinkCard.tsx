import * as React from 'react'
import { BasicLinkProps, LinkProps } from '@app/type/link';
import { useState } from 'react';
import { Card, Button, Popover, ButtonGroup, Collapse, Descriptions, Switch, Popconfirm, Form, Notification } from '@douyinfe/semi-ui';
import { IconClose, IconEdit, IconRefresh, IconRefresh2 } from "@douyinfe/semi-icons";
import { t } from "i18next";
import StatusDot from "./StatusDot";
import LinkForm from './LinkForm';

import "./LinkCard.scss"
import { getRedirectVisitCount } from '@app/api/redirect';
import { getCurrentApiConfig, UseGlobalStore } from '@app/store/app';
import { delay } from '@app/misc/util';
import LinkFormButton from '@app/views/Share/Buttons/LinkFormButton';

const LinkCard = React.memo(function LinkCard({
    linkData,
    index,
    onRemove,
    onUpdate,
    onActive,
}: {
    linkData: LinkProps
    index: number
    onRemove: (idx: number) => void
    onUpdate: (data: LinkProps, idx: number) => void
    onActive: (data: boolean, idx: number) => void
}) {
    const [visible, setVisible] = useState(false);
    const [count, setCount] = useState<number>();
    const [loading, setLoading] = useState(false);
    const [app] = UseGlobalStore(state => [state.app]);
    const updateCountInfo = React.useCallback(
        (enable: boolean = false) => {
            enable ? setLoading(true) : null;
            getRedirectVisitCount(linkData.name, getCurrentApiConfig(app))
                .then(res => {
                    setCount(res.data.count)
                    enable ? setLoading(false) : null
                    enable ? Notification.success({
                        content: 'Update success',
                        duration: 1
                    }) : null
                })
        }, []
    )
    const delayedUpdateCountInfo = React.useMemo(() => delay(updateCountInfo, 300), [updateCountInfo])
    const { Meta } = Card
    return (
        <div
            id={`listcard-wrapper-${index}`}
            style={{ position: 'relative' }}
        >
            <Card
                shadows="hover"
                className="listcard-card"

            >
                <Meta
                    title={
                        <>
                            <Switch checked={linkData.active} onChange={(v, e) => {
                                onActive(v, index)
                            }}></Switch>
                            <Collapse onChange={
                                (v) => {
                                    v?.length
                                        ? delayedUpdateCountInfo()
                                        : null
                                }
                            }>
                                <Collapse.Panel
                                    className="listcard-description"
                                    style={{ width: '300px' }}
                                    header={
                                        <>
                                            <div className="listcard-header-content">
                                                <StatusDot active={linkData.active} />
                                                {linkData.name}
                                            </div>
                                            <ButtonGroup>
                                                <LinkFormButton
                                                    icon={<IconEdit />}
                                                    theme="borderless"
                                                    update
                                                    linkProps={linkData}
                                                    index={index}
                                                    onSubmitHandler={onUpdate}
                                                />
                                                <Button
                                                    icon={<IconClose />}
                                                    type="danger"
                                                    theme="borderless"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        onRemove(index)
                                                    }}></Button>
                                            </ButtonGroup>
                                        </>
                                    }
                                    itemKey={`${index}`}
                                    showArrow={false}
                                >
                                    <Descriptions>
                                        <Descriptions.Item itemKey={t(`Links.name`) as string}>{linkData.name}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.target`) as string}>{linkData.target}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.mobile_target`) as string}>{linkData.mobile_target}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.description`) as string}>{linkData.desc}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.modified`) as string}>{t('time',
                                            {
                                                val: new Date(linkData.last_modified),
                                            }) as string}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.parameters`) as string}>{t(linkData.allow_parameters.toString()) as string}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.active`) as string}>{t(linkData.active.toString()) as string}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.status_code`) as string}>{linkData.status_code == null ? 302 : linkData.status_code}</Descriptions.Item>
                                        <Descriptions.Item itemKey={t(`Links.count`) as string}>
                                            <div className="linkcard-description-item-count">
                                                <span>{count}</span>
                                                <Button loading={loading} theme='borderless' onClick={() => updateCountInfo(true)} icon={<IconRefresh />} />
                                            </div>
                                        </Descriptions.Item>

                                    </Descriptions>
                                </Collapse.Panel>
                            </Collapse>
                        </>

                    }
                />
            </Card>

        </div>
    )
})

export default LinkCard;