import {
  sort, hasKey, getValue, isPrimitive, isEqual,
} from './utils.js';

const buildDiffTree = (node1, node2) => {
  const allKeys = sort(Object.keys({ ...node1, ...node2 }));

  const result = allKeys.map((key) => {
    const [val1, val2] = [getValue(node1, key), getValue(node2, key)];

    if (!hasKey(node1, key)) {
      return { key, status: 'added', value: val2 };
    }
    if (!hasKey(node2, key)) {
      return { key, status: 'removed', value: val1 };
    }
    if (!isEqual(val1, val2)) {
      if (isPrimitive(val1) || isPrimitive(val2)) {
        return {
          key, status: 'changed', oldValue: val1, newValue: val2,
        };
      }
      return { key, status: 'nested', value: buildDiffTree(val1, val2) };
    }
    return { key, status: 'unchanged', value: val1 };
  });

  return result;
};

export default buildDiffTree;
