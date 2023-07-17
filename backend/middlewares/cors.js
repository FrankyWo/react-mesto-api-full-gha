const allowedCors = [
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'https://frankywoo.nomoredomains.xyz',
  'http://frankywoo.nomoredomains.xyz',
  'https://frankywoo.nomoredomains.xyz/api',
  'http://frankywoo.nomoredomains.xyz/api',
];

const cors = (req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  const { method } = req;

  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
  }
  next();
};

module.exports = cors;
