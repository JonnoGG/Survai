const livereload = require("livereload");
const connectLivereload = require("connect-livereload");

module.exports = (app) => {
    const liveReloadServer = livereload.createServer();
    liveReloadServer.watch(__dirname + "/../public");
    app.use(connectLivereload());

    liveReloadServer.server.once("connection", () => {
        setTimeout(() => {
            liveReloadServer.refresh("/");
        }, 100);
    });
};
