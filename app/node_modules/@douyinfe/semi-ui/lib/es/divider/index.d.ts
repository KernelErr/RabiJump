import React, { CSSProperties, ReactNode } from 'react';
import '@douyinfe/semi-foundation/lib/es/divider/divider.css';
export interface DividerProps {
    /** The position of title inside divider */
    align?: 'left' | 'right' | 'center';
    /** space between divider and surroundings **/
    margin?: number | string;
    /** The wrapped title */
    children?: ReactNode;
    /** Style class name */
    className?: string;
    /** Whether line is dashed  */
    dashed?: boolean;
    /** The direction type of divider */
    layout?: 'horizontal' | 'vertical';
    /** Divider inline style */
    style?: CSSProperties;
}
declare const Divider: React.FC<DividerProps>;
export default Divider;
