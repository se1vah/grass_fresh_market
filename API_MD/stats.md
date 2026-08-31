# Shop Admin API Documentation: Stats

This document details the **Dashboard Statistics API endpoint** used in the Grace Fresh Market Shop Admin module.

---

## GET `/api/shop/stats`

Retrieves catalog aggregate count statistics for both Categories and SubCategories.

### Request Details
- **HTTP Method**: `GET`
- **URL Path**: `/api/shop/stats`
- **Authentication**: Protected (Requires valid Shop Admin JWT Cookie)
- **Cookie Required**: `shop_token`

### Example Request

```http
GET /api/shop/stats HTTP/1.1
Host: localhost:3000
Cookie: shop_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Accept: application/json
```

### Example Successful Response (`200 OK`)

```json
{
  "success": true,
  "totalCategories": 5,
  "activeCategories": 4,
  "inactiveCategories": 1,
  "totalSubCategories": 12,
  "activeSubCategories": 10,
  "inactiveSubCategories": 2
}
```

### Example Unauthorized Response (`401 Unauthorized`)

```json
{
  "error": "Unauthorized"
}
```

### Response Fields

| Field | Type | Description |
| :--- | :--- | :--- |
| `success` | `boolean` | Indicates whether request succeeded. |
| `totalCategories` | `number` | Total number of categories. |
| `activeCategories` | `number` | Count of active categories. |
| `inactiveCategories` | `number` | Count of inactive categories. |
| `totalSubCategories` | `number` | Total number of subcategories. |
| `activeSubCategories` | `number` | Count of active subcategories. |
| `inactiveSubCategories` | `number` | Count of inactive subcategories. |

---

## Summary of Status Codes

- `200 OK`: Request succeeded and returned requested stats payload.
- `401 Unauthorized`: Authentication missing or expired token for protected stats endpoint.
- `500 Internal Server Error`: Server or database query error.
