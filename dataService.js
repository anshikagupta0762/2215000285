const NodeCache = require('node-cache');
const apiService = require('./apiService');
const config = require('./config');

const cache = new NodeCache({ stdTTL: config.cache.ttl });

const dataService = {

  getTopUsers: async () => {
  
    const cacheKey = 'topUsers';
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const userData = await apiService.getUsers();
      const users = userData.users || {};
      
      const userCommentCounts = [];
      
      for (const userId in users) {
        const userName = users[userId];
        const postsData = await apiService.getUserPosts(userId);
        const posts = postsData.posts || [];
        
        let totalComments = 0;
        for (const post of posts) {
          const commentsData = await apiService.getPostComments(post.id);
          const comments = commentsData.comments || [];
          totalComments += comments.length;
        }
        
        userCommentCounts.push({
          id: userId,
          name: userName,
          totalComments,
          postCount: posts.length
        });
      }
      userCommentCounts.sort((a, b) => b.totalComments - a.totalComments);
      const topUsers = userCommentCounts.slice(0, 5);
      cache.set(cacheKey, topUsers);
      
      return topUsers;
    } catch (error) {
      console.error('Error in getTopUsers:', error);
      throw error;
    }
  },

  /**
   * Get posts based on type (popular or latest)
   * @param {string} type - Type of posts to retrieve (popular or latest)
   */
  getPosts: async (type) => {
    const cacheKey = `posts_${type}`;
    const cachedData = cache.get(cacheKey);
    if (cachedData) {
      return cachedData;
    }

    try {
      const userData = await apiService.getUsers();
      const users = userData.users || {};
      let allPosts = [];
      
      for (const userId in users) {
        const postsData = await apiService.getUserPosts(userId);
        const posts = postsData.posts || [];
        for (const post of posts) {
          const commentsData = await apiService.getPostComments(post.id);
          const comments = commentsData.comments || [];
          
          allPosts.push({
            id: post.id,
            userId: post.userid,
            userName: users[post.userid],
            content: post.content,
            commentCount: comments.length,
            timestamp: post.timestamp || Date.now() 
          });
        }
      }
    
      let result;
      
      if (type === 'popular') {
        allPosts.sort((a, b) => b.commentCount - a.commentCount);
        const maxCommentCount = allPosts.length > 0 ? allPosts[0].commentCount : 0;
        result = allPosts.filter(post => post.commentCount === maxCommentCount);
      } else if (type === 'latest') {
        allPosts.sort((a, b) => b.timestamp - a.timestamp);
        result = allPosts.slice(0, 5);
      } else {
        throw new Error(`Invalid post type: ${type}`);
      }
      cache.set(cacheKey, result);
      
      return result;
    } catch (error) {
      console.error(`Error in getPosts (${type}):`, error);
      throw error;
    }
  }
};

module.exports = dataService; 