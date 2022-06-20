import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync as rfs } from 'fs';
import genDiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => rfs(getFixturePath(filename), 'utf-8');

test('gendiff', () => {
  const diffFile = readFile('diff.txt');
  const result = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(result).toEqual(diffFile);
});
