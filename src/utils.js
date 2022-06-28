import path from 'path';
import { readFileSync } from 'fs';
import _ from 'lodash';

const getPath = (file) => path.resolve(file);
const getExt = (file) => _.trimStart(path.extname(file), '.');
const readFile = (file) => readFileSync(getPath(file), 'utf8');

const sort = (coll) => _.sortBy(coll);
const hasKey = (obj, key) => _.has(obj, key);
const getValue = (obj, key) => _.get(obj, key);
const isPrimitive = (value) => !_.isObject(value);
const isEqual = (value1, value2) => value1 === value2;
const isString = (data) => typeof data === 'string';
const normalizeValue = (value) => {
  if (isString(value)) {
    return `'${value}'`;
  }
  if (isPrimitive(value)) {
    return `${value}`;
  }
  return '[complex value]';
};

export {
  getPath, getExt, readFile, sort, hasKey, getValue, isPrimitive, isEqual, isString, normalizeValue,
};
