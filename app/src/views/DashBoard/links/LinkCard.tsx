import * as React from 'react'
import { BasicLinkProps, LinkProps } from '@app/type/link';
import { useState } from 'react';
import { Card, Button, Popover, ButtonGroup, Collapse, Descriptions, Switch, Popconfirm, Form, Notification, Typography } from '@douyinfe/semi-ui';
import { IconClose, IconEdit, IconRefresh, IconRefresh2 } from "@douyinfe/semi-icons";
import { t } from "i18next";
import StatusDot from "./StatusDot";
import LinkForm from './LinkForm';

import "./LinkCard.scss"
import { getRedirectVisitCount } from '@app/api/redirect';
import { getCurrentApiConfig, useGlobalStore } from '@app/store/app';
import { delay } from '@app/misc/util';
import LinkFormButton from '@app/views/Share/Buttons/LinkFormButton';

import { DescriptionsItemProps } from '@douyinfe/semi-ui/lib/es/descriptions';

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
    const [count, setCount] = useState<number>();
    const [loading, setLoading] = useState(false);
    const [app] = useGlobalStore(state => [state.app]);
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
                            <Collapse
                                onChange={
                                    (v) => {
                                        v?.length
                                            ? delayedUpdateCountInfo()
                                            : null
                                    }
                                }
                            >
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
                                        <WrapedDescriptionsItem itemKey={t(`Links.name`) as string}>{linkData.name}</WrapedDescriptionsItem>
                                        <WrapedDescriptionsItem itemKey={t(`Links.target`) as string}>{linkData.target}</WrapedDescriptionsItem>
                                        <WrapedDescriptionsItem itemKey={t(`Links.mobile_target`) as string}>{linkData.mobile_target}</WrapedDescriptionsItem>
                                        <WrapedDescriptionsItem itemKey={t(`Links.description`) as string}>{linkData.desc}</WrapedDescriptionsItem>
                                        <WrapedDescriptionsItem itemKey={t(`Links.modified`) as string}>{t('time',
                                            {
                                                val: new Date(linkData.last_modified),
                                            }) as string}</WrapedDescriptionsItem>
                                        <WrapedDescriptionsItem itemKey={t(`Links.parameters`) as string}>{t(linkData.allow_parameters.toString()) as string}</WrapedDescriptionsItem>
                                        <WrapedDescriptionsItem itemKey={t(`Links.active`) as string}>{t(linkData.active.toString()) as string}</WrapedDescriptionsItem>
                                        <WrapedDescriptionsItem itemKey={t(`Links.status_code`) as string}>{linkData.status_code == null ? 302 : linkData.status_code}</WrapedDescriptionsItem>
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

function WrapedDescriptionsItem({ ...props }: DescriptionsItemProps) {
    const { Text } = Typography;
    return (
        <Descriptions.Item {...props}>
            <Text style={{ maxWidth: '185px' }}
                ellipsis={
                    {
                        showTooltip: {
                            opts: {
                                content: props.children,
                                style: { wordBreak: 'break-word' }
                            }
                        }
                    }
                }
            >
                {props.children as string}
            </Text>
        </Descriptions.Item>
    )
}

export default LinkCard;