const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Hola desde el pipeline CI/CD - version 1.1\n');
}).listen(3001);
