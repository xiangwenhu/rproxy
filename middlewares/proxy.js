const httpProxy = require("http-proxy-middleware");

const options = {
  target: null,
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    "^/api": ""
  }
};

function onProxyReq(proxyReq, req, res) {
  const useBody = proxyReq.getHeader["_usebody"];
  const method = req.method.toUpperCase();
  const contentType = proxyReq.getHeader("content-type");
  if (
    !["GET"].includes(method) &&
    !!useBody &&
    contentType &&
    (contentType.includes("application/json") ||
      contentType.includes("application/x-www-form-urlencoded"))
  ) {
    if (!req.body || !Object.keys(req.body).length) {
      return;
    }
    const body = req.body;

    const bodyStr = contentType.includes("application/json")
      ? JSON.stringify(body)
      : querystring.stringify(body);
    proxyReq.setHeader("content-length", Buffer.byteLength(bodyStr));
    proxyReq.write(bodyStr);
    proxyReq.end();
  }
}

module.exports = function(req, res, next) {
  try {
    let opt = options;
    const target = req.headers["_target"];
    const useBody = req.headers["_usebody"];
    const method = req.method.toUpperCase();

    if (!!useBody) {
      if (["GET"].includes(method)) {
        opt = JSON.parse(req.headers["_proxy"]);
        opt.onProxyReq = onProxyReq;
      } else {
        // {proxy,data}
        opt = req.body.data;
        opt.onProxyReq = onProxyReq;
      }
    } else {
      opt.target = target;
    }
    httpProxy(opt)(req, res, next);
  } catch (err) {
    res.json({
      code: 99999,
      message: err.message
    });
  }
};
