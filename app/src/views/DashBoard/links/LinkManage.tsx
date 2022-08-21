import { createRedirect } from "@app/api/redirect";
import { getCurrentApiConfig, UseGlobalStore } from "@app/store/app";
import { useLinkListStore } from "@app/store/links";
import { LinkProps } from "@app/type/link";
import LinkFormButton from "@app/views/Share/Buttons/LinkFormButton";
import SwitchThemeButton from "@app/views/Share/Buttons/SwitchThemeButton";
import { IconPlus } from "@douyinfe/semi-icons";
import { Button, Notification } from "@douyinfe/semi-ui";
import s0 from "./LinkManage.module.scss"

function LinkManage() {
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
        <div className={s0.root}>
            <div className={s0.inner}>
                <div className={s0.wrapper}>
                    <LinkFormButton onSubmitHandler={onCreate} size="large" icon={<IconPlus />} />
                    <SwitchThemeButton size="large" />
                </div>
            </div>

        </div>
    )
}
export default LinkManage;