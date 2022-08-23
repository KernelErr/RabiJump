import en from "./en.json"
import zh from "./zh.json"

export const resources = {
    "zh": {
        translation: zh
    },
    "en": {
        translation: en
    }
}

export const trans_key = {
    "Overview": "Overview",
    "Links": "Links",
    "Links.name": "Links.name",
    "Links.description": "Links.description",
    "Links.target": "Links.target",
    "Links.mobile_target": "Links.mobile_target",
    "Links.parameters": "Links.parameters",
    "Links.active": "Links.active",
    "Links.modified": "Links.modified",
    "Links.status_code": "Links.status_code",
    "Config": "Config",

    "About": "About",

    "false": "false",
    "true": "true",
    "cancle": "cancle",
    "update": "update",
    "create": "create",
    "add": "add",
    "search": "search",
    "search.ByPrefix": "search.ByPrefix",
    "collapse": "collapse",
    "switch_backend": "switch_backend",

    "Language": "Language",
    "Theme": "Theme"
}

export const languageOptions: Array<[string, string]> = [
    ['zh', '中文'],
    ['en', 'English']
]

import zh_CN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import en_US from '@douyinfe/semi-ui/lib/es/locale/source/en_US';

type PairType = {
    [key: string]: any
}

export const semiLocalesOptions: PairType = {
    zh: zh_CN,
    en: en_US
}