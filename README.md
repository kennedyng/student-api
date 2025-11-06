# 🎓 Student API Documentation

A REST API for managing student records that teaches **both API usage and testing skills**. Learn how to consume APIs properly and master quality assurance testing through systematic validation. Perfect for mastering both development and testing competencies.

## 📥 Quick Start: Download Testing Requirements

**First step:** Get the comprehensive testing requirements document:

```bash
curl https://student-api-rouge.vercel.app/docs/requirements -o Student_API_Testing_Requirements.html
# OR visit: https://student-api-rouge.vercel.app/docs and click "Download Testing Requirements"
```

This document contains everything you need to validate the API systematically! 📋

## 🚀 Getting Started

### Base URL

```
https://student-api-rouge.vercel.app
```

The API is now live and deployed on Vercel!

### Quick Start

1. **Check API Status**

   ```bash
   curl https://student-api-rouge.vercel.app/health
   ```

2. **Get All Students**

   ```bash
   curl https://student-api-rouge.vercel.app/students
   ```

3. **Create a Student**
   ```bash
   curl -X POST https://student-api-rouge.vercel.app/students \
     -H "Content-Type: application/json" \
     -d '{"id": 123, "name": "John Doe", "email": "john@example.com"}'
   ```

## 📋 Testing Requirements Document

Download the comprehensive testing requirements document to validate the API systematically:

```bash
curl https://student-api-rouge.vercel.app/docs/requirements > Student_API_Testing_Requirements.html
```

**What you'll get:**

- Complete endpoint specifications with expected behavior
- Comprehensive validation checklists
- Performance requirements and testing guidelines
- Professional testing methodology
- Systematic testing approach

**💡 Learning Path:** Master API consumption and quality assurance testing through thorough validation!

## 📚 API Reference

### GET /

Returns basic API information and status.

**Response (200 OK):**

```json
{
  "api": "Student API",
  "version": "1.0.0",
  "status": "operational"
}
```

### GET /health

Returns the health status of the API and system metrics.

**Response (200 OK):**

```json
{
  "status": "healthy",
  "timestamp": "2025-01-06T12:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "students": {
    "total": 39,
    "active": 39,
    "teams": 14
  }
}
```

### GET /students

Returns a list of all students in the system.

**Query Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `active` | boolean | Optional | Filter students by active status |

**Response (200 OK):**

```json
[
  {
    "id": 2420983,
    "name": "Mike Muyambango",
    "email": "mike-muyambango@school.edu",
    "role": "student",
    "enrolled_at": "2025-01-01",
    "active": true,
    "team": "Group 22",
    "github": "https://github.com/organizations/Software-Foundation-group-22/settings/profile"
  }
]
```

### POST /students

Creates a new student record in the system.

**Request Body:**

```json
{
  "id": 12345,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "student",
  "enrolled_at": "2025-01-01",
  "active": true,
  "team": "Team Alpha",
  "github": "https://github.com/johndoe"
}
```

**Response (201 Created):**

```json
{
  "id": 12345,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "student",
  "enrolled_at": "2025-01-01",
  "active": true,
  "team": "Team Alpha",
  "github": "https://github.com/johndoe"
}
```

### GET /students/{id}

Returns a specific student by their ID.

**Path Parameters:**
| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `id` | integer | Required | The unique identifier of the student |

**Response (200 OK):**

```json
{
  "id": 2420983,
  "name": "Mike Muyambango",
  "email": "mike-muyambango@school.edu",
  "role": "student",
  "enrolled_at": "2025-01-01",
  "active": true,
  "team": "Group 22",
  "github": "https://github.com/organizations/Software-Foundation-group-22/settings/profile"
}
```

## 🚨 Error Responses

### 400 Bad Request

```json
{
  "error": "Bad Request",
  "message": "Invalid request parameters or body"
}
```

### 404 Not Found

```json
{
  "error": "Not Found",
  "message": "The requested resource was not found"
}
```

### 409 Conflict

```json
{
  "error": "Conflict",
  "message": "Resource already exists"
}
```

### 500 Internal Server Error

```json
{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}
```

## 📊 Rate Limits

This API implements rate limiting to ensure fair usage:

- **1000 requests per 15 minutes** per IP address
- Rate limit headers are included in responses
- Health check endpoint is exempt from rate limiting

### 429 Too Many Requests

```json
{
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": "15 minutes"
}
```

## 🔗 SDKs & Libraries

Official SDKs and client libraries:

- **JavaScript/Node.js**: `npm install @student-api/sdk`
- **Python**: `pip install student-api`
- **Java**: Available on Maven Central
- **.NET**: Available via NuGet

## 🆘 Support

### Documentation

- [Getting Started Guide](#getting-started)
- [Complete API Reference](#api-reference)
- [Error Handling Guide](#error-responses)

### Community

- **GitHub Issues**: Report bugs and request features
- **Stack Overflow**: Ask questions with the `student-api` tag
- **Discord**: Join our developer community

### Contact

- **Email**: api-support@studentplatform.com
- **Status Page**: status.studentplatform.com

---

**Built with ❤️ for developers, by developers.**
