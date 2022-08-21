import React from 'react';
export interface ArrowProps {
    position?: string;
    className?: string;
    arrowStyle?: React.CSSProperties;
    popStyle?: React.CSSProperties;
}
declare const Arrow: React.FC<ArrowProps>;
export default Arrow;
