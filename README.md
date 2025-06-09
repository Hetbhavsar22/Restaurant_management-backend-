# Restaurant Management System

A modern web-based restaurant management system built with Node.js, Express, and MongoDB.

## Features

- User Authentication (Admin, Staff, Customers)
- Menu Management
- Order Management
- Table Reservations
- Admin Dashboard

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Project Structure

```
restaurant-management/
├── src/
│   ├── controllers/    # Route controllers
│   ├── models/        # Database models
│   ├── routes/        # API routes
│   ├── middleware/    # Custom middleware
│   ├── config/        # Configuration files
│   ├── utils/         # Utility functions
│   └── server.js      # Main application file
├── .env               # Environment variables
├── package.json       # Project dependencies
└── README.md         # Project documentation
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/restaurant_management
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

The API endpoints will be documented here as they are implemented.

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request 