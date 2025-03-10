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

export const formatShortName = (name) => {
  const words = _.split(name, ' ');
  const firstWord = _.truncate(words[0], { length: 5, omission: '' });
  const secondWord = words[1] ? _.truncate(words[1], { length: 2, omission: '' }) : '';
  return `${firstWord} ${secondWord}`.trim();
};

export const truncateText = (text, maxLength) => {
  return _.truncate(text, { length: maxLength, omission: '...' });
};

export const getRoleLabel = (role) => {
  if (role === 1) {
    return "Root";
  } else if (role === 2) {
    return "Admin";
  } else {
    return "User";
  }
};