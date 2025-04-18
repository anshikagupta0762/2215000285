const axios = require('axios');
const config = require('./config');

const mockUsers = {
  users: {
    "1": "John Doe",
    "2": "Jane Doe",
    "3": "Alice Smith",
    "4": "Bob Johnson",
    "5": "Charlie Brown",
    "6": "Diana White",
    "7": "Edward Davis",
    "8": "Fiona Miller",
    "9": "George Wilson",
    "10": "Helen Moore",
    "11": "Ivy Taylor",
    "12": "Jack Anderson",
    "13": "Kathy Thomas",
    "14": "Liam Jackson",
    "15": "Mona Harris",
    "16": "Nathan Clark",
    "17": "Olivia Lewis",
    "18": "Paul Walker",
    "19": "Quinn Scott",
    "20": "Rachel Young"
  }
};


const mockPosts = {
  "1": [
    {
      id: 150,
      userid: "1",
      content: "Post about cats",
      timestamp: Date.now() - 500000,
      commentCount: 15
    },
    {
      id: 161,
      userid: "1",
      content: "Post about elephant",
      timestamp: Date.now() - 600000,
      commentCount: 8
    },
    {
      id: 246,
      userid: "1",
      content: "Post about ant",
      timestamp: Date.now() - 700000,
      commentCount: 3
    }
  ],
  "2": [
    {
      id: 151,
      userid: "2",
      content: "My first post",
      timestamp: Date.now() - 200000,
      commentCount: 12
    },
    {
      id: 152,
      userid: "2",
      content: "My second post",
      timestamp: Date.now() - 100000,
      commentCount: 8
    }
  ],
  "3": [
    {
      id: 153,
      userid: "3",
      content: "Hello world",
      timestamp: Date.now(),
      commentCount: 15
    }
  ],
  "4": [
    {
      id: 154,
      userid: "4",
      content: "Testing post",
      timestamp: Date.now() - 300000,
      commentCount: 5
    }
  ],
  "5": [
    {
      id: 155,
      userid: "5",
      content: "Another post",
      timestamp: Date.now() - 400000,
      commentCount: 10
    }
  ]
};

const mockComments = {
  "150": [
    {
      id: 3893,
      postid: 150,
      content: "Great post!"
    },
    {
      id: 3894,
      postid: 150,
      content: "I agree with this"
    },
    {
      id: 3895,
      postid: 150,
      content: "Very interesting"
    },
    {
      id: 3896,
      postid: 150,
      content: "Thanks for sharing"
    },
    {
      id: 3897,
      postid: 150,
      content: "I learned something new"
    },
    {
      id: 3898,
      postid: 150,
      content: "This is amazing"
    },
    {
      id: 3899,
      postid: 150,
      content: "Well written"
    },
    {
      id: 3900,
      postid: 150,
      content: "I have a question"
    },
    {
      id: 3901,
      postid: 150,
      content: "Let me try this"
    },
    {
      id: 3902,
      postid: 150,
      content: "Excellent point"
    },
    {
      id: 3903,
      postid: 150,
      content: "I disagree"
    },
    {
      id: 3904,
      postid: 150,
      content: "Could you explain more?"
    },
    {
      id: 3905,
      postid: 150,
      content: "This helped me"
    },
    {
      id: 3906,
      postid: 150,
      content: "Looking forward to more posts like this"
    },
    {
      id: 3907,
      postid: 150,
      content: "Bookmarking this"
    }
  ],
  "151": [
    {
      id: 4001,
      postid: 151,
      content: "Nice first post"
    },
    {
      id: 4002,
      postid: 151,
      content: "Welcome"
    },
    {
      id: 4003,
      postid: 151,
      content: "Looking forward to more"
    },
    {
      id: 4004,
      postid: 151,
      content: "Great start"
    },
    {
      id: 4005,
      postid: 151,
      content: "Interesting perspective"
    },
    {
      id: 4006,
      postid: 151,
      content: "I like your style"
    },
    {
      id: 4007,
      postid: 151,
      content: "Well done"
    },
    {
      id: 4008,
      postid: 151,
      content: "Keep posting"
    },
    {
      id: 4009,
      postid: 151,
      content: "Good job"
    },
    {
      id: 4010,
      postid: 151,
      content: "Thanks for this"
    },
    {
      id: 4011,
      postid: 151,
      content: "I'll be following you"
    },
    {
      id: 4012,
      postid: 151,
      content: "Very nice"
    }
  ],
  "153": [
    {
      id: 4101,
      postid: 153,
      content: "Hello back"
    },
    {
      id: 4102,
      postid: 153,
      content: "Welcome to the platform"
    },
    {
      id: 4103,
      postid: 153,
      content: "Hi there"
    },
    {
      id: 4104,
      postid: 153,
      content: "Great to see you here"
    },
    {
      id: 4105,
      postid: 153,
      content: "Hello!"
    },
    {
      id: 4106,
      postid: 153,
      content: "Hey!"
    },
    {
      id: 4107,
      postid: 153,
      content: "Howdy"
    },
    {
      id: 4108,
      postid: 153,
      content: "Greetings"
    },
    {
      id: 4109,
      postid: 153,
      content: "Welcome aboard"
    },
    {
      id: 4110,
      postid: 153,
      content: "Nice to meet you"
    },
    {
      id: 4111,
      postid: 153,
      content: "Looking forward to your posts"
    },
    {
      id: 4112,
      postid: 153,
      content: "Hello world back"
    },
    {
      id: 4113,
      postid: 153,
      content: "First comment"
    },
    {
      id: 4114,
      postid: 153,
      content: "Second comment"
    },
    {
      id: 4115,
      postid: 153,
      content: "Last comment"
    }
  ]
};

for (const userId in mockPosts) {
  for (const post of mockPosts[userId]) {
    if (!mockComments[post.id] && post.commentCount > 0) {
      mockComments[post.id] = [];
      for (let i = 0; i < post.commentCount; i++) {
        mockComments[post.id].push({
          id: 5000 + (post.id * 100) + i,
          postid: post.id,
          content: `Comment ${i + 1} on post ${post.id}`
        });
      }
    }
  }
}

console.log('Using mock data for API responses');


const apiService = {
  
  getUsers: async () => {
    try {
      console.log('Getting mock users data');
      return mockUsers;
    } catch (error) {
      console.error('Error fetching users:', error.message);
      throw error;
    }
  },

  /**
   * Get posts for a specific user
   * @param {string} userId 
   */
  getUserPosts: async (userId) => {
    try {
      console.log(`Getting mock posts for user ${userId}`);
      const posts = mockPosts[userId] || [];
      return { posts };
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error.message);
      throw error;
    }
  },

  /**
   * Get comments for a specific post
   * @param {string} postId - ID of the post
   */
  getPostComments: async (postId) => {
    try {
      console.log(`Getting mock comments for post ${postId}`);
      const comments = mockComments[postId] || [];
      return { comments };
    } catch (error) {
      console.error(`Error fetching comments for post ${postId}:`, error.message);
      throw error;
    }
  }
};

module.exports = apiService; 