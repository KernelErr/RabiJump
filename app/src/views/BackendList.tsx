import { useToggle } from "@app/hooks/basic";
import { useGlobalStore } from "@app/store/app";
import { ApiConfig } from "@app/type/app";
import { IconClose, IconEyeClosedSolid, IconEyeOpened } from "@douyinfe/semi-icons";
import { Button, Card } from "@douyinfe/semi-ui";
import { Link } from "react-router-dom";
import "./BackendList.scss"

function BackendList() {

    const [app, removeApiConfig, selectApiConfig] = useGlobalStore(state =>
        [state.app, state.removeApiConfig, state.selectApiConfig])
    return (
        <>
            {app.apiConfigs.map((item, idx) => (
                <CardItem
                    key={idx}
                    baseURL={item.baseURL}
                    token={item.token}
                    onRemove={removeApiConfig}
                    onSelect={selectApiConfig}
                />
            ))}
        </>
    )
}

function CardItem({
    baseURL,
    token,
    onRemove,
    onSelect
}: {
    baseURL: string,
    token: string | undefined,
    onRemove: (api: ApiConfig) => void,
    onSelect: (api: ApiConfig) => void,
}) {
    const { Meta } = Card;
    const { isOn: show, toggle } = useToggle();
    const Icon = show ? IconEyeClosedSolid : IconEyeOpened
    return (
        <Card
            shadows="hover"
            className="backend-list-card"
        >
            <Meta
                title={
                    <Link to={"dashboard/links"}>
                        <span onClick={() => onSelect({ baseURL, token })}>{baseURL}</span>
                    </Link>
                }
                avatar={
                    <Button onClick={() => onRemove({ baseURL, token })}
                        theme="borderless" icon={<IconClose />}
                    />
                }
                description={
                    token ? (
                        <>
                            <span>{show ? token : '***'}</span>
                            <Button onClick={toggle}
                                className="eye"
                                theme="borderless" icon={<Icon />} />
                        </>
                    ) : null
                }
            />
        </Card>
    )
}

export default BackendList;