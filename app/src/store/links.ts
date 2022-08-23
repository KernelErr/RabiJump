
import { LinkProps } from '@app/type/link'
import create from 'zustand'

const defaultCount = 10;
const defaultSkip = 0;

interface State {
    linkList: Array<LinkProps>,
    paginationConfig: {
        count: number,
        skip: number
    },
    total: number,
    prefix: string,
    setLinkList: (list: Array<LinkProps>) => void,
    pushLinkList: (item: LinkProps) => void,
    setPaginationConfig: (count?: number, skip?: number) => void,
    setTotal: (total: number) => void,
    setPrefix: (v: string) => void;
}

export const useLinkListStore = create<State>((set, get) => ({
    linkList: [],
    paginationConfig: {
        count: defaultCount,
        skip: defaultSkip
    },
    total: 0,
    prefix: '',
    setLinkList: (list) => set({ linkList: [...list] }),
    pushLinkList: (item) => {
        const { linkList, setLinkList } = get();
        let idx = isLinkExist(linkList, item)
        if (idx == -1) {
            const { total, setTotal } = get();
            linkList.push(item)
            setTotal(total + 1);
        } else {
            linkList[idx] = item
        }
        setLinkList(linkList);
    },
    setPaginationConfig: function (_count, _skip) {
        let count = _count ? _count : defaultCount;
        let skip = _skip ? _skip : defaultSkip;
        set({ paginationConfig: { count: count, skip: skip } })
    },
    setTotal: (total) => set({ total: total }),
    setPrefix: (v) => set({ prefix: v }),
}))

function isLinkExist(linkList: Array<LinkProps>, item: LinkProps): number {
    for (let [idx, obj] of linkList.entries()) {
        if (obj.name == item.name) {
            return idx
        }
    }
    return -1
}