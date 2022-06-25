import path from 'path';
import _ from 'lodash';

const getPath = (file) => path.resolve(file);
const getExt = (file) => path.extname(file);

const getValue = (obj, key) => _.get(obj, key);
const isExist = (value) => value !== undefined;
const isPrimitive = (value) => !_.isObject(value);
const isEqual = (value1, value2) => value1 === value2;

export {
  getPath, getExt, getValue, isExist, isPrimitive, isEqual,
};
