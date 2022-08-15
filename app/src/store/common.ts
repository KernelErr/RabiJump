import create from 'zustand'

type State = {
    loading: boolean,
    toogleLoading: (i: boolean) => void
}

const CommonStore = create<State>((set, get) => ({
    loading: false,
    toogleLoading: (i = false) => set({ loading: i })
}))

const { getState, setState, subscribe, destroy } = CommonStore;
export { getState, setState, subscribe, destroy };
export default CommonStore;