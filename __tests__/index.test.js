/* eslint-disable quote-props */
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync as rfs } from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => rfs(getFixturePath(filename), 'utf-8');

const expected = readFile('expected.txt');

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');
const yaml1 = getFixturePath('file1.yml');
const yaml2 = getFixturePath('file2.yaml');

const filePathsForTest = [
  ['JSON', json1, json2],
  ['YAML', yaml1, yaml2],
  ['JSON + YAML', json1, yaml2],
];

describe.each(filePathsForTest)('genDiff', (ext, filePath1, filePath2) => {
  const actual = genDiff(filePath1, filePath2);
  test(`${ext}`, () => expect(actual).toEqual(expected));
});
