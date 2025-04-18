
const config = {
  api: {
    baseURL: 'http://20.244.56.144/evaluation-service',
  
    accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNvY2lhbE1lZGlhQW5hbHl0aWNzIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    headers: {
      'Content-Type': 'application/json'
    }
  },

  cache: {
    ttl: 60
  },
  
  server: {
    port: process.env.PORT || 3000
  }
};

module.exports = config; 