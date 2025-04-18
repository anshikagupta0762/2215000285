const express = require('express');
const cors = require('cors');
const { setupRoutes } = require('./routes');
const config = require('./config');

const app = express();
const PORT = config.server.port;

app.use(cors());
app.use(express.json());

setupRoutes(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 