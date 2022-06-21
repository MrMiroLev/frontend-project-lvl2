import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import diff from '../__fixtures__/diff.js';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

describe('genDiff', () => {
  test('JSONs', () => {
    const [filePath1, filePath2] = [getFixturePath('file1.json'), getFixturePath('file2.json')];
    const result = genDiff(filePath1, filePath2);
    expect(result).toEqual(diff);
  });

  test('YAMLs', () => {
    const [filePath1, filePath2] = [getFixturePath('file1.yaml'), getFixturePath('file2.yml')];
    const result = genDiff(filePath1, filePath2);
    expect(result).toEqual(diff);
  });

  test('Different formats', () => {
    const [filePath1, filePath2] = [getFixturePath('file1.json'), getFixturePath('file2.yml')];
    const result = genDiff(filePath1, filePath2);
    expect(result).toEqual(diff);
  });
});
