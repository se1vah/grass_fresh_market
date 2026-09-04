# User Profile API Documentation

This document details the **User Profile API endpoints** (`GET`, `POST`, and `PUT`) for retrieving profile details, uploading profile photos, and updating user profile information & passwords in Grace Fresh Market.

---

## Features
- Upload user profile photos (supports JPG, JPEG, PNG, WEBP up to 5MB).
- **Automatic Server Cleanup**: When a user updates their profile photo, the previously stored profile photo file is automatically deleted from the server disk.
- Update profile details (`fullName`, `email`, `phoneNumber`).
- **Secure Password Update**: Allows changing passwords with strict 3-field validation (`currentPassword`, `newPassword`, `confirmNewPassword`).
- Retrieve user profile details.

---

## 1. PUT `/api/user/profile` (or `/api/user/update` / `/api/users/profile` / `/api/users/update`) - Update Profile & Password

Updates authenticated user details (`fullName`, `email`, `phoneNumber`) and/or changes password.

### Request Details
- **HTTP Method**: `PUT`
- **URL Paths**: `/api/user/profile`, `/api/user/update`, `/api/users/profile`, `/api/users/update`, `/api/users`
- **Headers**: `Content-Type: application/json`
- **Authentication**: JWT Cookie (`user_token`), `Authorization: Bearer <token>`, or `userId` parameter.

### Request Body Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `fullName` / `full_name` | `string` | No | Updated full name of the user. |
| `email` | `string` | No | Updated valid email address (must be unique). |
| `phoneNumber` / `phone_number` | `string` | No | Updated phone number. |
| `currentPassword` / `current_password` | `string` | Optional* | Current user password (Required ONLY if changing password). |
| `newPassword` / `new_password` | `string` | Optional* | New password (Min 6 characters. Required ONLY if changing password). |
| `confirmNewPassword` / `confirm_new_password` | `string` | Optional* | Confirmation of new password (Must match `newPassword`. Required ONLY if changing password). |
| `userId` / `user_id` | `number` | Optional* | User ID parameter (Required if authentication token is not present). |

> [!IMPORTANT]
> **Password Update Rule**: If updating `fullName`, `email`, or `phoneNumber` only, password fields are NOT required.
> However, if you want to change your password, **all three fields** (`currentPassword`, `newPassword`, `confirmNewPassword`) must be submitted together.

### Example Request Body (Profile Details Update Only)

```json
{
  "fullName": "Jane Smith",
  "email": "jane.smith@example.com",
  "phoneNumber": "+1234567890"
}
```

### Example Request Body (Password Change)

```json
{
  "currentPassword": "OldSecretPassword123",
  "newPassword": "NewSecretPassword456",
  "confirmNewPassword": "NewSecretPassword456"
}
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "message": "User details updated successfully",
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
    "updatedAt": "2026-09-04T18:00:00.000Z"
  }
}
```

---

## 2. POST `/api/user/profile` (or `/api/user/profile/upload` / `/api/users/profile`) - Upload Profile Photo

Uploads a new user profile photo and deletes the previous photo file from server storage.

### Request Details
- **HTTP Method**: `POST`
- **URL Paths**: `/api/user/profile`, `/api/user/profile/upload`, `/api/users/profile`, `/api/users/profile/upload`
- **Headers**: `Content-Type: multipart/form-data`

### Request Form Data Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `profileImage` / `image` / `photo` / `file` | `File` | Yes | Image file (JPG, PNG, WEBP, max 5MB). |
| `fullName` / `full_name` | `string` | No | User's full name. |
| `phoneNumber` / `phone_number` | `string` | No | User's phone number. |
| `userId` / `user_id` | `number` | Optional* | User ID parameter (Required if authentication token is not present). |

### Example Response (`200 OK`)

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
    "updatedAt": "2026-09-04T18:00:00.000Z"
  }
}
```

---

## 3. GET `/api/user/profile` (or `/api/users/profile`) - Get User Profile

Retrieves profile details for the authenticated user or specified `userId`.

### Request Details
- **HTTP Method**: `GET`
- **URL Paths**: `/api/user/profile` or `/api/users/profile`
- **Authentication**: JWT Cookie (`user_token`), `Authorization: Bearer <token>`, or `userId` query parameter.

### Example Response (`200 OK`)

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
    "updatedAt": "2026-09-04T18:00:00.000Z"
  }
}
```

---

## Summary of Error Status Codes

- `200 OK`: Profile retrieved or updated successfully.
- `400 Bad Request`: Validation failure (e.g. invalid email format, email/phoneNumber already taken by another user, missing password field when changing password, current password incorrect, new password same as current password, passwords do not match, new password less than 6 characters, or invalid image file).
- `401 Unauthorized`: Missing user authentication or user ID.
- `404 Not Found`: User profile record not found.
- `500 Internal Server Error`: Unexpected server or database error.
