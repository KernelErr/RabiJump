import { getTheme, UseGlobalStore } from "@app/store/app";
import { IconMoon, IconSun } from "@douyinfe/semi-icons";
import { Button } from "@douyinfe/semi-ui";
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button/Button";
import * as React from "react"

interface Props extends ButtonProps {
    LightIcon?: React.ReactNode
    DarkIcon?: React.ReactNode
}

function SwitchThemeButton({
    LightIcon = <IconSun />,
    DarkIcon = <IconMoon />,
    ...props
}: Props) {
    const [app, switchTheme] = UseGlobalStore(state => [state.app, state.switchTheme])
    return (
        <Button {...props} icon={getTheme(app) == 'light' ? LightIcon : DarkIcon} onClick={switchTheme} />
    )
}

export default React.memo(SwitchThemeButton)