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

Run migrations:
```bash
npm run prisma:migrate
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

## Database Management

```bash
# Generate Prisma Client
npm run prisma:generate

# Create a new migration
npm run prisma:migrate

# Seed database with initial data
npm run prisma:seed

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

## API Endpoints

### Currencies

#### Get all currencies
```http
GET /currency
```

#### Get currency by ID
```http
GET /currency/:id
```

#### Create currency
```http
POST /currency
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
Content-Type: application/json

{
  "name": "Updated Name"
}
```

#### Delete currency
```http
DELETE /currency/:id
```

### Users

#### Create user
```http
POST /user
Content-Type: application/json

{
  "name": "John Doe",
  "defaultCurrencyId": "currency-uuid" // optional
}
```

#### Update user
```http
PUT /user/:user_id
Content-Type: application/json

{
  "name": "Jane Doe",
  "defaultCurrencyId": "currency-uuid"
}
```

#### Get user by ID
```http
GET /user/<user_id>
```

#### Delete user
```http
DELETE /user/<user_id>
```

#### Get all users
```http
GET /user
```

### Categories

#### Get all categories
```http
GET /category
```

#### Get category by ID
```http
GET /category/:id
```

#### Create category
```http
POST /category
Content-Type: application/json

{
  "name": "Groceries"
}
```

#### Update category
```http
PUT /category/:id
Content-Type: application/json

{
  "name": "Updated Category"
}
```

#### Delete category
```http
DELETE /category/:id
```

### Records

#### Get record by ID
```http
GET /record/<record_id>
```

#### Delete record
```http
DELETE /record/<record_id>
```

#### Create record
```http
POST /record
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
Content-Type: application/json

{
  "categoryId": "category-uuid",
  "amount": 200.00,
  "currencyId": "currency-uuid"
}
```

#### Get records with filtering
```http
GET /record?user_id=<user_id>&category_id=<category_id>
```

**Note:** At least one filter parameter (user_id or category_id) is required.
