const http = require('http');
const options = {
  hostname: '127.0.0.1',
  port: 3000,
  path: '/api/smart-queue/company-123',
  method: 'GET',
  headers: {
    'Accept': 'application/json'
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('STATUS', res.statusCode);
    console.log('HEADERS', res.headers);
    console.log('BODY', data);
  });
});

req.on('error', (err) => {
  console.error('ERR', err.message);
});

req.end();
