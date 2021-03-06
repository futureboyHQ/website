/*
 * AUTHORSHIP DISCLAIMER: This config file is heavily inspired from davezuko's
 * React Redux Starter Kit, available at
 * https://github.com/davezuko/react-redux-starter-kit/tree/1a4a71b182782bc12109f98106d3a65519003447
*/

const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpack_config = require('../config/webpack.config');
const project = require('../config/project.config');
const compress = require('compression');

const app = express();

// Apply gzip compression
app.use(compress());

// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if(project.env === 'development'){
  const compiler = webpack(webpack_config);

  console.log('Enabling webpack dev and HMR middleware');
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath: webpack_config.output.publicPath || '',
    contentBase: project.paths.src(),
    hot: true,
    quiet: project.compiler.quiet,
    noInfo: project.compiler.quiet,
    lazy: false,
    stats: project.compiler.stats
  }));
  app.use(require('webpack-hot-middleware')(compiler, {
    path: '/__webpack_hmr'
  }));

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()));

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if(err){
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);
      res.end();
    });
  });
}else{
  console.log(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  );

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()));
}

module.exports = app;
