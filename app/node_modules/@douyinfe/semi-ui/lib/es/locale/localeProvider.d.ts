import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Locale } from './interface';
export interface LocaleProviderProps {
    children?: React.ReactNode;
    locale?: Locale;
}
export default class LocaleProvider extends Component<LocaleProviderProps> {
    static propTypes: {
        locale: PropTypes.Requireable<object>;
        children: PropTypes.Requireable<PropTypes.ReactNodeLike>;
    };
    static defaultProps: {
        locale: Locale;
    };
    constructor(props: LocaleProviderProps);
    render(): JSX.Element;
}
