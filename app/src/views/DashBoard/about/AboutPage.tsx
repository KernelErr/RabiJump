import { backendVersion } from "@app/api/connect";
import { getCurrentApiConfig, useGlobalStore } from "@app/store/app";
import ContentHeader from "@app/views/Share/ContentHeader";
import { IconGithubLogo } from "@douyinfe/semi-icons";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import s0 from "./AboutPage.module.scss"

function Version({
    name,
    link,
    version
}: {
    name: string,
    link: string,
    version: string
}) {

    return (
        <div className={s0.root}>
            <h2>{name}</h2>
            <p>
                <span>Version </span>
                <span className={s0.mono}>{version}</span>
            </p>
            <p>
                <a className={s0.link} href={link} target="_blank">
                    <IconGithubLogo size="large" />
                    <span>
                        Source
                    </span>
                </a>
            </p>
        </div>
    )
}

function AboutPage() {
    const [t] = useTranslation();
    const [app] = useGlobalStore(state => [state.app])
    const [version, setVersion] = useState('');
    const fetchVersion = useCallback(async () => {
        const { data } = await backendVersion(getCurrentApiConfig(app))
        setVersion(data);
    }, [])
    useEffect(() => {
        fetchVersion();
    }, [])
    return (
        <>
            <ContentHeader title={t('About')} />
            <Version
                name="RabiJump"
                version={version}
                link="https://github.com/KernelErr/RabiJump"
            />
            <Version
                name="RabiJump-Web"
                version={__VERSION__}
                link="https://github.com/KernelErr/RabiJump/tree/main/app"
            />
        </>
    )
}

export default AboutPage;