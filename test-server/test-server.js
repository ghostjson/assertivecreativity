const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('test-server/db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

/************************************************************* */

// Override get request for /carts/:cartId/items/:itemId
server.get('/carts/:cartId/items/:itemId', (req, res) => {
  res.redirect(307, `/items/${req.params.itemId}`);
});

// Override put request for /carts/:cartId/items/:itemId
server.put('/carts/:cartId/items/:itemId', (req, res) => {
  res.redirect(307, `/items/${req.params.itemId}`);
});

// Override delete request for /carts/:cartId/items/:itemId
server.delete('/carts/:cartId/items/:itemId', (req, res) => {
  res.redirect(307, `/items/${req.params.itemId}`);
});

// Override post request for /carts/:cartId/items
server.post('/carts/:cartId/items/', (req, res) => {
  res.redirect(307, `/items`);
});

/************************************************************ */

/**
 * Route rewrites
 */
server.use(jsonServer.rewriter({
  '/carts/:cartId': '/carts/:cartId?_embed=items'
}))

// Use default router for everything else.
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});