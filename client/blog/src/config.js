import path from 'path';
// import raw from '../../../.config/client/index';
// const config = raw[__ENV__];
const __ENV__ = process.env.NODE_ENV || 'development';

const config = {};

config.routing = require(`./static/routing/${__ENV__}/routing.json`);

config.global = {
  env: __ENV__,
  path_base: path.resolve(__dirname, '..'),
  server_port: 3000,
  dir_root: '../../',
  dir_config: '../../.config',
  dir_src: 'src',
  dir_dist: 'dist',
  dir_public: 'public',
  dir_test: 'test',
  dir_views: 'views'
};

config.paths = {
  base: base,
  root: base.bind(null, config.global.dir_root),
  config: base.bind(null, config.global.dir_config),
  src: base.bind(null, config.global.dir_src),
  dist: base.bind(null, config.global.dir_dist),
  views: base.bind(null, config.global.dir_views)
};

function base () {
  const args = [config.global.path_base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

config.feed = {
  'refresh_timeout': __PROD__ ? 300000 : 15000,
  'scroll_point': 1000
};

export default config;
