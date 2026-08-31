# User Management API Documentation

This document details the **User Management API endpoints** (`Create User`, `User Login`, and `User Logout`) used in the Grace Fresh Market system.

---

## 1. POST `/api/users` (or `/api/users/create`)

Creates a new user record, generates a JWT authentication token, and persists the token in the `userLogin` table.

### Request Details
- **HTTP Method**: `POST`
- **URL Path**: `/api/users` (or `/api/users/create`)
- **Headers**: `Content-Type: application/json`
- **Authentication**: Public (Unauthenticated)

### Request Body Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullName` | `string` | Yes | Full name of the user. |
| `email` | `string` | Yes | Unique valid email address for the user. |
| `phoneNumber` | `string` | Yes | Phone number of the user. |
| `password` | `string` | Yes | Password for the account (minimum 6 characters). |

### Example Request Body

```json
{
  "fullName": "Jane Doe",
  "email": "jane.doe@example.com",
  "phoneNumber": "+1234567890",
  "password": "SecretPassword123"
}
```

### Example Successful Response (`201 Created`)

```json
{
  "success": true,
  "message": "User created successfully",
  "user": {
    "id": 1,
    "fullName": "Jane Doe",
    "email": "jane.doe@example.com",
    "phoneNumber": "+1234567890"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 2. POST `/api/users/login`

Authenticates an existing user with email and password, generates a new JWT token, and records the token entry in `userLogin`.

### Request Details
- **HTTP Method**: `POST`
- **URL Path**: `/api/users/login`
- **Headers**: `Content-Type: application/json`
- **Authentication**: Public (Unauthenticated)

### Request Body Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `email` | `string` | Yes | User's registered email address. |
| `password` | `string` | Yes | User's password. |

### Example Request Body

```json
{
  "email": "jane.doe@example.com",
  "password": "SecretPassword123"
}
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "id": 1,
    "fullName": "Jane Doe",
    "email": "jane.doe@example.com",
    "phoneNumber": "+1234567890"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## 3. POST `/api/users/logout`

Logs out the current user session by deleting the active JWT token from the `userLogin` database table and clearing the `user_token` HTTP cookie.

### Request Details
- **HTTP Method**: `POST`
- **URL Path**: `/api/users/logout`
- **Headers**: `Authorization: Bearer <token>` (optional if cookie is present)
- **Cookie**: `user_token=<token>`

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

### Error Responses

#### 1. Validation Error (`400 Bad Request`)

When required fields (`email` or `password`) are missing during login/registration:

```json
{
  "error": "Email is required."
}
```

#### 2. Authentication Error (`401 Unauthorized`)

When email is not registered or password does not match during login:

```json
{
  "error": "Invalid email or password."
}
```

#### 3. Internal Server Error (`500 Internal Server Error`)

When a database connection or server error occurs:

```json
{
  "error": "An unexpected authentication error occurred."
}
```

---

## Database Impact

- **`users` table**: Stores `id`, `fullName`, `email`, `phoneNumber`, hashed `password`, `created_at`, `updated_at`.
- **`userLogin` table**: Stores `id`, `user_id` (foreign key to `users.id`), `token` (JWT string), `created_at`. Every successful registration or login inserts a new active session token record into `userLogin`. On logout, the token is deleted from `userLogin`.
