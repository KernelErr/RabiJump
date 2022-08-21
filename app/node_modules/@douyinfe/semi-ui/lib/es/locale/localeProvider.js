import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from './context';
import DefaultLocale from './source/zh_CN';
export default class LocaleProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      children,
      locale
    } = this.props;
    return /*#__PURE__*/React.createElement(LocaleContext.Provider, {
      value: locale
    }, children);
  }

}
LocaleProvider.propTypes = {
  locale: PropTypes.object,
  children: PropTypes.node
};
LocaleProvider.defaultProps = {
  locale: DefaultLocale
};