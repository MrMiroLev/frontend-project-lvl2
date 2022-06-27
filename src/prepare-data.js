import _ from 'lodash';
import {
  hasKey, isPrimitive, isEqual,
} from './utils.js';

const buildUnchangedTree = (node) => {
  if (isPrimitive(node)) return node;
  return Object
    .entries(node)
    .sort()
    .map(([key, val]) => ({ key, status: 'unchanged', value: buildUnchangedTree(val) }));
};

const buildDiffTree = (node1, node2) => {
  const allKeys = Object.keys({ ...node1, ...node2 }).sort();

  const result = allKeys.map((key) => {
    const [val1, val2] = [_.get(node1, key), _.get(node2, key)];

    if (!hasKey(node1, key)) return { key, status: 'added', value: buildUnchangedTree(val2) };
    if (!hasKey(node2, key)) return { key, status: 'removed', value: buildUnchangedTree(val1) };
    if (!isEqual(val1, val2)) {
      if (isPrimitive(val1) || isPrimitive(val2)) {
        return {
          key, status: 'changed', oldValue: buildUnchangedTree(val1), newValue: buildUnchangedTree(val2),
        };
      }
      return { key, status: 'nested', value: buildDiffTree(val1, val2) };
    }
    return { key, status: 'unchanged', value: val1 };
  });

  return result;
};

export default buildDiffTree;
