# WelcomeOnboard API

A NestJS backend REST API for task management with MongoDB integration.

## Features

- User management with authentication
- Task management with actions
- JWT-based authentication
- MongoDB integration with Mongoose
- Input validation with class-validator
- TypeScript support

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or MongoDB Atlas)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `env.example`:
   ```bash
   cp env.example .env
   ```

4. Update the `.env` file with your configuration:
   - Set your MongoDB connection string
   - Set a secure JWT secret

## Running the Application

```bash
# Development
npm run start:dev

# Production build
npm run build
npm run start:prod
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `GET /auth/profile` - Get user profile (protected)

### Users
- `POST /users` - Create user
- `GET /users` - Get all users (protected)
- `GET /users/:id` - Get user by ID (protected)
- `PATCH /users/:id` - Update user (protected)
- `DELETE /users/:id` - Delete user (protected)

### Tasks
- `POST /tasks` - Create task (protected)
- `GET /tasks` - Get all tasks (protected)
- `GET /tasks?userId=:id` - Get tasks by user (protected)
- `GET /tasks?category=:category` - Get tasks by category (protected)
- `GET /tasks/:id` - Get task by ID (protected)
- `PATCH /tasks/:id` - Update task (protected)
- `DELETE /tasks/:id` - Delete task (protected)
- `POST /tasks/:id/complete` - Mark task as completed (protected)
- `POST /tasks/:id/start` - Start task (protected)
- `POST /tasks/:id/stop` - Stop task (protected)

## Data Models

### User
- id: string
- username: string
- password: string (hashed)
- email: string
- role: UserRole (admin, user, manager)
- firstName: string
- lastName: string
- isActive: boolean
- createdAt: Date
- updatedAt: Date

### Task
- id: string
- name: string
- description?: string
- category: string
- url?: string
- actions?: Action[]
- createdBy: string (User ID)
- createdAt: Date
- updatedAt: Date
- isActive: boolean
- completionCount: number
- lastCompletedAt?: Date

### Action
- id: string
- name: string
- description?: string
- url?: string
- isCompleted: boolean
- completedAt?: Date

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Development

```bash
# Run linting
npm run lint

# Run tests
npm run test

# Run tests with coverage
npm run test:cov
```
