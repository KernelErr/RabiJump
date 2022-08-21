import React from 'react';
import { NoticeInstance } from '@douyinfe/semi-foundation/lib/cjs/notification/notificationFoundation';
export interface HookNoticeProps extends NoticeInstance {
    afterClose: (id: string) => void;
}
declare const _default: React.ForwardRefExoticComponent<HookNoticeProps & React.RefAttributes<any>>;
export default _default;
