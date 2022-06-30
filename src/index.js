import {
  getExt, readFile,
} from './utils.js';
import parse from './parsers.js';
import prepareData from './prepare-data.js';
import formatData from './formatters/index.js';

export default (file1, file2, format = 'stylish') => {
  const firstFileData = parse(readFile(file1), getExt(file1));
  const secondFileData = parse(readFile(file2), getExt(file2));

  const data = prepareData(firstFileData, secondFileData);
  return formatData(data, format);
};
