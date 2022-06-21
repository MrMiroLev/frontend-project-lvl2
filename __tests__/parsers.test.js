import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync as rfs } from 'fs';
import yaml from 'js-yaml';
import parse from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => rfs(getFixturePath(filename), 'utf-8');

test('JSON', () => {
  const data = readFile('file1.json');
  const result = parse(data, '.json');
  expect(result).toEqual(JSON.parse(data));
});

test('YAML', () => {
  const data = readFile('file1.yaml');
  const result = parse(data, '.yaml');
  expect(result).toEqual(yaml.load(data));
});
