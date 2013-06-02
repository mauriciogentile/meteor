var navigation = require("../controllers/navigation");
var scoreboard = require("../controllers/api/scoreboard");

module.exports = function(app) {
    app.get("/", navigation.index);
    app.get("/index", navigation.index);
    app.get("/api/scoreboard/all", scoreboard.all);
};