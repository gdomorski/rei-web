var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require(process.cwd() + '/webpack.config');
var portfinder = require('portfinder');
var exec = require('child_process').exec;
var fs = require('fs');

startServer();

function startServer() {
  let startallStatus;
  let isStartallRun;

  if (fs.existsSync(`${__dirname}/startall.status`)) {
    startallStatus = fs.readFileSync(`${__dirname}/startall.status`, 'utf8');
    isStartallRun = startallStatus.trim().length !== 0;
  }

  if (isStartallRun && startallStatus.split('\n')[0] !== process.cwd()) {
    setTimeout(startServer, 1000);
    return;
  }

  portfinder.getPort({ port: 3000 }, function (err, port) {
      if (err) {
        console.log(err);
        return;
      }

      new WebpackDevServer(webpack(config), {
        publicPath: config.output.publicPath,
        hot: true,
        historyApiFallback: true
      }).listen(port, 'localhost', function (err, result) {
        if (isStartallRun) {
          fs.writeFile(`${__dirname}/startall.status`, startallStatus.replace(process.cwd(), '').trim());
        }

        if (err) {
          return config.output.publicPath
          return console.log(err);
        }

        console.log(`Listening at http://localhost:${port}/`);

        if (process.env.NO_BROWSER !== "true") {
          exec(`open -a "/Applications/Google Chrome.app" "http://localhost:${port}"`);
        }
      });
  });
}
