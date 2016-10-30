var express = require('express');
var path = require('path');
var http = require('http');
var debug = require('debug')('static:server');
// 设置服务端口号，如果提示占用，请修改
var PORT = 3000;
var app = express();
// 设置静态文件访问路径为项目根路径下public文件夹，请勿修改
// 设置完之后，public文件夹下资源就可以用使用绝对路径的方式进行调用，例如：
// <link rel="stylesheet" href="/styles/home.min.css"/>
// <img src="/images/xiaomai.png" alt=""/>
// <script src="/lib/home.js"></script>
app.use(express.static(path.join(__dirname, 'public')));
app.set('port', PORT);
var server = http.createServer(app);

server.listen(PORT, function () {
  console.log('server start at http://127.0.0.1:%s', PORT);
});

server.on('error', onError);
server.on('listening', onListening);

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof PORT === 'string'
    ? 'Pipe ' + PORT
    : 'Port ' + PORT;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}