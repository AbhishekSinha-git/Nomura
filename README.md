# CleanWave Eco-Connect

A modern web application for organizing and participating in environmental cleanup events, built with React and Flask.

## High-Level Design & Process Flow

### Core Features
1. **Event Management**
   - Create, read, update, and delete cleanup events
   - Event registration and participation tracking
   - Event details including location, date, time, and requirements
   - Safety protocols and participant guidelines

2. **User Management**
   - User registration and authentication
   - Profile management
   - Event participation history
   - Role-based access control (Organizers and Volunteers)

3. **Interactive Features**
   - Event location mapping
   - Real-time participant count
   - Event status tracking
   - Social sharing capabilities

### Process Flow

1. **Event Creation Flow**
   ```
   Organizer Login → Create Event → Fill Event Details → Set Requirements → Publish Event
   ```

2. **Event Participation Flow**
   ```
   User Login → Browse Events → View Event Details → Register → Receive Confirmation
   ```

3. **Event Management Flow**
   ```
   Organizer Login → View Created Events → Manage Participants → Update Event Details → Track Progress
   ```

## System Overview: Modular Architecture

### Frontend Architecture (React + TypeScript)
```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── hooks/             # Custom React hooks
├── services/          # API service layer
├── utils/             # Utility functions
├── types/             # TypeScript type definitions
└── context/           # React context providers
```

### Backend Architecture (Flask + PostgreSQL)
```
backend/
├── models/            # Database models
├── routes/            # API endpoints
├── services/          # Business logic
├── utils/             # Helper functions
└── config/            # Configuration files
```

### Database Schema
```
Users
├── id (PK)
├── email
├── password_hash
├── first_name
├── last_name
└── created_at

Events
├── id (PK)
├── title
├── description
├── date
├── time_start
├── time_end
├── location
├── city
├── state
├── organizer_id (FK)
└── created_at

EventParticipants (Junction Table)
├── event_id (FK)
└── user_id (FK)
```

### API Endpoints

1. **Authentication**
   - POST `/api/auth/register` - User registration
   - POST `/api/auth/login` - User login
   - POST `/api/auth/logout` - User logout

2. **Events**
   - GET `/api/events` - List all events
   - GET `/api/events/<id>` - Get event details
   - POST `/api/events` - Create event
   - PUT `/api/events/<id>` - Update event
   - DELETE `/api/events/<id>` - Delete event
   - POST `/api/events/<id>/join` - Join event
   - POST `/api/events/<id>/leave` - Leave event

3. **Users**
   - GET `/api/users/profile` - Get user profile
   - PUT `/api/users/profile` - Update profile
   - GET `/api/users/events` - Get user's events

### Security Features
- JWT-based authentication
- Password hashing with bcrypt
- CORS protection
- Input validation
- SQL injection prevention
- XSS protection

### Data Flow
1. **Client-Server Communication**
   ```
   Frontend → API Gateway → Backend Services → Database
   ```

2. **Authentication Flow**
   ```
   Login Request → JWT Generation → Token Storage → Protected Route Access
   ```

3. **Event Data Flow**
   ```
   Event Creation → Data Validation → Database Storage → Real-time Updates
   ```

## Technology Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- React Router
- Axios
- React Query

### Backend
- Python 3.9+
- Flask
- SQLAlchemy
- PostgreSQL
- JWT
- Flask-CORS

### Development Tools
- Git
- Docker
- VS Code
- Postman

## Getting Started

1. Clone the repository
2. Set up the frontend:
   ```bash
   cd cleanwave-eco-connect-main
   npm install
   npm start
   ```

3. Set up the backend:
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # or `venv\Scripts\activate` on Windows
   pip install -r requirements.txt
   flask run
   ```

4. Set up the database:
   ```bash
   flask db upgrade
   ```

## Contributing
Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License
This project is licensed under the MIT License - see the LICENSE.md file for details. 