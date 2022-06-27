import path from 'path';
import _ from 'lodash';

const getPath = (file) => path.resolve(file);
const getExt = (file) => path.extname(file);

const hasKey = (obj, key) => _.has(obj, key);
const isPrimitive = (value) => !_.isObject(value);
const isEqual = (value1, value2) => value1 === value2;
const isString = (data) => typeof data === 'string';
const normalizeValue = (value) => {
  if (isString(value)) return `'${value}'`;
  if (isPrimitive(value)) return `${value}`;
  return '[complex value]';
};

export {
  getPath, getExt, hasKey, isPrimitive, isEqual, isString, normalizeValue,
};
