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

// Override post request for /messages/:threadId/mails
server.post('/messages/:threadId/mails', (req, res) => {
  res.redirect(307, `/mails`);
});

// Override delete request for /messages/:threadId/mails
server.delete('/messages/:threadId/mails/:mailId', (req, res) => {
  res.redirect(307, `/mails/${req.params.mailId}`);
});

/************************************************************ */

/**
 * Route rewrites
 */
server.use(jsonServer.rewriter({
  '/carts/:cartId': '/carts/:cartId?_embed=items',
  '/messages': '/mail-threads',
  '/messages/:threadId/mails': '/mails?mail-threadId=:threadId',
  '/messages/:threadId': '/mail-threads/:threadId?_embed=mails'
}));

// Use default router for everything else.
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`JSON Server is running on http://localhost:${port}`);
});