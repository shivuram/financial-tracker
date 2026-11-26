const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Middleware to wrap GET /jobs responses
server.use((req, res, next) => {
  if (req.method === "GET" && req.path === "/jobs") {
    const send = res.send;
    res.send = function (body) {
      try {
        const data = JSON.parse(body); // jobs array
        const totalCount = res.getHeader("x-total-count"); // from json-server
        if (totalCount) {
          return send.call(
            this,
            JSON.stringify({
              data, // jobs list
              meta: { totalCount: Number(totalCount) }, // wrap in meta object
            })
          );
        }
      } catch (err) {
        // fallback: just send normal body
      }
      return send.call(this, body);
    };
  }
  next();
});

server.use(router);

server.listen(5000, () => {
  console.log("JSON Server running at http://localhost:5000");
});
