import LinkAddButton from "@app/views/Share/Buttons/LinkAddButton";
import SwitchThemeButton from "@app/views/Share/Buttons/SwitchThemeButton";
import { IconPlus } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import s0 from "./LinkManage.module.scss"

function LinkManage() {
    return (
        <div className={s0.root}>
            <div className={s0.inner}>
                <div className={s0.wrapper}>
                    <LinkAddButton size="large" icon={<IconPlus />} />
                    <SwitchThemeButton size="large" />
                </div>
            </div>

        </div>
    )
}
export default LinkManage;