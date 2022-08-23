import { Button, Input, Select } from "@douyinfe/semi-ui"
import { languageOptions, trans_key } from "@i18n/resources";
import { useEffect } from "react";
import { useTranslation } from "react-i18next"
import { Link } from "react-router-dom"
import { IconExit, IconMoon, IconSun } from "@douyinfe/semi-icons";

import s0 from "./ConfigPage.module.scss"
import ContentHeader from "@app/views/Share/ContentHeader";
import { getTheme, useGlobalStore } from "@app/store/app";
import SwitchThemeButton from "@app/views/Share/Buttons/SwitchThemeButton";

function ConfigPage() {
    const { t, i18n } = useTranslation();
    const [app, switchTheme] = useGlobalStore(state => [state.app, state.switchTheme])
    return (
        <>
            <ContentHeader title={t(trans_key.Config)} />
            <div className={s0.section}>
                <div>
                    <div className={s0.label}>{t(trans_key.Language)}</div>
                    <Select style={{ width: '100%' }} defaultValue={i18n.language} onChange={(v) => i18n.changeLanguage(v as string)}>
                        {languageOptions.map(([lng, name], index) => (
                            <Select.Option value={lng} key={lng}>{name}</Select.Option>
                        ))}
                    </Select>
                </div>
                <div>
                    <div className={s0.label}>{'Action'}</div>
                    <a href="#/">
                        <Button block icon={<IconExit />}>{t(trans_key.switch_backend)}</Button>
                    </a>
                </div>
                <div>
                    <div className={s0.label}>{t('Theme')}</div>
                    <SwitchThemeButton block />
                </div>
            </div>


        </>
    )
}

export default ConfigPage