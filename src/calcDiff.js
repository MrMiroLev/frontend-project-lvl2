/* eslint-disable no-lonely-if */
import _ from 'lodash';
import {
  getValue, isExist, isPrimitive, isEqual,
} from './utils.js';

export default (data1, data2, spacesCount = 4, replacer = ' ') => {
  const iter = (currentData1, depth, currentData2) => {
    const indentSize = spacesCount * depth;
    const emptyIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    let diffEntries;
    if (isExist(currentData2)) {
      const minusIndent = `${emptyIndent.slice(0, -2)}- `;
      const plusIndent = `${emptyIndent.slice(0, -2)}+ `;
      diffEntries = [];

      Object.entries(currentData1).forEach(([key, val1]) => {
        const val2 = getValue(currentData2, key);

        if (isPrimitive(val1)) {
          if (isExist(val2)) {
            if (isEqual(val1, val2)) {
              diffEntries.push([`${emptyIndent}`, `${key}: `, `${val2}`]);
            } else {
              diffEntries.push([`${minusIndent}`, `${key}: `, `${val1}`]);
              diffEntries.push([`${plusIndent}`, `${key}: `, `${val2}`]);
            }
          } else {
            diffEntries.push([`${minusIndent}`, `${key}: `, `${val1}`]);
          }
        } else {
          if (isExist(val2)) {
            if (isPrimitive(val2)) {
              diffEntries.push([`${minusIndent}`, `${key}: `, `${iter(val1, depth + 1)}`]);
              diffEntries.push([`${plusIndent}`, `${key}: `, `${val2}`]);
            } else {
              diffEntries.push([`${emptyIndent}`, `${key}: `, `${iter(val1, depth + 1, val2)}`]);
            }
          } else {
            diffEntries.push([`${minusIndent}`, `${key}: `, `${iter(val1, depth + 1)}`]);
          }
        }
      });

      Object.entries(currentData2).forEach(([key, val2]) => {
        if (!_.has(currentData1, key)) diffEntries.push([`${plusIndent}`, `${key}: `, `${iter(val2, depth + 1)}`]);
      });
    } else {
      if (isPrimitive(currentData1)) return `${currentData1}`;

      diffEntries = Object
        .entries(currentData1)
        .map(([key, val]) => [`${emptyIndent}`, `${key}: `, `${iter(val, depth + 1)}`]);
    }

    const result = diffEntries
      .sort(([opA, keyA], [opB, keyB]) => {
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return opA < opB ? 1 : -1;
      })
      .map((entry) => entry.join(''));

    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data1, 1, data2);
};
