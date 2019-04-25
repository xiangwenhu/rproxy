const apps = [
  {
    id: "jd-h-price",
    key: "jj-dd-pp"
  }
];

module.exports = function check(id, key) {
  return apps.findIndex(app => app.id === id && app.key === key) >= 0;
};
