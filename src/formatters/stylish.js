import { isPrimitive } from '../utils.js';

export default (data) => {
  const spacesCount = 4;
  const replacer = ' ';

  const iter = (currentData, depth, isDiffTree) => {
    const indentSize = spacesCount * depth;
    const emptyIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const makeStylish = (result) => [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');

    const buildSimpleTree = (node) => Object.entries(node)
      .flatMap(([key, value]) => `${emptyIndent}${key}: ${isPrimitive(value) ? value : iter(value, depth + 1, false)}`);

    const buildDiffTree = (node) => {
      const [firstIndex, secondLastIndex] = [0, -2];
      const minusIndent = `${emptyIndent.slice(firstIndex, secondLastIndex)}- `;
      const plusIndent = `${emptyIndent.slice(firstIndex, secondLastIndex)}+ `;

      return node.flatMap(({
        key, status, value, oldValue, newValue,
      }) => {
        switch (status) {
          case 'added': return `${plusIndent}${key}: ${isPrimitive(value) ? value : iter(value, depth + 1, false)}`;
          case 'removed': return `${minusIndent}${key}: ${isPrimitive(value) ? value : iter(value, depth + 1, false)}`;
          case 'changed':
            return [
              `${minusIndent}${key}: ${isPrimitive(oldValue) ? oldValue : iter(oldValue, depth + 1, false)}`,
              `${plusIndent}${key}: ${isPrimitive(newValue) ? newValue : iter(newValue, depth + 1, false)}`,
            ];
          case 'nested': return `${emptyIndent}${key}: ${iter(value, depth + 1, true)}`;
          default: return `${emptyIndent}${key}: ${value}`;
        }
      });
    };

    const result = isDiffTree ? buildDiffTree(currentData) : buildSimpleTree(currentData);
    return makeStylish(result);
  };

  return iter(data, 1, true);
};
