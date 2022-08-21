import React from 'react';
import { strings } from '@douyinfe/semi-foundation/lib/cjs/empty/constants';
import '@douyinfe/semi-foundation/lib/cjs/empty/empty.css';
import BaseComponent from '../_base/baseComponent';
import { ArrayElement } from '../_base/base';
interface SVGNode {
    id?: string;
    viewBox?: string;
    url?: string;
}
export interface EmptyProps {
    layout?: ArrayElement<typeof strings.LAYOUT>;
    imageStyle?: React.CSSProperties;
    title?: React.ReactNode;
    description?: React.ReactNode;
    image?: React.ReactNode | SVGNode;
    darkModeImage?: React.ReactNode | SVGNode;
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
}
interface EmptyState {
    mode: any;
}
export default class Empty extends BaseComponent<EmptyProps, EmptyState> {
    static defaultProps: {
        layout: string;
    };
    body: any;
    observer: MutationObserver;
    constructor(props: EmptyProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    observe: (mutationsList: any) => void;
    updateMode: () => void;
    render(): JSX.Element;
}
export {};
