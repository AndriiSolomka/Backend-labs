## Визначення варіанту
**Група:** 31  
**Варіант:** 31 % 3 = 1  

## Installation

### Step 1: Clone the repository

```bash
git clone <repository-url>
cd backend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Setup database

Start PostgreSQL with Docker:
```bash
docker-compose up -d db
```

Wait 5-10 seconds for the database to start, then run migrations:
```bash
npm run prisma:migrate
```
Enter migration name when prompted: `add_authentication`

Generate Prisma Client:
```bash
npm run prisma:generate
```

Seed initial data (currencies):
```bash
npm run prisma:seed
```

### Step 4: Run the application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The application will start on `http://localhost:3000`

## API Endpoints

### Authentication (Public)

All endpoints except `/auth/register` and `/auth/login` require JWT authentication.
Include the token in the Authorization header: `Authorization: Bearer <token>`

#### Register new user
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Users (Protected - Requires JWT)

#### Get all users
```http
GET /user
Authorization: Bearer <token>
```

#### Get user by ID
```http
GET /user/:user_id
Authorization: Bearer <token>
```

#### Update user
```http
PUT /user/:user_id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "defaultCurrencyId": "currency-uuid"
}
```

#### Delete user
```http
DELETE /user/:user_id
Authorization: Bearer <token>
```

### Currencies (Protected - Requires JWT)

### Currencies (Protected - Requires JWT)

#### Get all currencies
```http
GET /currency
Authorization: Bearer <token>
```

#### Get currency by ID
```http
GET /currency/:id
Authorization: Bearer <token>
```

#### Create currency
```http
POST /currency
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "USD",
  "name": "US Dollar",
  "symbol": "$"
}
```

#### Update currency
```http
PUT /currency/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Name"
}
```

#### Delete currency
```http
DELETE /currency/:id
Authorization: Bearer <token>
```

### Categories (Protected - Requires JWT)

### Categories (Protected - Requires JWT)

#### Get all categories
```http
GET /category
Authorization: Bearer <token>
```

#### Get category by ID
```http
GET /category/:id
Authorization: Bearer <token>
```

#### Create category
```http
POST /category
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Groceries"
}
```

#### Update category
```http
PUT /category/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Updated Category"
}
```

#### Delete category
```http
DELETE /category/:id
Authorization: Bearer <token>
```

### Records (Protected - Requires JWT)

### Records (Protected - Requires JWT)

#### Get record by ID
```http
GET /record/:record_id
Authorization: Bearer <token>
```

#### Get records with filtering
```http
GET /record?user_id=<user_id>&category_id=<category_id>
Authorization: Bearer <token>
```
**Note:** At least one filter parameter (user_id or category_id) is required.

#### Create record
```http
POST /record
Authorization: Bearer <token>
Content-Type: application/json

{
  "userId": "user-uuid",
  "categoryId": "category-uuid",
  "amount": 150.50,
  "currencyId": "currency-uuid" // optional, uses user's default if not provided
}
```

#### Update record
```http
PUT /record/:record_id
Authorization: Bearer <token>
Content-Type: application/json

{
  "categoryId": "category-uuid",
  "amount": 200.00,
  "currencyId": "currency-uuid"
}
```

#### Delete record
```http
DELETE /record/:record_id
Authorization: Bearer <token>
```

## Testing with Postman

1. Import the `postman_collection.json` file into Postman
2. Start with **Auth → Register** to create a new user (token saves automatically)
3. Or use **Auth → Login** to get a token for an existing user
4. The token will be automatically added to all protected endpoints
5. Try any endpoint in Users, Categories, Currencies, or Records

### Testing without a token
To verify authentication is working:
1. Remove the Authorization header from any request
2. You should receive a `401 Unauthorized` response

## Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5433/backend_labs?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-12345"
```

## Security

- ✅ Passwords are hashed using bcrypt (10 salt rounds)
- ✅ JWT tokens expire after 24 hours
- ✅ All endpoints except `/auth/*` require authentication
- ✅ Passwords are never returned in API responses
- ✅ Email must be unique
- ✅ Input validation on all endpoints

## Architecture

This project follows Clean Architecture principles with Domain-Driven Design:

```
src/
├── auth/                    # Authentication module
│   ├── application/         # Business logic (register, login)
│   ├── infrastructure/      # JWT strategy, guards
│   └── presentation/        # Controllers, DTOs
├── users/                   # User management
├── categories/              # Category management
├── currencies/              # Currency management
├── records/                 # Financial records
├── prisma/                  # Database service
└── common/                  # Shared utilities
```

## License

UNLICENSED
