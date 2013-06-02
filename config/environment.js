var path = require("path");

module.exports = function(app, express) {
    app.configure(function() {
        var views = path.join(__dirname + "/../views");
        var pub = path.join(__dirname + "/../public");
        app.use(express.logger());
        app.use(app.router);
        app.set('views', views);
        app.set('view engine', 'jade');
        app.use(express.static(pub));
        
        console.log("views in:" + views);
        console.log("public assets in: "+ pub);
    });

    //development configuration
    app.configure('dev', function() {
        app.use(express.errorHandler({
            dumpExceptions: true
        }));
    });
};