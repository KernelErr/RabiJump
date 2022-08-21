import _get from "lodash/get";
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LocaleContext from './context';
import ConfigContext from '../configProvider/context';
import DefaultLocale from './source/zh_CN';
export default class LocaleConsumer extends Component {
  renderChildren(localeData, children) {
    const {
      componentName
    } = this.props;
    let locale = localeData;

    if (!(localeData === null || localeData === void 0 ? void 0 : localeData.code)) {
      locale = DefaultLocale;
    }
    /**
     * dateFnsLocale is used to format the date into a local date
     * example:
     *  import { zhCN } from "date-fns/locale";
     *  format(new Date("2021-04-29"), "yyyy-MM-dd EEEE")
     *      => '2021-04-29 Thursday' (默认 locale 为 en-US)
     *  format(new Date('2021-04-29'), "yyyy-MM-dd EEEE", { locale: zhCN })
     *      => '2021-04-29 星期四'
     */


    const defaultFnsLocale = _get(DefaultLocale, 'dateFnsLocale');

    const dateFnsLocale = _get(locale, 'dateFnsLocale', defaultFnsLocale);

    return children(locale[componentName], locale.code, dateFnsLocale);
  }

  render() {
    const {
      children
    } = this.props;
    return /*#__PURE__*/React.createElement(ConfigContext.Consumer, null, _ref => {
      let {
        locale
      } = _ref;
      return /*#__PURE__*/React.createElement(LocaleContext.Consumer, null, localeData => this.renderChildren(locale || localeData, children));
    });
  }

}
LocaleConsumer.propTypes = {
  componentName: PropTypes.string.isRequired,
  children: PropTypes.any
};
LocaleConsumer.defaultProps = {
  componentName: ''
};