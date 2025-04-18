const dataService = require('./dataService');
const setupRoutes = (app) => {
  app.get('/users', async (req, res) => {
    try {
      const topUsers = await dataService.getTopUsers();
      res.json({ users: topUsers });
    } catch (error) {
      console.error('Error in /users route:', error);
      res.status(500).json({ error: 'Failed to fetch top users' });
    }
  });
  app.get('/posts', async (req, res) => {
    try {
      const { type = 'popular' } = req.query;
      if (type !== 'popular' && type !== 'latest') {
        return res.status(400).json({ 
          error: 'Invalid type parameter. Must be either "popular" or "latest"' 
        });
      }
      
      const posts = await dataService.getPosts(type);
      res.json({ posts });
    } catch (error) {
      console.error(`Error in /posts route (${req.query.type}):`, error);
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  });

  app.get('/health', (req, res) => {
    res.json({ status: 'OK' });
  });
  
  app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
  });
};

module.exports = { setupRoutes }; 