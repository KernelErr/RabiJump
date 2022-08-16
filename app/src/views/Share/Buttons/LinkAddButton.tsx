import { createRedirect } from "@app/api/redirect";
import { getCurrentApiConfig, UseGlobalStore } from "@app/store/app";
import { useLinkListStore } from "@app/store/links";
import { LinkProps } from "@app/type/link";
import LinkForm from "@app/views/DashBoard/links/LinkForm";
import { Button, Modal, Notification } from "@douyinfe/semi-ui";
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button/Button";

import * as React from "react"

import './LinkAddButton.scss'

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

interface Props extends ButtonProps {

}



function LinkAddButton({
    ...props
}: Props) {
    const [linkList, pushLinkList] = useLinkListStore(state => [state.linkList, state.pushLinkList])
    const [app] = UseGlobalStore((state) => [state.app])
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
        <Button {...props} onClick={() => {
            Modal.info({
                content: <LinkForm linkData={defaultLinkData} onCreate={onCreate} />,
                icon: null,
                className: `modal-form-wrapper`,
                footer: null
            })
        }} />
    )
}

export default React.memo(LinkAddButton)