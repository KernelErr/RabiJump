import { GlobalState } from "@app/type/app";

const StorageKey = 'RabiJump';

function loadState() {
    try {
        const serialized = localStorage.getItem(StorageKey);
        if (!serialized) return undefined;
        return JSON.parse(serialized);
    } catch (err) {
        return undefined;
    }
}

function saveState(state: GlobalState) {
    try {
        const serialized = JSON.stringify(state);
        localStorage.setItem(StorageKey, serialized);
    } catch (err) {

    }
}

function clearState() {
    try {
        localStorage.removeItem(StorageKey);
    } catch (err) {

    }
}

export { loadState, saveState, clearState };

