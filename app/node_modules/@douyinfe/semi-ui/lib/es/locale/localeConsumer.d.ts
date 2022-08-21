import React, { Component } from 'react';
import { Locale as dateFns } from 'date-fns';
import PropTypes from 'prop-types';
import { Locale } from './interface';
declare type ChildrenRender<T> = (componentLocal: T, localeCode: string, dateFnsLocale: dateFns) => React.ReactNode;
export interface LocaleConsumerProps<T> {
    componentName: string;
    children?: ChildrenRender<T>;
}
export default class LocaleConsumer<T> extends Component<LocaleConsumerProps<T>> {
    static propTypes: {
        componentName: PropTypes.Validator<string>;
        children: PropTypes.Requireable<any>;
    };
    static defaultProps: {
        componentName: string;
    };
    renderChildren(localeData: Locale, children: ChildrenRender<T>): React.ReactNode;
    render(): JSX.Element;
}
export {};
