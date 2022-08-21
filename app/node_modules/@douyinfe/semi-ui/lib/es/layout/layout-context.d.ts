import React from 'react';
export interface ContextType {
    siderHook: {
        addSider: (id: string) => void;
        removeSider: (id: string) => void;
    };
}
declare const LayoutContext: React.Context<ContextType>;
export default LayoutContext;
