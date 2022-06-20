import path from 'path';
import { readFileSync as rfs } from 'fs';
import _ from 'lodash';

export default (file1, file2) => {
  const [data1, data2] = [rfs(path.resolve(file1), 'utf8'), rfs(path.resolve(file2), 'utf8')];
  const [parsed1, parsed2] = [JSON.parse(data1), JSON.parse(data2)];
  const [entries1, entries2] = [_.toPairs(parsed1).sort(), _.toPairs(parsed2).sort()];
  const [obj1, obj2] = [_.fromPairs(entries1), _.fromPairs(entries2)];

  const result = [];
  entries1.forEach(([key, val]) => {
    const newVal = _.get(obj2, key);

    if (newVal === val) {
      result.push(`    ${key}: ${val}`);
    } else {
      result.push(`  - ${key}: ${val}`);
      if (newVal) result.push(`  + ${key}: ${newVal}`);
    }
  });
  entries2.forEach(([key, val]) => {
    if (!_.has(obj1, key)) result.push(`  + ${key}: ${val}`);
  });

  const resultAsText = `{\n${result.join('\n')}\n}`;
  console.log(resultAsText);
  return resultAsText;
};
