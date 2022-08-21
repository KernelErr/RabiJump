import { PresetsItem } from './presets';
export interface Value {
    easing: string;
    duration: number | string;
}
export interface DefaultConfig extends PresetsItem {
    precision: number;
}
export interface Config {
    easing?: string;
    duration?: number | string;
    delay?: string;
}
export interface Wrapped extends DefaultConfig, Config {
    done: boolean;
    val?: Value;
}
export default function wrapValue(val: Value, config?: Config): Wrapped;
