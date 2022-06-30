import { isPrimitive } from '../utils.js';

export default (data) => {
  const spacesCount = 4;
  const replacer = ' ';

  const iter = (currentData, depth) => {
    if (isPrimitive(currentData)) {
      return currentData;
    }

    const indentSize = spacesCount * depth;
    const emptyIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const [firstIndex, secondLastIndex] = [0, -2];
    const minusIndent = `${emptyIndent.slice(firstIndex, secondLastIndex)}- `;
    const plusIndent = `${emptyIndent.slice(firstIndex, secondLastIndex)}+ `;

    const result = currentData.flatMap(({
      key, status, value, oldValue, newValue,
    }) => {
      switch (status) {
        case 'added': return `${plusIndent}${key}: ${iter(value, depth + 1)}`;
        case 'removed': return `${minusIndent}${key}: ${iter(value, depth + 1)}`;
        case 'changed':
          return [
            `${minusIndent}${key}: ${iter(oldValue, depth + 1)}`,
            `${plusIndent}${key}: ${iter(newValue, depth + 1)}`,
          ];
        default: return `${emptyIndent}${key}: ${iter(value, depth + 1)}`;
      }
    });

    return [
      '{',
      ...result,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(data, 1);
};
