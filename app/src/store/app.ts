import { ApiConfig, GlobalState, ThemeStyle } from '@app/type/app'
import create from 'zustand'

import { loadState, saveState } from '@app/misc/storage'


const defaultApiConfig: ApiConfig = {
    baseURL: 'http://127.0.0.1:8081',
    token: '',
}

const defaultState: GlobalState = {
    apiConfigs: [defaultApiConfig],
    selectedApiConfigIndex: 0,

    theme: 'dark'
}

type State = {
    app: GlobalState,
    addApiConfig: ({ baseURL, token }: ApiConfig) => void,
    removeApiConfig: ({ baseURL, token }: ApiConfig) => void,
    selectApiConfig: ({ baseURL, token }: ApiConfig) => void,
    switchTheme: () => void
}

export const getApiConfigs = (app: GlobalState) => app.apiConfigs
export const getSelectedApiConfigIndex = (app: GlobalState) => app.selectedApiConfigIndex
export const getTheme = (app: GlobalState) => app.theme
export const getCurrentApiConfig = (app: GlobalState) => app.apiConfigs[app.selectedApiConfigIndex];


export const UseGlobalStore = create<State>((set, get) => {
    return {
        app: initialState(),

        addApiConfig: ({ baseURL, token }: ApiConfig) => {
            const app = get().app;
            const idx = findApiConfigIndex(app, { baseURL, token })
            if (idx !== undefined) return;
            const apiConfig: ApiConfig = { baseURL, token };
            app.apiConfigs.push(apiConfig);
            set({ app: app });
            saveState(app);
        },

        removeApiConfig: ({ baseURL, token }: ApiConfig) => {
            const app = get().app;
            const idx = findApiConfigIndex(app, { baseURL, token });
            app.apiConfigs.splice(idx as number, 1);
            set({ app: app });
            saveState(app);
        },

        selectApiConfig: ({ baseURL, token }: ApiConfig) => {
            const app = get().app;
            const idx = findApiConfigIndex(app, { baseURL, token });
            const cur = getSelectedApiConfigIndex(app);
            if (cur !== idx) {
                app.selectedApiConfigIndex = idx as number;
            }
            set({ app: app });
            saveState(app);

        },

        switchTheme: () => {
            const app = get().app;
            const currentTheme = getTheme(app);
            const theme = currentTheme === 'light' ? 'dark' : 'light';
            app.theme = theme;
            changeTheme(theme)
            set({ app: app });
            saveState(app);
        }

    }
})

const { getState, setState, subscribe, destroy } = UseGlobalStore;
export { getState, setState, subscribe, destroy };

function findApiConfigIndex(app: GlobalState, { baseURL, token }: ApiConfig): number | undefined {
    const arr = getApiConfigs(app);
    for (let i = 0; i < arr.length; i++) {
        const x = arr[i];
        if (x.baseURL === baseURL && x.token === token) return i;
    }
}


export function initialState() {
    let s = loadState() as GlobalState;
    s = { ...defaultState, ...s }

    changeTheme(s.theme);
    return s;
}

function changeTheme(theme: ThemeStyle) {
    const body = document.body;
    if (theme == 'dark') {
        body.setAttribute('theme-mode', 'dark')
    } else {
        body.removeAttribute('theme-mode')
    }
}



