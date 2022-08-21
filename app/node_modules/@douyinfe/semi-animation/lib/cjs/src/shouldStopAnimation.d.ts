/**
 * usage assumption: currentStyle values have already been rendered but it says
 * nothing of whether currentStyle is stale (see unreadPropStyle)
 *
 * @param {object} currentStyle
 * @param {object} style
 * @param {object} currentVelocity
 * @param {number} startTime
 * @param {number} nowTime
 *
 * @returns {boolean}
 */
export default function shouldStopAnimation(currentStyle: Record<string, any>, style: Record<string, any>, currentVelocity: Record<string, any>, startTime: number, nowTime: number): boolean;
