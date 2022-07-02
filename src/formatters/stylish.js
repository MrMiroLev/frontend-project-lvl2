export default (data) => {
  const spacesCount = 4;
  const replacer = ' ';

  const iter = (currentData, depth) => {
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
        case 'added': return `${plusIndent}${key}: ${value}`;
        case 'removed': return `${minusIndent}${key}: ${value}`;
        case 'changed':
          return [
            `${minusIndent}${key}: ${oldValue}`,
            `${plusIndent}${key}: ${newValue}`,
          ];
        case 'nested': return `${emptyIndent}${key}: ${iter(value, depth + 1)}`;
        default: return `${emptyIndent}${key}: ${value}`;
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
