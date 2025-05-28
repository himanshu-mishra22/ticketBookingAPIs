# Event Booking System - RESTful API (Node.js + Express.js + MySQL)

## Objective

Build a fully functional **RESTful API** for an **Event Booking System** where users can:
- Browse events
- Book tickets 
- Manage their bookings

##  Features

### 1. User Registration & Authentication
- User signup with email & password
- Secure login using JWT-based authentication
- Role-based access:
  - **User**: Can browse, book, and manage own bookings
  - **Admin**: Can manage (create/update/delete) events

### 2. Event Management
- **Admin** can:
  - Create new events
  - Edit event details
  - Delete events
- **Public** (including unauthenticated users) can:
  - View all available events

### 3. Booking System
- **Authenticated Users** can:
  - Book a ticket
  - View all their bookings
  - Cancel bookings

### 4. Database
- **MySQL** used as the relational database
---

##  Setup Instructions

###  Clone the Repository

- git clone https://github.com/himanshu-mishra22/ticketBookingAPIs.git
- cd event-booking-api

### Install Dependencies

npm install

### Setup Environment Variables

- BACKEND_PORT=2000
- DB_HOST=localhost
- DB_USER=user
- DB_PASSWORD=password
- DB_NAME=ticketbooking
- JWT_SECRET=yoursecret

###  Run the Server

npm start

## API Endpoints

### Auth Routes
1. POST --	/backend/auth/signup	-- Register new user 
2. POST --	/backend/auth/login  --	Login and get JWT token

### Event Routes
1. GET --	/backend/events --	View all events
2. POST -- /backend/events --	Create a new event
3. PUT --	/backend/events/:id -- Update an event
4. DELETE	-- /backend/events/:id	-- Delete an event

### Booking Routes
1. POST --	/backend/bookings/:eventId --	Book a ticket for event
2. GET --	/backend/bookings/ --	View user’s bookings
3. DELETE --	/api/bookings/:id --	Cancel a booking

## Tech Stack
- Node.js
- Express.js
- MySQL
- JWT for authentication
- bcrypt for password hashing
- dotenv for environment configs


