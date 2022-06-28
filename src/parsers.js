import yaml from 'js-yaml';

export default (data, ext) => {
  switch (ext) {
    case 'json': return JSON.parse(data);
    default: return yaml.load(data);
  }
};
