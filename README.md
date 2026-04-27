# Vägen till Vegan

Vägen till Vegan is a fullstack web application for finding vegan, vegetarian, and vegan-friendly restaurants in Sweden.

The app allows users to view restaurants, add new restaurants, update and delete restaurants, create users, add reviews, filter restaurants by rating, and view top-rated restaurants.

## Problem Statement

Finding vegan-friendly restaurants can take time. This app makes it easier to collect, browse, filter, and review plant-friendly restaurants in one place.

## Tech Stack

### Frontend
- React
- Vite
- CSS

### Backend
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

### Development tools
- Postman
- Git
- GitHub
- concurrently

## Project Structure

```bash
client/   # React frontend
server/   # Express backend
Main Features
Display restaurants in a structured list
Add new restaurants
Update restaurants
Delete restaurants
Create users
Add reviews connected to users and restaurants
View reviews for restaurants
Filter restaurants by minimum rating
Show top-rated restaurants
Auto-refresh restaurant data
Loading, error, and empty states in the UI
Database Collections

The project uses three main MongoDB collections:

users
restaurants
reviews
Relationships
reviews.userId references users._id
reviews.restaurantId references restaurants._id
Environment Variables

Create a .env file inside the server folder:

MONGO_URI=your_mongodb_atlas_connection_string

Do not commit the .env file to GitHub.

Installation

From the root folder:

npm install

Install backend dependencies:

cd server
npm install

Install frontend dependencies:

cd ../client
npm install
Run the Project

From the root folder:

npm run dev

This starts both the frontend and backend using one command.

Frontend
http://localhost:5173
Backend
http://localhost:3000
API Examples
Restaurants
GET /api/restaurants
POST /api/restaurants
PUT /api/restaurants/:id
DELETE /api/restaurants/:id
Reviews
GET /api/reviews
POST /api/reviews
GET /api/reviews/user/:userId
Users
GET /api/users
POST /api/users
PUT /api/users/:id
DELETE /api/users/:id
Custom endpoints
GET /api/restaurants?minRating=4
GET /api/restaurants/top?limit=3
Notes
The backend is organized using Router → Controller → Model structure
Mongoose validation is used for required fields and rating limits
Input validation is handled before saving data
Error responses return JSON messages with proper HTTP status codes
The app uses realistic restaurant, user, and review data