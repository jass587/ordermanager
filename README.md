# OrderManager — Full Stack E-Commerce Platform

A full-stack e-commerce web application that allows users to browse products, manage a persistent shopping cart, securely check out, and manage their account through user-based authentication.

🔗 Live Demo: https://ordermanager-psi.vercel.app

## Features
- Product listing and browsing
- Persistent shopping cart that saves items across sessions
- Secure checkout flow
- User authentication and authorization (signup, login, protected routes)
- Responsive design for mobile and desktop

## Tech Stack
Frontend: React.js
Backend: Node.js, Express.js
Database: MongoDB
Authentication: JWT
Deployment: Vercel

## Project Structure
ordermanager/
├── client/     # React frontend
├── server/     # Node.js/Express backend
└── .gitignore

## Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB instance (local or MongoDB Atlas)

### Installation
1. Clone the repository
git clone https://github.com/jass587/ordermanager.git
cd ordermanager

2. Install dependencies for both client and server
cd client && npm install
cd ../server && npm install

3. Set up environment variables (create .env in /server)
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret

4. Run the app
# In /server
npm start
# In /client (separate terminal)
npm start

## Future Improvements
- Admin dashboard for inventory management
- Order tracking
- Product reviews and ratings

## Author
Jyoti Singh
LinkedIn: https://linkedin.com/in/jyoti-singh-b46ab4102
GitHub: https://github.com/jass587
