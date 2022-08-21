import React from 'react';
import PropTypes from 'prop-types';
export interface ReactIntersectionObserverProps {
    onIntersect?: IntersectionObserverCallback;
    option?: IntersectionObserverInit;
    children?: React.ReactNode;
    root?: IntersectionObserverInit['root'];
    threshold?: IntersectionObserverInit['threshold'];
    rootMargin?: IntersectionObserverInit['rootMargin'];
    items?: Record<string, Element>;
}
export default class ReactIntersectionObserver extends React.PureComponent<ReactIntersectionObserverProps> {
    static propTypes: {
        onIntersect: PropTypes.Requireable<(...args: any[]) => any>;
        option: PropTypes.Requireable<object>;
        root: PropTypes.Requireable<any>;
        threshold: PropTypes.Requireable<number>;
        rootMargin: PropTypes.Requireable<string>;
        items: PropTypes.Requireable<object>;
    };
    static defaultProps: {
        onIntersect: () => void;
        threshold: number;
        rootMargin: string;
        option: {};
        items: {};
    };
    observer: IntersectionObserver;
    cachedKeys: Array<string>;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    observeElement(force?: boolean): void;
    render(): React.ReactNode;
}
