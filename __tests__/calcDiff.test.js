// import path, { dirname } from 'path';
// import { fileURLToPath } from 'url';
// import { readFileSync as rfs } from 'fs';
import diff from '../__fixtures__/diff.js';
import {
  obj1,
  obj2,
} from '../__fixtures__/sortedObjects.js';
import calcDiff from '../src/calcDiff.js';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
// const readFile = (filename) => rfs(getFixturePath(filename), 'utf-8');

// const diffFile = readFile('diff.txt');

test('calcDiff', () => {
  const result = calcDiff(obj1, obj2);
  expect(result).toEqual(diff);
});
