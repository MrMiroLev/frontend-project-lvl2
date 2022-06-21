import yaml from 'js-yaml';

export default (data, ext) => ((ext === '.yml' || ext === '.yaml') ? yaml.load(data) : JSON.parse(data));
