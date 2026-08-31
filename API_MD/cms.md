# Shop Admin API Documentation: CMS Pages

This document details all **CMS API endpoints** used in the Grace Fresh Market Shop Admin module to manage static pages.

---

## Table of Contents
1. [GET /api/shop/cms](#1-get-apishopcms)
2. [GET /api/shop/cms/[id]](#2-get-apishopcmsid)
3. [POST /api/shop/cms](#3-post-apishopcms)
4. [PUT /api/shop/cms/[id]](#4-put-apishopcmsid)
5. [DELETE /api/shop/cms/[id]](#5-delete-apishopcmsid)

---

## 1. GET `/api/shop/cms`

Retrieves a paginated list of CMS pages with optional search keyword filtering (matching page name, slug, or title) and status filtering.

### Request Details
- **HTTP Method**: `GET`
- **URL Path**: `/api/shop/cms`
- **Authentication**: Public (Unauthenticated)

### Query Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `page` | `number` | No | `1` | Page number for pagination (minimum: 1). |
| `limit` | `number` | No | `10` | Number of items per page (maximum: 100). |
| `search` | `string` | No | `""` | Search keyword to filter pages by `page_name`, `slug`, or `page_title`. |
| `status` | `string` | No | `""` | Status filter: `"Active"`, `"Inactive"`, or `"All"` / empty for all statuses. |

### Example Request

```http
GET /api/shop/cms?page=1&limit=10&search=about&status=Active HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "page_name": "About Us",
      "slug": "about-us",
      "page_title": "About Grace Fresh Market",
      "meta_description": "Learn about our farm-fresh vegetables and fruits delivery service.",
      "content": "<p>Welcome to Grace Fresh Market! We deliver organic and fresh products directly from local farms.</p>",
      "status": "Active",
      "created_at": "2026-08-24T18:00:00.000Z",
      "updated_at": "2026-08-24T18:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `success` | `boolean` | Indicates whether the request succeeded. |
| `data` | `array` | Array of CMS page objects. |
| `data[].id` | `number` | CMS Page primary key ID. |
| `data[].page_name` | `string` | Display name of the page. |
| `data[].slug` | `string` | URL-friendly unique identifier slug. |
| `data[].page_title` | `string` | SEO page title. |
| `data[].meta_description` | `string` | Meta description snippet for SEO. |
| `data[].content` | `string` | HTML rich-text content of the page. |
| `data[].status` | `string` | Publication status (`"Active"` or `"Inactive"`). |
| `data[].created_at` | `string` | Creation timestamp. |
| `data[].updated_at` | `string` | Last modification timestamp. |
| `pagination` | `object` | Page metadata object containing `page`, `limit`, `total`, and `totalPages`. |

---

## 2. GET `/api/shop/cms/[id]`

Retrieves detailed information for a specific CMS page by its ID.

### Request Details
- **HTTP Method**: `GET`
- **URL Path**: `/api/shop/cms/:id`
- **Authentication**: Public (Unauthenticated)

### Path Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `number` | Yes | Unique integer ID of the target CMS page. |

### Example Request

```http
GET /api/shop/cms/1 HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "data": {
    "id": 1,
    "page_name": "About Us",
    "slug": "about-us",
    "page_title": "About Grace Fresh Market",
    "meta_description": "Learn about our farm-fresh vegetables and fruits delivery service.",
    "content": "<p>Welcome to Grace Fresh Market! We deliver organic and fresh products directly from local farms.</p>",
    "status": "Active",
    "created_at": "2026-08-24T18:00:00.000Z",
    "updated_at": "2026-08-24T18:00:00.000Z"
  }
}
```

### Example Error Responses

- **`400 Bad Request`** (Invalid ID parameter):
  ```json
  {
    "error": "Invalid page ID"
  }
  ```
- **`404 Not Found`** (Page does not exist):
  ```json
  {
    "error": "CMS page not found"
  }
  ```

---

## 3. POST `/api/shop/cms`

Creates a new CMS page record. Automatically sanitizes the provided slug and validates slug uniqueness before creating the page.

### Request Details
- **HTTP Method**: `POST`
- **URL Path**: `/api/shop/cms`
- **Content-Type**: `application/json`
- **Authentication**: Public / Admin

### Request Body Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page_name` | `string` | Yes | Name of the CMS page. |
| `slug` | `string` | Yes | URL slug (e.g. `privacy-policy`). Auto-sanitized to lowercase hyphenated format. |
| `page_title` | `string` | Yes | Page title tag content for browser and SEO. |
| `meta_description` | `string` | Yes | Brief summary text for search engine meta description. |
| `content` | `string` | Yes | Rich text HTML page content. |
| `status` | `string` | No | Page publication status (`"Active"` or `"Inactive"`, defaults to `"Active"`). |

### Example Request

```http
POST /api/shop/cms HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "page_name": "Privacy Policy",
  "slug": "privacy-policy",
  "page_title": "Privacy Policy - Grace Fresh Market",
  "meta_description": "Learn how Grace Fresh Market protects and handles your personal information.",
  "content": "<h2>Privacy Commitments</h2><p>Your privacy is important to us...</p>",
  "status": "Active"
}
```

### Example Successful Response (`201 Created`)

```json
{
  "success": true,
  "message": "CMS page created successfully",
  "data": {
    "id": 2,
    "page_name": "Privacy Policy",
    "slug": "privacy-policy",
    "page_title": "Privacy Policy - Grace Fresh Market",
    "meta_description": "Learn how Grace Fresh Market protects and handles your personal information.",
    "content": "<h2>Privacy Commitments</h2><p>Your privacy is important to us...</p>",
    "status": "Active"
  }
}
```

### Example Validation Errors (`400 Bad Request`)

- **Missing Required Fields**:
  ```json
  {
    "error": "Page Name is required"
  }
  ```
- **Duplicate Slug**:
  ```json
  {
    "error": "Slug \"privacy-policy\" already exists. Please enter a unique slug."
  }
  ```

---

## 4. PUT `/api/shop/cms/[id]`

Updates an existing CMS page record identified by its ID. Re-validates required fields and checks slug uniqueness (excluding current record ID).

### Request Details
- **HTTP Method**: `PUT`
- **URL Path**: `/api/shop/cms/:id`
- **Content-Type**: `application/json`
- **Authentication**: Public / Admin

### Path Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `number` | Yes | Unique integer ID of the target CMS page to update. |

### Request Body Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `page_name` | `string` | Yes | Updated page name. |
| `slug` | `string` | Yes | Updated URL slug. |
| `page_title` | `string` | Yes | Updated page title. |
| `meta_description` | `string` | Yes | Updated meta description. |
| `content` | `string` | Yes | Updated rich text HTML content. |
| `status` | `string` | No | Updated status (`"Active"` or `"Inactive"`). |

### Example Request

```http
PUT /api/shop/cms/2 HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{
  "page_name": "Privacy Policy & Terms",
  "slug": "privacy-policy",
  "page_title": "Privacy Policy & Terms - Grace Fresh Market",
  "meta_description": "Updated privacy policy and terms of service for Grace Fresh Market.",
  "content": "<h2>Updated Policy</h2><p>We have updated our terms...</p>",
  "status": "Active"
}
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "message": "CMS page updated successfully",
  "data": {
    "id": 2,
    "page_name": "Privacy Policy & Terms",
    "slug": "privacy-policy",
    "page_title": "Privacy Policy & Terms - Grace Fresh Market",
    "meta_description": "Updated privacy policy and terms of service for Grace Fresh Market.",
    "content": "<h2>Updated Policy</h2><p>We have updated our terms...</p>",
    "status": "Active"
  }
}
```

### Example Error Responses

- **`404 Not Found`**:
  ```json
  {
    "error": "CMS page not found"
  }
  ```
- **`400 Bad Request`** (Duplicate slug on another record):
  ```json
  {
    "error": "Slug \"privacy-policy\" is already in use by another page. Please choose a unique slug."
  }
  ```

---

## 5. DELETE `/api/shop/cms/[id]`

Deletes a CMS page from the database by ID.

### Request Details
- **HTTP Method**: `DELETE`
- **URL Path**: `/api/shop/cms/:id`
- **Authentication**: Public / Admin

### Path Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | `number` | Yes | Unique integer ID of the target CMS page to delete. |

### Example Request

```http
DELETE /api/shop/cms/2 HTTP/1.1
Host: localhost:3000
Accept: application/json
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "message": "CMS page deleted successfully",
  "id": 2
}
```

### Example Error Responses

- **`404 Not Found`**:
  ```json
  {
    "error": "CMS page not found"
  }
  ```

---

## Summary of Status Codes

- `200 OK`: Request succeeded and returned requested data payload or success message.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Validation failure (e.g. missing required field, duplicate slug, invalid ID format).
- `404 Not Found`: Target CMS record not found.
- `500 Internal Server Error`: Server or database query error.
