import BaseFoundation, { DefaultAdapter } from '../base/foundation';
export interface SpinAdapter extends Partial<DefaultAdapter> {
    setLoading: (val: boolean) => void;
}
declare class SpinFoundation extends BaseFoundation<SpinAdapter> {
    _timer: ReturnType<typeof setTimeout>;
    static get spinDefaultAdapter(): SpinAdapter;
    constructor(adapter: SpinAdapter);
    updateLoadingIfNeedDelay(): void;
    destroy(): void;
}
export default SpinFoundation;
