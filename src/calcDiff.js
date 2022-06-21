import _ from 'lodash';

export default (obj1, obj2) => {
  const result = [];
  Object.entries(obj1).forEach(([key, val]) => {
    const newVal = _.get(obj2, key);

    if (newVal === val) {
      result.push(`    ${key}: ${val}`);
    } else {
      result.push(`  - ${key}: ${val}`);
      if (newVal) result.push(`  + ${key}: ${newVal}`);
    }
  });
  Object.entries(obj2).forEach(([key, val]) => {
    if (!_.has(obj1, key)) result.push(`  + ${key}: ${val}`);
  });
  return `{\n${result.join('\n')}\n}`;
};
