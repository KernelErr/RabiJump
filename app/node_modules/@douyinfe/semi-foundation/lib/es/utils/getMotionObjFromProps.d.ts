import { MotionObject } from "./type";
export interface MergeMotionProps {
    [x: string]: any;
    motion?: any;
    willEnter?: () => void;
    didEnter?: () => void;
    willLeave?: () => void;
    didLeave?: () => void;
    onStart?: () => void;
    onRest?: () => void;
    state?: Record<string, any>;
}
/**
 * get motion object from props
 *
 * example:
 *
 * ```
 *  props = { didLeave: componentHandler, motion: { didLeave: userHandler } };
 *  return { didLeave: () => { componentHandler(); userHandler(); }};
 * ```
 *
 * @param { props: Object }
 * @returns { motion: Object }
 */
export default function getMotionObjFromProps(props: MergeMotionProps): MotionObject;
