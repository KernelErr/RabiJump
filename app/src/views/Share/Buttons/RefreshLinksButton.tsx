import { getRedirectLists, searchRedirectsByPrefix } from "@app/api/redirect";
import { getCurrentApiConfig, useGlobalStore } from "@app/store/app";
import { useLinkListStore } from "@app/store/links";
import { IconRefresh } from "@douyinfe/semi-icons";
import { Button, Notification } from "@douyinfe/semi-ui";
import { ButtonProps } from "@douyinfe/semi-ui/lib/es/button";
import { useCallback } from "react";

interface Props extends ButtonProps {

}

function RefreshLinksButton(props: Props) {
    const [app] = useGlobalStore(state => [state.app])
    const [prefix, setLinkList, paginationConfig, setPaginationConfig, setTotal] =
        useLinkListStore(state => [state.prefix, state.setLinkList, state.paginationConfig, state.setPaginationConfig, state.setTotal])
    const fetchListHandler = useCallback(prefix === '' ? getRedirectLists : searchRedirectsByPrefix, [prefix])
    return (
        <Button {...props} icon={<IconRefresh />} onClick={() => {
            fetchListHandler(getCurrentApiConfig(app), prefix, paginationConfig.count, 0)
                .then((res) => {
                    setPaginationConfig(paginationConfig.count)
                    setLinkList(res.data.data)
                    setTotal(res.data.total)
                    Notification.success({
                        content: 'Refresh success.'
                    })
                })
        }} />
    )
}

export default RefreshLinksButton;