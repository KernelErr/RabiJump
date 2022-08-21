/**
 * stiffness is like tension
 * damping is like friction
 */
export interface PresetsItem {
    tension: number;
    friction: number;
}
export interface Presets {
    default: PresetsItem;
    gentle: PresetsItem;
    wobbly: PresetsItem;
    stiff: PresetsItem;
    slow: PresetsItem;
    molasses: PresetsItem;
}
declare const _default: Presets;
export default _default;
