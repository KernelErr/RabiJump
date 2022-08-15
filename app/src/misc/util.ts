export function debounce<T extends any[]>(
    fn: (...args: T) => unknown,
    timeout: number
) {
    let timeoutId: ReturnType<typeof setTimeout>;
    return (...args: T) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            fn(...args);
        }, timeout)
    }
}
export function delay<T extends any[]>(
    fn: (...args: T) => unknown,
    timeout: number
) {
    return (...args: T) => {
        setTimeout(() => {
            fn(...args)
        }, timeout)
    }
}