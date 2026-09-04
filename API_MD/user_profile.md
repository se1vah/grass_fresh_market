# User Profile API Documentation

This document details the **User Profile API endpoints** (`GET` and `POST`) for managing user profiles and uploading profile photos in Grace Fresh Market.

---

## Features
- Upload user profile photos (supports JPG, JPEG, PNG, WEBP up to 5MB).
- **Automatic Server Cleanup**: When a user updates their profile photo, the previously stored profile photo file is automatically deleted from the server disk.
- Update profile details (`fullName`, `phoneNumber`).
- Retrieve user profile details.

---

## 1. POST `/api/user/profile` (or `/api/user/profile/upload` / `/api/users/profile`) - Update Profile & Upload Photo

Updates user profile details and/or uploads a new profile photo.

### Request Details
- **HTTP Method**: `POST`
- **URL Paths**: `/api/user/profile`, `/api/user/profile/upload`, `/api/users/profile`, `/api/users/profile/upload`
- **Headers**: `Content-Type: multipart/form-data` (or `application/json` for text-only updates)
- **Authentication**: 
  - **Option A (Recommended)**: Pass JWT token via HTTP-only Cookie (`user_token`) or `Authorization: Bearer <token>`.
  - **Option B**: Pass `userId` / `user_id` parameter.

### Request Form Data Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `profileImage` / `image` / `photo` / `file` | `File` | No | Image file to set as user profile photo (JPG, PNG, WEBP, max 5MB). |
| `fullName` / `full_name` | `string` | No | User's full name. |
| `phoneNumber` / `phone_number` | `string` | No | User's phone number. |
| `userId` / `user_id` | `number` | Optional* | User ID (Required if JWT token is not supplied). |

### Example Request (`multipart/form-data`)

```
fullName: Jane Smith
phoneNumber: +1234567890
profileImage: [Binary File: avatar.jpg]
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "message": "User profile updated successfully",
  "user": {
    "id": 1,
    "fullName": "Jane Smith",
    "full_name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "+1234567890",
    "phone_number": "+1234567890",
    "profileImage": "/images/profile/user-1-1725460000000.jpg",
    "profile_image": "/images/profile/user-1-1725460000000.jpg",
    "createdAt": "2026-08-30T16:20:00.000Z",
    "updatedAt": "2026-09-04T16:30:00.000Z"
  }
}
```

---

## 2. GET `/api/user/profile` (or `/api/users/profile`) - Get User Profile

Retrieves profile details for the authenticated user or specified `userId`.

### Request Details
- **HTTP Method**: `GET`
- **URL Paths**: `/api/user/profile` or `/api/users/profile`
- **Authentication**: JWT Cookie (`user_token`), `Authorization: Bearer <token>`, or `userId` query parameter.

### Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `userId` / `user_id` | `number` | Optional* | User ID parameter (Required if authentication token is missing). |

### Example Request
`GET /api/user/profile`

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "message": "User profile retrieved successfully",
  "user": {
    "id": 1,
    "fullName": "Jane Smith",
    "full_name": "Jane Smith",
    "email": "jane.smith@example.com",
    "phoneNumber": "+1234567890",
    "phone_number": "+1234567890",
    "profileImage": "/images/profile/user-1-1725460000000.jpg",
    "profile_image": "/images/profile/user-1-1725460000000.jpg",
    "createdAt": "2026-08-30T16:20:00.000Z",
    "updatedAt": "2026-09-04T16:30:00.000Z"
  }
}
```

---

## Summary of Status Codes

- `200 OK`: Profile retrieved or updated successfully.
- `400 Bad Request`: Invalid image format or file size exceeding 5MB.
- `401 Unauthorized`: Missing user authentication or user ID.
- `404 Not Found`: User profile record not found.
- `500 Internal Server Error`: Server error during upload or database update.
