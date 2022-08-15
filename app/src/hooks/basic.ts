import { useState, useCallback } from "react";

export function useToggle(initialValue = false) {
    const [isOn, setState] = useState(initialValue);
    const toggle = useCallback(() => setState((x) => !x), []);
    return { isOn, toggle };
}