# Store Management API

A NestJS + Prisma backend API for managing products, categories, and users with authentication and role-based access control.

## 1. Features
- User registration & login (JWT authentication)
- Role-based access control (GUEST & STORE_OWNER)
- Product management (CRUD) — restricted to store owners
- Category management (CRUD) — restricted to store owners
- Product filtering by category
- Product sorting by price (asc/desc)
- PostgreSQL database with Prisma ORM


## 2. Tech Stack
- [NestJS](https://nestjs.com/) — Node.js framework
- [Prisma](https://www.prisma.io/) — ORM for database access
- [PostgreSQL](https://www.postgresql.org/) — Database
- [Passport.js](https://www.passportjs.org/) — Authentication middleware
- [JWT](https://jwt.io/) — Authentication
- [Class Validator](https://github.com/typestack/class-validator) — DTO validation
- [Bcryptjs](https://github.com/kelektiv/node.bcryptjs.js) — Password hashing


## 3. Installation

### 3.1 Clone the repository
```bash
git clone https://github.com/raidboukherouba/temtem-one-test.git
cd backend
npm install
```

### 3.2 Set up environment variables (Create a .env file):
```bash
DATABASE_URL="postgresql://user:password@localhost:5432/dbname?schema=public"
JWT_SECRET="your_jwt_secret"
```
for example thats my .env:
```bash
DATABASE_URL="postgresql://postgres:1234@localhost:5432/temtem_db"
JWT_SECRET="3a7bd3e4b9a1d2c5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0"
```

### 3.3 Run Prisma migrations
```bash
npx prisma migrate dev
```

### 3.4 Start the server
```bash
npm run start:dev
```


---

## **4. API Endpoints**

### 4.1 Authentication

- `POST /auth/register` — Register a new user
```md
{
  "email": "customer1@example.com",
  "password": "password123"
}
```

- `POST /auth/login` — Login and get JWT token
```md
{
  "email": "owner@store.com",
  "password": "password123"
}
```

Response:
```md
{
  "access_token": "<JWT_TOKEN>"
}
```

### 4.2 Products
- `GET /products` — List all products (supports `?categoryId=1&sortByPrice=asc`)
- `GET /products/:id` — Get single product
- `POST /products` — Create product (STORE_OWNER only, JWT required)
- `PATCH /products/:id` — Update product (STORE_OWNER only, JWT required)
- `DELETE /products/:id` — Delete product (STORE_OWNER only, JWT required)

### 4.3 Categories
- `GET /categories` — List all categories
- `GET /categories/:id` — Get single category
- `POST /categories` — Create category (STORE_OWNER only, JWT required)
- `PATCH /categories/:id` — Update category (STORE_OWNER only, JWT required)
- `DELETE /categories/:id` — Delete category (STORE_OWNER only, JWT required)

## 5. Roles & Permissions
- **GUEST**
  - Can register & login
  - Can view products and categories
  - Can filter and sort products
- **STORE_OWNER**
  - Full CRUD on products and categories

## 6. Filtering & Sorting Example
GET /products?categoryId=2&sortByPrice=desc

Filters products by category with id=2

Sorts products by price descending