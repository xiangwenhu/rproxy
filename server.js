const express = require("express");
const bodyParser = require("body-parser");
const checkAuth = require("./middlewares/checkAuth");
const proxy = require("./middlewares/proxy");
const cors = require("./middlewares/cors");

const port = 6006;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

app.use("/api", checkAuth, proxy);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ error: "内部服务器错误" });
});

app.listen(port, null, () => {
  console.log(`listening ${port}`);
});
