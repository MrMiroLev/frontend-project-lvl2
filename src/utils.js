import path from 'path';
import _ from 'lodash';

const getPath = (file) => path.resolve(file);
const getExt = (file) => path.extname(file);
const normalizeObj = (obj) => _.fromPairs(_.toPairs(obj).sort());

export {
  getPath,
  getExt,
  normalizeObj,
};
