module.exports = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS, POST, GET, PUT, DELETE',
  'Access-Control-Max-Age': 2592000, // 30 days
  /** add other headers as per requirement */
  'Access-Control-Allow-Headers':
    'Access-Control-Allow-Origin, Content-Type, Authorization, Content-Length, X-Requested-With',
};
