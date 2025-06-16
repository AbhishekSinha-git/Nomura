# CleanWave Backend

This is the backend server for the CleanWave application, built with Flask and PostgreSQL.

## Setup Instructions

1. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Create a PostgreSQL database:
```bash
createdb cleanwave
```

4. Create a `.env` file in the backend directory with the following content:
```
# Flask configuration
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here

# Database configuration
DATABASE_URL=postgresql://localhost/cleanwave

# LLM Configuration
# Choose between "LOCAL" (LM Studio) or "BEDROCK" (Amazon Bedrock)
LLM_PROVIDER=LOCAL

# LM Studio Configuration (when LLM_PROVIDER=LOCAL)
LLM_API_BASE=http://localhost:1234/v1
LLM_API_KEY=not-needed

# Amazon Bedrock Configuration (when LLM_PROVIDER=BEDROCK)
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# CORS configuration
CORS_ORIGINS=http://localhost:3000
```

5. Initialize the database:
```bash
psql cleanwave < schema.sql
```

6. Run the development server:
```bash
flask run
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `GET /api/auth/me` - Get current user info

### Events

- `GET /api/events` - List all events
- `GET /api/events/<id>` - Get event details
- `POST /api/events` - Create new event (organizer only)
- `PUT /api/events/<id>` - Update event (organizer only)
- `DELETE /api/events/<id>` - Delete event (organizer only)
- `POST /api/events/<id>/register` - Register for event (volunteer only)
- `POST /api/events/<id>/generate-post` - Generate social media post (organizer only)
- `POST /api/events/<id>/ask-ecobot` - Ask EcoBot about event (authenticated users)

### Waste Logs

- `GET /api/waste-logs/event/<id>` - Get event waste logs
- `POST /api/waste-logs/event/<id>` - Create waste log (volunteer only)
- `PUT /api/waste-logs/<id>` - Update waste log
- `DELETE /api/waste-logs/<id>` - Delete waste log
- `GET /api/waste-logs/event/<id>/analytics` - Get event waste analytics (organizer only)

### Users

- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/events` - Get user's events
- `GET /api/users/stats` - Get user statistics

## LLM Integration

The backend supports two LLM providers:

### 1. LM Studio (Local)
- Default provider when `LLM_PROVIDER=LOCAL`
- Requires LM Studio to be running locally
- Configure using:
  ```
  LLM_API_BASE=http://localhost:1234/v1
  LLM_API_KEY=not-needed
  ```

### 2. Amazon Bedrock
- Enable by setting `LLM_PROVIDER=BEDROCK`
- Requires AWS credentials and Bedrock access
- Configure using:
  ```
  AWS_ACCESS_KEY_ID=your-aws-access-key
  AWS_SECRET_ACCESS_KEY=your-aws-secret-key
  AWS_REGION=your-aws-region
  BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0
  ```

### LLM Features

1. Social Media Post Generation
   - Endpoint: `POST /api/events/<id>/generate-post`
   - Uses event data to generate engaging social media posts
   - Requires organizer role
   - Configurable temperature and max tokens

2. EcoBot Assistant
   - Endpoint: `POST /api/events/<id>/ask-ecobot`
   - Answers questions about events using context-aware responses
   - Available to all authenticated users
   - Uses lower temperature for more focused answers

## Security

- JWT-based authentication
- Role-based access control (volunteer/organizer)
- Password hashing with bcrypt
- CORS protection
- Input validation
- SQL injection prevention with SQLAlchemy

## Error Handling

All endpoints return appropriate HTTP status codes and error messages in JSON format:

```json
{
    "error": "Error message here"
}
```

Common status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error 