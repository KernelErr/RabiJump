export type ApiConfig = {
    baseURL: string;
    token?: string;
};

export type GlobalState = {
    apiConfigs: Array<ApiConfig>,
    selectedApiConfigIndex: number,

    theme: ThemeStyle,
}

export type ThemeStyle = 'dark' | 'light'