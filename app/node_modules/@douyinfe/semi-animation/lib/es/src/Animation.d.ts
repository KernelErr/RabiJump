import Event from './utils/Event';
/**
 * @summary
 *
 * Lifecycle hook:
 * start, pause, resume, stop, frame, rest
 *
 * Binding method:
 * const animation = new Animation (); animation.on ('start | frame | rest ', () => {});
 */
export default class Animation extends Event {
    _config: Record<string, any>;
    _props: Record<string, any>;
    _from: Record<string, any>;
    _to: Record<string, any>;
    _delay: number;
    _currentVelocity: Record<string, any>;
    _currentStyle: Record<string, any>;
    _lastIdealStyle: Record<string, any>;
    _lastIdealVelocity: Record<string, any>;
    _frameCount: number;
    _prevTime: number;
    _timer: any;
    _startedTime: number;
    _ended: boolean;
    _stopped: boolean;
    _wasAnimating: boolean;
    _started: boolean;
    _paused: boolean;
    _accumulatedTime: Record<string, any>;
    _pausedTime: number;
    _destroyed: boolean;
    constructor(props?: {}, config?: {});
    _wrapConfig(object: {
        [x: string]: any;
    }, config: {
        delay?: string;
    }): {};
    initStates(props?: Record<string, any>, config?: Record<string, any>): void;
    animate(): void;
    start(): void;
    end(): void;
    pause(): void;
    resume(): void;
    stop(): void;
    destroy(): void;
    resetPlayStates(): void;
    reset(): void;
    reverse(): void;
    getCurrentStates(): {
        [x: string]: any;
    };
    getInitialStates(): {};
    getFinalStates(): {};
}
