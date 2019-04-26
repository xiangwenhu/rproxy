const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const https = require("https");
const compression = require("compression");

const checkAuth = require("./middlewares/checkAuth");
const proxy = require("./middlewares/proxy");
const cors = require("./middlewares/cors");

const privateKey = fs.readFileSync(
  path.resolve(__dirname, "./cert/key.pem"),
  "utf8"
);
const certificate = fs.readFileSync(
  path.resolve(__dirname, "./cert/cert.pem"),
  "utf8"
);

const port = 6006;
const app = express();

const httpsServer = https.createServer(
  { key: privateKey, cert: certificate },
  app
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());
app.use(cors);

app.use("/api", checkAuth, proxy);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ error: "内部服务器错误" });
});

httpsServer.listen(port, null, () => {
  console.log(`listening ${port}`);
});
