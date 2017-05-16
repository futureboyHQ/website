import express from 'express';
import renderer from '../../../../services/renderer/render';

module.exports = (function() {

  const router = express.Router();

  // Page Renderers

  router.get('/', renderer.render, renderer.serve);

  router.get('/already-subscribed', renderer.render, renderer.serve);

  router.get('/subscribed', renderer.render, renderer.serve);

  router.get('/error', renderer.render, renderer.serve);

  // 404 Catchers

  router.get('/*', renderer.not_found, renderer.serve);

  router.post('/*', renderer.not_found, renderer.serve);

  router.put('/*', renderer.not_found, renderer.serve);

  router.delete('/*', renderer.not_found, renderer.serve);

  return router;

})();