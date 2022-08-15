
import { LinkProps } from '@app/type/link'
import create from 'zustand'

interface State {
    linkList: Array<LinkProps>,
    setLinkList: (list: Array<LinkProps>) => void,
    pushLinkList: (item: LinkProps) => void
}

export const useLinkListStore = create<State>((set, get) => ({
    linkList: [],
    setLinkList: (list) => set({ linkList: [...list] }),
    pushLinkList: (item) => {
        const { linkList, setLinkList } = get();
        let idx = isLinkExist(linkList, item)
        if (idx == -1) {
            linkList.push(item)
        } else {
            linkList[idx] = item
        }
        setLinkList(linkList);
    }
}))

function isLinkExist(linkList: Array<LinkProps>, item: LinkProps): number {
    for (let [idx, obj] of linkList.entries()) {
        if (obj.name == item.name) {
            return idx
        }
    }
    return -1
}