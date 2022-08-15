import { createRedirect } from "@app/api/redirect";
import { getCurrentApiConfig, UseGlobalStore } from "@app/store/app";
import { useLinkListStore } from "@app/store/links";
import { BasicLinkProps, LinkProps } from "@app/type/link";
import { Card, Collapse, Notification } from "@douyinfe/semi-ui";
import { IconPlus } from "@douyinfe/semi-icons";

import LinkForm from "./LinkForm";
import { useTranslation } from "react-i18next";

const defaultLinkData = {
    name: '',
    desc: '',
    target: '',
    active: true,
    allow_parameters: true,
    last_modified: '',
    status_code: null,
    mobile_target: null
}

function LinkManage() {
    const [t] = useTranslation();
    const [app] = UseGlobalStore((state) => [state.app])
    const [linkList, pushLinkList] = useLinkListStore(state => [state.linkList, state.pushLinkList])
    const onCreate = (data: LinkProps) => {
        if (!data.status_code) data.status_code = 302
        createRedirect(data, getCurrentApiConfig(app))
            .then((res) => {
                pushLinkList(res.data)
                Notification.success({
                    content: 'Create success.'
                })
            })
    }
    return (
        <Card>
            <Collapse>
                <Collapse.Panel header={
                    <>
                        <IconPlus />
                        <div>{t('add')}</div>
                    </>
                } itemKey="1">
                    <LinkForm
                        linkData={defaultLinkData}
                        onCreate={onCreate}
                    />
                </Collapse.Panel>
            </Collapse>
        </Card>
    )
}

export default LinkManage;