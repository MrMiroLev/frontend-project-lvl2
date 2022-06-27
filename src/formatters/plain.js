import { normalizeValue as nv } from '../utils.js';

export default (data) => {
  const iter = (currentData, path = []) => {
    const result = currentData.flatMap(({
      key, status, value, oldValue, newValue,
    }) => {
      switch (status) {
        case 'added': return `Property '${[...path, key].join('.')}' was added with value: ${nv(value)}`;
        case 'removed': return `Property '${[...path, key].join('.')}' was removed`;
        case 'changed': return `Property '${[...path, key].join('.')}' was updated. From ${nv(oldValue)} to ${nv(newValue)}`;
        case 'nested': return iter(value, [...path, key]);
        default: return [];
      }
    });

    return result.join('\n');
  };

  return iter(data);
};
