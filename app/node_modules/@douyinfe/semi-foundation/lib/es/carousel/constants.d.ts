declare const cssClasses: {
    CAROUSEL: string;
    CAROUSEL_INDICATOR: string;
    CAROUSEL_INDICATOR_LINE: string;
    CAROUSEL_INDICATOR_DOT: string;
    CAROUSEL_INDICATOR_COLUMNAR: string;
    CAROUSEL_INDICATOR_INACTIVE: string;
    CAROUSEL_INDICATOR_ACTIVE: string;
    CAROUSEL_CONTENT: string;
    CAROUSEL_ARROW: string;
};
declare const numbers: {
    DEFAULT_ACTIVE_INDEX: number;
    DEFAULT_INTERVAL: number;
    DEFAULT_SPEED: number;
};
declare const strings: {
    readonly ANIMATION_MAP: readonly ["slide", "fade"];
    readonly DIRECTION: readonly ["left", "right"];
    readonly TYPE_MAP: readonly ["columnar", "line", "dot"];
    readonly THEME_MAP: readonly ["dark", "primary", "light"];
    readonly POSITION_MAP: readonly ["left", "center", "right"];
    readonly ARROW_MAP: readonly ["always", "hover"];
    readonly SIZE: readonly ["small", "medium"];
    readonly TRIGGER: readonly ["click", "hover"];
};
export { cssClasses, numbers, strings };
