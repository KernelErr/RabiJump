import React from 'react';
import { ToastInstance } from '@douyinfe/semi-foundation/lib/cjs/toast/toastFoundation';
interface HookToastProps extends ToastInstance {
    afterClose: (id: string) => void;
}
declare const _default: React.ForwardRefExoticComponent<HookToastProps & React.RefAttributes<any>>;
export default _default;
