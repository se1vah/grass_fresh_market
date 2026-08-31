# Shop Admin API Documentation: Categories

This document details the **Category API endpoints** used in the Grace Fresh Market Shop Admin module.

---

## GET `/api/shop/categories`

Retrieves a paginated list of categories with optional keyword search support.

### Request Details
- **HTTP Method**: `GET`
- **URL Path**: `/api/shop/categories`
- **Authentication**: Public (Unauthenticated)

### Query Parameters

| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `page` | `number` | No | `1` | Page number for pagination (minimum: 1). |
| `limit` | `number` | No | `10` | Number of items per page (maximum: 100). |
| `search` | `string` | No | `""` | Search keyword to filter categories by `category_name`. |

### Example Request

```http
GET /api/shop/categories?page=1&limit=10&search=fresh HTTP/1.1
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
      "category_name": "Fresh Vegetables",
      "image": "/images/category/fresh-vegetables-1787510000000.jpg",
      "category_type": "gram",
      "status": "active",
      "created_at": "2026-08-23T18:00:00.000Z",
      "updated_at": "2026-08-23T18:00:00.000Z"
    },
    {
      "id": 2,
      "category_name": "Fresh Fruits",
      "image": "/images/category/fresh-fruits-1787510000000.jpg",
      "category_type": "quantity",
      "status": "active",
      "created_at": "2026-08-23T18:05:00.000Z",
      "updated_at": "2026-08-23T18:05:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 2,
    "totalPages": 1
  }
}
```

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `success` | `boolean` | Indicates whether the request succeeded. |
| `data` | `array` | List of category objects matching the query. |
| `data[].id` | `number` | Category primary key ID. |
| `data[].category_name` | `string` | Name of the category. |
| `data[].image` | `string` | Public relative URL of the category image asset. |
| `data[].category_type` | `string` | Measurement type of the category (`"gram"` or `"quantity"`). |
| `data[].status` | `string` | Status of the category (`"active"` or `"inactive"`). |
| `data[].created_at` | `string` | ISO 8601 timestamp when category was created. |
| `data[].updated_at` | `string` | ISO 8601 timestamp when category was last updated. |
| `pagination.page` | `number` | Current page number. |
| `pagination.limit` | `number` | Items per page limit. |
| `pagination.total` | `number` | Total count of categories matching search filter. |
| `pagination.totalPages` | `number` | Total number of calculated pages. |

---

## Summary of Status Codes

- `200 OK`: Request succeeded and returned requested data payload.
- `500 Internal Server Error`: Server or database query error.
