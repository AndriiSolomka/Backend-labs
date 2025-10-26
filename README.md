### Step 1: Clone the repository

```bash
git clone <repository-url>
cd backend
```

### Step 2: Install dependencies

```bash
npm install
```

### Step 3: Run the application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The application will start on `http://localhost:3000`

## API Endpoints

### Users

#### Create user
```http
POST /user
Content-Type: application/json

{
  "name": "John Doe"
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
GET /users
```

### Categories

#### Get all categories
```http
GET /category
```

#### Create category
```http
POST /category
Content-Type: application/json

{
  "name": "Groceries"
}
```

#### Delete category
```http
DELETE /category?id=<category_id>
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
  "amount": 150.50
}
```

#### Get records with filtering
```http
GET /record?user_id=<user_id>&category_id=<category_id>
```

**Note:** At least one filter parameter (user_id or category_id) is required.


