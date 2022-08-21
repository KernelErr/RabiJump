declare class Logger {
    _prefix: string;
    /**
     * specify prefix
     * @param {string} prefix
     */
    constructor(prefix: string);
    _isEmpty(value: any): boolean;
    _baseLog(method?: string, ...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
}
export default Logger;
