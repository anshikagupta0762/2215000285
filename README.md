This is a backend service that gives quick insights from social media by using a social media API.

What It Does
Shows top 5 users whose posts got the most comments

Shows the most popular post(s) based on number of comments

Shows the 5 most recent posts

Uses caching to reduce the number of API calls and make it faster

Handles errors and gives proper response formats

API Endpoints
GET /users
Returns the top 5 users whose posts received the most comments.

Example Response:

json
Copy
Edit
{
  "users": [
    {
      "id": "1",
      "name": "John Doe",
      "totalComments": 42,
      "postCount": 7
    },
    ...
  ]
}
GET /posts?type=popular|latest
Gives posts based on the type you ask for:

popular: Posts with the most comments

latest: The 5 newest posts

Query Parameter:

type (optional): Can be "popular" or "latest". Default is "popular".

Example Response:

json
Copy
Edit
{
  "posts": [
    {
      "id": 246,
      "userId": "1",
      "userName": "John Doe",
      "content": "Post about ant",
      "commentCount": 15,
      "timestamp": 1622548800000
    },
    ...
  ]
}
What You Need
Node.js version 14 or above

npm version 6 or above

How to Set It Up
Clone the project

Go into the folder and install the packages:

nginx
Copy
Edit
npm install
How to Run
For Development
arduino
Copy
Edit
npm run dev
For Production
sql
Copy
Edit
npm start
By default, it runs on port 3000, but you can change the port by setting the PORT variable in your environment.

How It Works Inside
The service uses a simple 3-layer structure:

API Layer (routes.js): Handles all incoming requests

Service Layer (dataService.js): Deals with data processing and logic

Data Layer (apiService.js): Talks to the actual social media API

To make things faster and reduce repeated API calls, a caching system is used.