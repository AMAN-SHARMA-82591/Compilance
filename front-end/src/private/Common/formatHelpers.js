import _ from 'lodash';
import * as R from 'ramda';

export const formatStatus = (status) => {
    return _.chain(status)
      .split('-')
      .map(_.capitalize)
      .join(' ')
      .value();
  };

export const capitalizeWords = (str, separator = ' ') => {
    return _.chain(str)
        .split(separator)
        .map(_.capitalize)
        .join(separator)
        .value();
};