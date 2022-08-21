declare const cssClasses: {
    PREFIX: "semi-input";
};
declare const numbers: {
    DEFAULT_STEP: number;
    DEFAULT_SHIFT_STEP: number;
    DEFAULT_PRESS_TIMEOUT: number;
    DEFAULT_PRESS_INTERVAL: number;
    MOUSE_BUTTON_LEFT: number;
};
declare const strings: {
    SIZE: readonly ["small", "large", "default"];
    DEFAULT_SIZE: "default";
    STATUS: readonly ["default", "error", "warning", "success"];
    CLEARBTN_CLICKED_EVENT_FLAG: "__fromClearBtn";
    MODE: readonly ["password"];
};
export { cssClasses, numbers, strings };
