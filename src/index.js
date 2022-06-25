import { readFileSync as rfs } from 'fs';
import parse from './parsers.js';
import {
  getPath, getExt,
} from './utils.js';
import calcDiff from './calcDiff.js';

export default (file1, file2, format = 'stylish') => {
  const [data1, data2] = [rfs(getPath(file1), 'utf8'), rfs(getPath(file2), 'utf8')];
  const [ext1, ext2] = [getExt(file1), getExt(file2)];
  const [parsed1, parsed2] = [parse(data1, ext1), parse(data2, ext2)];

  if (format === 'stylish') {
    return calcDiff(parsed1, parsed2);
  }
  return `Format "${format}" is not defined.`;
};
