import React from 'react';
import { noop } from '@douyinfe/semi-foundation/lib/es/utils/function';
const LayoutContext = /*#__PURE__*/React.createContext({
  siderHook: {
    addSider: noop,
    removeSider: noop
  }
});
export default LayoutContext;