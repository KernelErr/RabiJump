import { createRedirect } from "@app/api/redirect";
import { getCurrentApiConfig, UseGlobalStore } from "@app/store/app";
import { useLinkListStore } from "@app/store/links";
import { LinkProps } from "@app/type/link";
import LinkForm from "@app/views/DashBoard/links/LinkForm";
import { Button, Modal, Notification } from "@douyinfe/semi-ui";
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button/Button";

import * as React from "react"

import './LinkFormButton.scss'

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
    update?: boolean
    index?: number
    linkProps?: LinkProps
    onSubmitHandler: (data: LinkProps, idx: number) => void;
}

function LinkFormButton({
    onSubmitHandler,
    update,
    linkProps,
    index,
    ...props
}: Props) {
    return (
        <Button {...props} onClick={(e) => {
            e.stopPropagation();
            Modal.info({
                content: <LinkForm
                    update={update}
                    index={index}
                    linkData={linkProps ? linkProps : defaultLinkData}
                    onSubmitHandler={onSubmitHandler} />,
                icon: null,
                className: `modal-form-wrapper`,
                footer: null,
            })
        }} />
    )
}

export default React.memo(LinkFormButton)