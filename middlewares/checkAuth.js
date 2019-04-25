const check = require("../secret");

module.exports = function checkAuth(req, res, next) {
  const id = req.headers["_appid"];
  const key = req.headers["_key"];
  if (!id || !key) {
    return res.json({
      code: 99999,
      message: "无效的id或者key"
    });
  }
  const pass = check(id, key);
  if (!pass) {
    return res.json({
      code: 99999,
      message: "无效的id或者key"
    });
  }

  next();
};
