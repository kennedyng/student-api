// routes/students.js - BEGINNER FRIENDLY API Routes
const express = require('express');
const router = express.Router();
const studentModel = require('../models/students');

// 🏠 ROOT ENDPOINT - WORKING: Returns API info
router.get('/', (req, res) => {
  res.json({
    api: "Student API",
    version: "1.0.0",
    description: "REST API for managing student records",
    endpoints: {
      "GET /": "API information",
      "GET /health": "Health check",
      "GET /docs": "API documentation",
      "GET /docs/requirements": "Download testing requirements",
      "GET /students": "List all students",
      "GET /students/:id": "Get student by ID",
      "POST /students": "Create new student",
      "PATCH /students/:id": "Update student",
      "DELETE /students/:id": "Delete student",
      "GET /students/paginated": "Paginated students list",
      "GET /search?q=name": "Search students by name"
    }
  });
});

// 💚 HEALTH CHECK - WORKING: Returns proper health status
router.get('/health', (req, res) => {
  const stats = studentModel.getStats();
  const uptime = process.uptime();

  const healthData = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: Math.round(uptime),
    version: '1.0.0',
    students: {
      total: stats.total,
      active: stats.active,
      teams: stats.teams
    },
    endpoints: {
      tested: 11,
      working: 8,
      bugs: 3
    }
  };
  res.json(healthData);
});

// API Requirements PDF endpoint
router.get('/docs/requirements', (req, res) => {
  const requirementsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student API Requirements & Validation Checklist</title>
    <style>
        body {
            font-family: 'Times New Roman', serif;
            margin: 40px;
            line-height: 1.6;
            color: #333;
            max-width: 900px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            color: #2c3e50;
        }
        .header .subtitle {
            font-size: 16px;
            color: #7f8c8d;
            margin-top: 5px;
        }
        .section {
            margin-bottom: 30px;
        }
        .section h2 {
            color: #2c3e50;
            border-left: 4px solid #3498db;
            padding-left: 15px;
            margin-bottom: 15px;
            font-size: 20px;
        }
        .endpoint {
            background: #f8f9fa;
            padding: 20px;
            margin: 15px 0;
            border-radius: 5px;
            border-left: 4px solid #3498db;
        }
        .endpoint-header {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
        }
        .method {
            background: #3498db;
            color: white;
            padding: 4px 8px;
            border-radius: 3px;
            font-weight: bold;
            margin-right: 10px;
            font-size: 12px;
        }
        .endpoint-url {
            font-family: 'Courier New', monospace;
            font-weight: bold;
            color: #2c3e50;
        }
        .requirements {
            margin: 10px 0;
        }
        .requirement {
            margin: 8px 0;
            padding: 8px;
            background: white;
            border-radius: 3px;
            border-left: 3px solid #27ae60;
        }
        .requirement-header {
            font-weight: bold;
            color: #27ae60;
        }
        .test-cases {
            margin: 10px 0;
        }
        .test-case {
            background: #ecf0f1;
            padding: 8px;
            margin: 5px 0;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
        }
        .validation-checklist {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
        }
        .checklist-item {
            margin: 8px 0;
            display: flex;
            align-items: flex-start;
        }
        .checklist-item input {
            margin-right: 10px;
            margin-top: 2px;
        }
        .error-responses {
            background: #fee;
            border: 1px solid #fcc;
            padding: 10px;
            border-radius: 3px;
            margin: 10px 0;
        }
        .success-responses {
            background: #efe;
            border: 1px solid #cfc;
            padding: 10px;
            border-radius: 3px;
            margin: 10px 0;
        }
        .code {
            font-family: 'Courier New', monospace;
            background: #f8f9fa;
            padding: 2px 4px;
            border-radius: 2px;
        }
        .note {
            background: #e8f4f8;
            border: 1px solid #bee5eb;
            padding: 10px;
            border-radius: 3px;
            margin: 10px 0;
        }
        @media print {
            body {
                margin: 20px;
                font-size: 11px;
                line-height: 1.4;
                color: #000;
            }
            .header {
                background: #fff !important;
                color: #000 !important;
                border-bottom: 2px solid #000;
                padding: 0.5rem 0;
            }
            .header h1 {
                font-size: 1.8rem;
                color: #000;
            }
            .subtitle { color: #333; }
            .section {
                margin: 0.8rem 0;
                page-break-inside: avoid;
            }
            .section h2 {
                font-size: 1.4rem;
                border-bottom: 1px solid #000;
                page-break-after: avoid;
            }
            .endpoint {
                page-break-inside: avoid;
                border: 1px solid #000;
                background: #fff !important;
            }
            .code-block {
                background: #f5f5f5 !important;
                border: 1px solid #ccc;
                font-size: 10px;
            }
            .checklist-item {
                page-break-inside: avoid;
            }
            .note, .alert {
                background: #f9f9f9 !important;
                border: 1px solid #ccc;
                page-break-inside: avoid;
            }
            button { display: none !important; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎓 Student API Testing Requirements</h1>
        <div class="subtitle">Comprehensive Validation Checklist & Bug Discovery Guide</div>
        <div class="subtitle">API Testing Lab | ${new Date().toLocaleDateString()}</div>
        <div style="text-align: center; margin-top: 1rem;">
            <button onclick="window.print()" style="background: #10b981; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; font-weight: 600; cursor: pointer; margin-right: 1rem;">
                🖨️ Print/Save as PDF
            </button>
            <span style="font-size: 0.9rem; color: rgba(255,255,255,0.8);">💡 Save this document for offline testing!</span>
        </div>
    </div>

    <div class="section">
        <h2>🎯 Testing Objectives & Approach</h2>
        <p>This document provides the official requirements for validating the Student Management API. Use it as your testing roadmap to systematically discover bugs, performance issues, and validation problems.</p>

        <div class="note">
            <strong>🎓 Learning Both Skills:</strong> This API teaches API usage AND testing. Use working endpoints (✅) to learn REST patterns, then discover bugs (🐛) through systematic testing.
        </div>

        <div class="alert">
            <div class="alert-title">📋 Step-by-Step Testing Process</div>
            <ol>
                <li><strong>Learn API Usage:</strong> Start with working endpoints to understand proper REST API patterns</li>
                <li><strong>Test Functionality:</strong> Verify each endpoint works as documented</li>
                <li><strong>Discover Bugs:</strong> Find discrepancies between expected vs actual behavior</li>
                <li><strong>Document Findings:</strong> Record what you expected vs what actually happened</li>
                <li><strong>Measure Performance:</strong> Time requests and identify slow endpoints</li>
            </ol>
        </div>

        <div class="note">
            <strong>🔍 How to Identify Bugs:</strong> Each test case clearly shows what SHOULD happen vs what ACTUALLY happens. When you see a difference, you've found a bug!
        </div>
    </div>

    <div class="section">
        <h2>🎯 API Endpoints & Requirements</h2>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">GET</span>
                <span class="endpoint-url">/</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return API information with status 200
                </div>
                <div class="success-responses">
                    <strong>Expected Response:</strong><br>
                    <code>{"api": "Student API"}</code>
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl -X GET https://student-api-rouge.vercel.app/</div>
                <div class="test-case">Verify response contains {"api": "Student API"}</div>
                <div class="test-case">Verify HTTP status is 200</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">GET</span>
                <span class="endpoint-url">/health</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return system health status with status 200
                </div>
                <div class="success-responses">
                    <strong>Expected Response Structure:</strong><br>
                    <code>{ "status": "healthy", "timestamp": "...", "uptime": number, "version": "1.0.0", "students": { "total": number, "active": number }, "endpoints": [...] }</code>
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl -X GET https://student-api-rouge.vercel.app/health</div>
                <div class="test-case">Verify status is "healthy"</div>
                <div class="test-case">Verify timestamp is valid ISO format</div>
                <div class="test-case">Verify uptime is a positive number</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">GET</span>
                <span class="endpoint-url">/students</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return array of all students with status 200
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should support <code>active</code> query parameter to filter by active status
                </div>
                <div class="success-responses">
                    <strong>Expected Response:</strong><br>
                    <code>[{ "id": number, "name": string, "email": string, "role": string, "enrolled_at": string, "active": boolean, "team": string, "github": string }, ...]</code>
                </div>
                <div class="note">
                    <strong>Query Parameters:</strong><br>
                    - <code>active=true</code> - Return only active students<br>
                    - <code>active=false</code> - Return only inactive students
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl https://student-api-rouge.vercel.app/students - Test basic functionality</div>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/students?active=true" - Test active filter</div>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/students?active=false" - Test inactive filter</div>
                <div class="test-case">Verify response structure and data accuracy</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">POST</span>
                <span class="endpoint-url">/students</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should create new student and return it with status 201
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should validate required fields (id, name, email)
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should reject duplicate student IDs with status 409
                </div>
                <div class="success-responses">
                    <strong>Expected Request Body:</strong><br>
                    <code>{ "id": number, "name": string, "email": string, "role": string, "enrolled_at": string, "active": boolean, "team": string, "github": string }</code>
                </div>
                <div class="success-responses">
                    <strong>Expected Response:</strong><br>
                    <code>{ "id": number, "name": string, "email": string, ... }</code>
                </div>
                <div class="error-responses">
                    <strong>Expected Error Responses:</strong><br>
                    <code>409 Conflict</code> - Student with this ID already exists
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl -X POST https://student-api-rouge.vercel.app/students -H "Content-Type: application/json" -d '{"id": 9999, "name": "Test Student", "email": "test@example.com"}' - Test student creation</div>
                <div class="test-case">curl -X POST https://student-api-rouge.vercel.app/students -H "Content-Type: application/json" -d '{"id": 9999, "name": "Duplicate", "email": "duplicate@test.com"}' - Test duplicate handling</div>
                <div class="test-case">curl -X POST https://student-api-rouge.vercel.app/students -H "Content-Type: application/json" -d '{}' - Test validation</div>
                <div class="test-case">Verify response codes and data validation</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">GET</span>
                <span class="endpoint-url">/students/{id}</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return specific student by ID with status 200
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should validate that ID is a valid number
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return 404 if student not found
                </div>
                <div class="success-responses">
                    <strong>Expected Response:</strong><br>
                    <code>{ "id": number, "name": string, "email": string, ... }</code>
                </div>
                <div class="error-responses">
                    <strong>Expected Error Responses:</strong><br>
                    <code>404 Not Found</code> - Student not found<br>
                    <code>400 Bad Request</code> - Invalid ID format
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl -X GET https://student-api-rouge.vercel.app/students/2420983</div>
                <div class="test-case">Test with existing student ID</div>
                <div class="test-case">Test with non-existent student ID (should return 404)</div>
                <div class="test-case">Test with invalid ID format (non-numeric)</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">PATCH</span>
                <span class="endpoint-url">/students/{id}</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should partially update student and return updated data with status 200
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should validate that ID is a valid number
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return 404 if student not found
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return 400 if request body is empty
                </div>
                <div class="success-responses">
                    <strong>Expected Request Body:</strong><br>
                    <code>{ "name": string } // or any valid field</code>
                </div>
                <div class="success-responses">
                    <strong>Expected Response:</strong><br>
                    <code>{ "id": number, "name": string, ... } // Updated student</code>
                </div>
                <div class="error-responses">
                    <strong>Expected Error Responses:</strong><br>
                    <code>404 Not Found</code> - Student not found<br>
                    <code>400 Bad Request</code> - Empty request body or invalid ID
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl -X PATCH {{BASE_URL}}/students/2420983 -H "Content-Type: application/json" -d '{"name": "Updated Name"}'</div>
                <div class="test-case">Test updating existing student</div>
                <div class="test-case">Test updating non-existent student (should return 404)</div>
                <div class="test-case">Test with empty request body (should return 400)</div>
                <div class="test-case">Test with invalid ID format</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">DELETE</span>
                <span class="endpoint-url">/students/{id}</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should delete student and return status 204
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should validate that ID is a valid number
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return 404 if student not found
                </div>
                <div class="error-responses">
                    <strong>Expected Error Responses:</strong><br>
                    <code>404 Not Found</code> - Student not found<br>
                    <code>400 Bad Request</code> - Invalid ID format
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl -X DELETE https://student-api-rouge.vercel.app/students/2420983 - Test student deletion</div>
                <div class="test-case">curl -X DELETE https://student-api-rouge.vercel.app/students/999999 - Test non-existent student</div>
                <div class="test-case">curl -X DELETE https://student-api-rouge.vercel.app/students/abc - Test invalid ID format</div>
                <div class="test-case">Verify response codes and error handling</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">GET</span>
                <span class="endpoint-url">/search</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should search students by name (case-insensitive) with status 200
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should require 'q' query parameter
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return 400 if 'q' parameter is missing
                </div>
                <div class="requirement">
                    <div class="requirement-header">⚡ Performance Requirement:</div>
                    <strong>Response time must be &lt; 500ms</strong> for all search queries
                </div>
                <div class="success-responses">
                    <strong>Expected Response:</strong><br>
                    <code>{ "results": [{ "id": number, "name": string, "email": string, ... }] }</code>
                </div>
                <div class="error-responses">
                    <strong>Expected Error Responses:</strong><br>
                    <code>400 Bad Request</code> - Missing 'q' parameter
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/search?q=john" - Test search functionality</div>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/search?q=mi" - Test partial matching</div>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/search" - Test missing parameter handling</div>
                <div class="test-case">Measure response time and performance</div>
            </div>
        </div>

        <div class="endpoint">
            <div class="endpoint-header">
                <span class="method">GET</span>
                <span class="endpoint-url">/students/paginated</span>
            </div>
            <div class="requirements">
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should return paginated students with status 200
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should support 'page' and 'size' query parameters
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should default to page=1, size=10
                </div>
                <div class="requirement">
                    <div class="requirement-header">✅ Requirement:</div>
                    Should validate page >= 1 and size between 1-100
                </div>
                <div class="success-responses">
                    <strong>Expected Response:</strong><br>
                    <code>{ "page": number, "size": number, "data": [...], "total": number }</code>
                </div>
            </div>
            <div class="test-cases">
                <strong>Test Cases:</strong>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/students/paginated" - Test default pagination</div>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/students/paginated?page=1&size=5" - Test custom pagination</div>
                <div class="test-case">curl "https://student-api-rouge.vercel.app/students/paginated?page=2&size=10" - Test page navigation</div>
                <div class="test-case">Verify pagination structure and data accuracy</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>📝 Validation Checklist</h2>
        <div class="validation-checklist">
            <strong>Use this checklist to systematically validate the API (including performance):</strong>

            <div class="checklist-item">
                <input type="checkbox"> GET /health - Health check functionality
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET / - API information endpoint
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /docs - API documentation access
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /students - List all students
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /students?active=true - Active student filtering
            </div>
            <div class="checklist-item">
                <input type="checkbox"> POST /students - Create new student
            </div>
            <div class="checklist-item">
                <input type="checkbox"> POST /students (duplicate ID) - Duplicate prevention
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /students/{id} - Get student by ID
            </div>
            <div class="checklist-item">
                <input type="checkbox"> PATCH /students/{id} - Update student
            </div>
            <div class="checklist-item">
                <input type="checkbox"> DELETE /students/{id} - Delete student
            </div>
            <div class="checklist-item">
                <input type="checkbox"> DELETE /students/{non-existent} - Delete error handling
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /search?q=name - Search functionality
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /search (performance) - Response time testing
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /students/paginated - Pagination functionality
            </div>
            <div class="checklist-item">
                <input type="checkbox"> GET /students/paginated (data/count) - Pagination accuracy
            </div>
        </div>
    </div>

    <div class="section">
        <h2>🧪 Testing Strategy</h2>
        <ol>
            <li><strong>Start with health checks:</strong> Verify API is running and accessible</li>
            <li><strong>Test read operations:</strong> GET endpoints (safe to test multiple times)</li>
            <li><strong>Test search and pagination:</strong> Query parameter functionality</li>
            <li><strong>Test write operations:</strong> POST, PATCH, DELETE (be careful with data)</li>
            <li><strong>Test error conditions:</strong> Invalid inputs, missing data, etc.</li>
            <li><strong>Document findings:</strong> Note any deviations from requirements</li>
        </ol>

        <h3>🎯 Learning Both API Usage & Testing</h3>
        <ol>
            <li><strong>Learn API usage first:</strong> Use working endpoints (✅) to understand REST patterns</li>
            <li><strong>Then find bugs:</strong> Test endpoints with bugs (🐛) and compare vs requirements</li>
            <li><strong>Document discrepancies:</strong> Note what you expect vs what you actually get</li>
            <li><strong>Practice systematic testing:</strong> Check status codes, response data, performance</li>
            <li><strong>Master both skills:</strong> API consumption + quality assurance testing</li>
        </ol>

        <div class="note">
            <strong>Balanced Learning Approach:</strong> This API is designed to teach both API usage and testing skills. Use working endpoints (✅) to learn REST API patterns, then discover bugs (🐛) through systematic testing.
        </div>
    </div>

    <div class="section">
        <h2>📊 Student Data Summary</h2>
        <p>The API contains student data from 14 different GitHub teams with the following characteristics:</p>
        <ul>
            <li><strong>Total Students:</strong> 39</li>
            <li><strong>Active Students:</strong> All students are initially active</li>
            <li><strong>Teams:</strong> 14 different team names</li>
            <li><strong>GitHub Organizations:</strong> Links to team repositories</li>
            <li><strong>Email Format:</strong> {name}@{school}.edu</li>
            <li><strong>ID Range:</strong> Various numeric IDs</li>
        </ul>
    </div>

    <div class="section">
        <h2>⚡ Performance Requirements</h2>
        <ul>
            <li><strong>Search Response Time:</strong> All search queries must respond in &lt; 500ms</li>
            <li><strong>General Response Time:</strong> All other endpoints should respond in &lt; 200ms</li>
            <li><strong>Concurrent Users:</strong> API must support 70+ simultaneous users</li>
            <li><strong>Memory Usage:</strong> Server should not exceed 100MB heap usage</li>
            <li><strong>Error Handling:</strong> No endpoint should cause server crashes</li>
        </ul>

        <h3>⚡ Performance Testing Focus</h3>
        <ul>
            <li><strong>Response Time Measurement:</strong> Use browser dev tools or curl timing</li>
            <li><strong>Load Testing:</strong> Test concurrent requests and system limits</li>
            <li><strong>Memory Monitoring:</strong> Check for memory leaks during testing</li>
            <li><strong>Error Recovery:</strong> Test system stability under error conditions</li>
        </ul>
    </div>

    <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; color: #666;">
        <p><strong>🎓 Student API Testing Requirements Document</strong></p>
        <p>Generated: ${new Date().toLocaleString()}</p>
        <p><strong>Master Both Skills:</strong> Learn API consumption and quality assurance testing through systematic validation.</p>
        <p><em>Test thoroughly and document your findings!</em></p>
    </div>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Disposition', 'attachment; filename="Student_API_Testing_Requirements.html"');
  res.send(requirementsHtml);
});

// Professional API Documentation
router.get('/docs', (req, res) => {
  const docsHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student API Documentation</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #1a202c;
            background-color: #f7fafc;
        }

        .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 3rem 0;
            text-align: center;
        }

        .header h1 {
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 0.5rem;
        }

        .header p {
            font-size: 1.2rem;
            opacity: 0.9;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }

        .nav {
            background: white;
            border-bottom: 1px solid #e2e8f0;
            padding: 1rem 0;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .nav-links {
            display: flex;
            gap: 2rem;
            flex-wrap: wrap;
        }

        .nav-link {
            color: #4a5568;
            text-decoration: none;
            font-weight: 500;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            transition: all 0.2s;
        }

        .nav-link:hover {
            background: #f7fafc;
            color: #2d3748;
        }

        .section {
            margin: 3rem 0;
        }

        .section h2 {
            font-size: 1.8rem;
            font-weight: 600;
            color: #1a202c;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid #e2e8f0;
        }

        .section h3 {
            font-size: 1.4rem;
            font-weight: 600;
            color: #2d3748;
            margin: 2rem 0 1rem 0;
        }

        .endpoint {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 1.5rem;
            margin: 1.5rem 0;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .endpoint-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
        }

        .method {
            background: #3182ce;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 4px;
            font-weight: 600;
            font-size: 0.75rem;
            margin-right: 1rem;
            letter-spacing: 0.05em;
        }

        .method.POST { background: #38a169; }
        .method.PUT { background: #d69e2e; }
        .method.DELETE { background: #e53e3e; }

        .endpoint-url {
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 1.1rem;
            font-weight: 600;
            color: #2d3748;
        }

        .endpoint-description {
            color: #4a5568;
            margin-bottom: 1rem;
            font-size: 1rem;
        }

        .code-block {
            background: #f7fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 1rem;
            margin: 1rem 0;
            font-family: 'SF Mono', Monaco, 'Cascadia Code', monospace;
            font-size: 0.9rem;
            overflow-x: auto;
        }

        .response-block {
            background: #c6f6d5;
            border: 1px solid #9ae6b4;
            border-radius: 6px;
            padding: 1rem;
            margin: 1rem 0;
        }

        .response-block.error {
            background: #fed7d7;
            border-color: #fca5a5;
        }

        .response-title {
            font-weight: 600;
            color: #22543d;
            margin-bottom: 0.5rem;
        }

        .response-block.error .response-title {
            color: #742a2a;
        }

        .params-table {
            width: 100%;
            border-collapse: collapse;
            margin: 1rem 0;
        }

        .params-table th,
        .params-table td {
            padding: 0.75rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }

        .params-table th {
            background: #f7fafc;
            font-weight: 600;
            color: #2d3748;
        }

        .badge {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 500;
        }

        .badge.required {
            background: #fed7d7;
            color: #c53030;
        }

        .badge.optional {
            background: #c6f6d5;
            color: #22543d;
        }

        .alert {
            background: #fff5f5;
            border: 1px solid #feb2b2;
            border-radius: 6px;
            padding: 1rem;
            margin: 1rem 0;
        }

        .alert-title {
            font-weight: 600;
            color: #c53030;
            margin-bottom: 0.5rem;
        }

        .getting-started {
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
        }

        .step {
            display: flex;
            align-items: flex-start;
            margin: 1rem 0;
        }

        .step-number {
            background: #3182ce;
            color: white;
            width: 2rem;
            height: 2rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            margin-right: 1rem;
            flex-shrink: 0;
        }

        .footer {
            background: #2d3748;
            color: white;
            padding: 2rem 0;
            text-align: center;
            margin-top: 4rem;
        }

        .footer p {
            opacity: 0.8;
        }

        @media (max-width: 768px) {
            .nav-container {
                flex-direction: column;
                gap: 1rem;
            }

            .nav-links {
                justify-content: center;
            }

            .container {
                padding: 0 1rem;
            }
        }
    </style>
</head>
<body>
    <header class="header">
        <div class="container">
            <h1>Student API</h1>
            <p>API Testing Lab - Discover bugs, performance issues, and testing fundamentals</p>
        </div>
    </header>

    <nav class="nav">
        <div class="container nav-container">
            <div class="nav-links">
                <a href="#getting-started" class="nav-link">Getting Started</a>
                <a href="#endpoints" class="nav-link">API Reference</a>
                <a href="#validation-requirements" class="nav-link">Requirements</a>
                <a href="#errors" class="nav-link">Errors</a>
            </div>
            <div>
                <span class="badge">Version 1.0.0</span>
            </div>
        </div>
    </nav>

    <div style="background: #f0f9ff; border-bottom: 1px solid #e0f2fe; padding: 1rem 0;">
        <div class="container" style="text-align: center;">
            <a href="/docs/requirements" style="display: inline-flex; align-items: center; gap: 0.5rem; background: #0ea5e9; color: white; padding: 0.75rem 1.5rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1rem; box-shadow: 0 2px 4px rgba(14, 165, 233, 0.2);">
                📥 Download Testing Requirements
                <span style="font-size: 0.8rem; opacity: 0.9;">(Complete validation guide)</span>
            </a>
        </div>
    </div>

    <div class="container">
        <div id="getting-started" class="section">
            <h2>🚀 Getting Started</h2>

            <div class="getting-started">
                <h3>Base URL</h3>
                <div class="code-block">https://student-api-rouge.vercel.app</div>
                <p><strong>🚀 Deployed API:</strong> The API is now live and ready for testing!</p>

                <h3>Quick Start</h3>
                <div class="step">
                    <div class="step-number">1</div>
                    <div>
                        <strong>Check API Status</strong><br>
                        <div class="code-block">curl https://student-api-rouge.vercel.app/health</div>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">2</div>
                    <div>
                        <strong>Get All Students</strong><br>
                        <div class="code-block">curl https://student-api-rouge.vercel.app/students</div>
                    </div>
                </div>

                <div class="step">
                    <div class="step-number">3</div>
                    <div>
                        <strong>Create a Student</strong><br>
                        <div class="code-block">curl -X POST https://student-api-rouge.vercel.app/students \\
  -H "Content-Type: application/json" \\
  -d '{"id": 123, "name": "John Doe", "email": "john@example.com"}'</div>
                    </div>
                </div>
            </div>
        </div>


        <div id="endpoints" class="section">
            <h2>📚 API Reference</h2>

            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method">GET</span>
                    <span class="endpoint-url">/</span>
                </div>
                <div class="endpoint-description">
                    Returns basic API information and status.
                </div>

                <h4>Response</h4>
                <div class="response-block">
                    <div class="response-title">200 OK</div>
                    <div class="code-block">{
  "api": "Student API",
  "version": "1.0.0",
  "status": "operational"
}</div>
                </div>
            </div>

            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method">GET</span>
                    <span class="endpoint-url">/health</span>
                </div>
                <div class="endpoint-description">
                    Returns the health status of the API and system metrics.
                </div>

                <h4>Response</h4>
                <div class="response-block">
                    <div class="response-title">200 OK</div>
                    <div class="code-block">{
  "status": "healthy",
  "timestamp": "2025-01-06T12:00:00.000Z",
  "uptime": 3600,
  "version": "1.0.0",
  "students": {
    "total": 39,
    "active": 39,
    "teams": 14
  }
}</div>
                </div>
            </div>

            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method">GET</span>
                    <span class="endpoint-url">/students</span>
                </div>
                <div class="endpoint-description">
                    Returns a list of all students in the system.
                </div>

                <h4>Query Parameters</h4>
                <table class="params-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>active</code></td>
                            <td>boolean</td>
                            <td><span class="badge optional">Optional</span></td>
                            <td>Filter students by active status</td>
                        </tr>
                    </tbody>
                </table>

                <h4>Response</h4>
                <div class="response-block">
                    <div class="response-title">200 OK</div>
                    <div class="code-block">[
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
]</div>
                </div>
            </div>

            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method">POST</span>
                    <span class="endpoint-url">/students</span>
                </div>
                <div class="endpoint-description">
                    Creates a new student record in the system.
                </div>

                <h4>Request Body</h4>
                <div class="code-block">{
  "id": 12345,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "student",
  "enrolled_at": "2025-01-01",
  "active": true,
  "team": "Team Alpha",
  "github": "https://github.com/johndoe"
}</div>

                <h4>Response</h4>
                <div class="response-block">
                    <div class="response-title">201 Created</div>
                    <div class="code-block">{
  "id": 12345,
  "name": "John Doe",
  "email": "john.doe@example.com",
  "role": "student",
  "enrolled_at": "2025-01-01",
  "active": true,
  "team": "Team Alpha",
  "github": "https://github.com/johndoe"
}</div>
                </div>
            </div>

            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method">GET</span>
                    <span class="endpoint-url">/students/{id}</span>
                </div>
                <div class="endpoint-description">
                    Returns a specific student by their ID.
                </div>

                <h4>Path Parameters</h4>
                <table class="params-table">
                    <thead>
                        <tr>
                            <th>Parameter</th>
                            <th>Type</th>
                            <th>Required</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><code>id</code></td>
                            <td>integer</td>
                            <td><span class="badge required">Required</span></td>
                            <td>The unique identifier of the student</td>
                        </tr>
                    </tbody>
                </table>

                <h4>Response</h4>
                <div class="response-block">
                    <div class="response-title">200 OK</div>
                    <div class="code-block">{
  "id": 2420983,
  "name": "Mike Muyambango",
  "email": "mike-muyambango@school.edu",
  "role": "student",
  "enrolled_at": "2025-01-01",
  "active": true,
  "team": "Group 22",
  "github": "https://github.com/organizations/Software-Foundation-group-22/settings/profile"
}</div>
                </div>
            </div>
        </div>

        <div id="errors" class="section">
            <h2>🚨 Error Responses</h2>

                <div class="endpoint">
                    <h3>🔍 Testing Guidelines</h3>

                    <div class="alert">
                        <div class="alert-title">🔍 Testing Challenge</div>
                        <p><strong>Systematically test each endpoint and document your findings:</strong></p>
                        <ul>
                            <li>Test all query parameters and edge cases</li>
                            <li>Verify response codes match expected behavior</li>
                            <li>Check data accuracy and validation</li>
                            <li>Measure response times and performance</li>
                            <li>Document any unexpected behavior you discover</li>
                        </ul>
                        <p><strong>💡 Tip:</strong> Compare actual responses against the documented requirements above</p>
                    </div>

                    <h4>Expected Error Responses:</h4>

                    <div class="response-block error">
                        <div class="response-title">400 Bad Request</div>
                        <div class="code-block">{
  "error": "Bad Request",
  "message": "Invalid request parameters or body"
}</div>
                    </div>

                    <div class="response-block error">
                        <div class="response-title">404 Not Found</div>
                        <div class="code-block">{
  "error": "Not Found",
  "message": "The requested resource was not found"
}</div>
                    </div>

                    <div class="response-block error">
                        <div class="response-title">409 Conflict</div>
                        <div class="code-block">{
  "error": "Conflict",
  "message": "Resource already exists"
}</div>
                    </div>

                    <div class="response-block error">
                        <div class="response-title">500 Internal Server Error</div>
                        <div class="code-block">{
  "error": "Internal Server Error",
  "message": "An unexpected error occurred"
}</div>
                    </div>
                </div>
        </div>

        <div class="section">
            <h2>📊 Rate Limits</h2>
            <p>This API implements rate limiting to ensure fair usage:</p>
            <ul>
                <li><strong>1000 requests per 15 minutes</strong> per IP address</li>
                <li>Rate limit headers are included in responses</li>
                <li>Health check endpoint is exempt from rate limiting</li>
            </ul>

            <div class="response-block error">
                <div class="response-title">429 Too Many Requests</div>
                <div class="code-block">{
  "error": "Too many requests from this IP, please try again later.",
  "retryAfter": "15 minutes"
}</div>
            </div>
        </div>

        <div class="section">
            <h2>🔗 SDKs & Libraries</h2>
            <p>Official SDKs and client libraries:</p>
            <ul>
                <li><strong>JavaScript/Node.js</strong>: <code>npm install @student-api/sdk</code></li>
                <li><strong>Python</strong>: <code>pip install student-api</code></li>
                <li><strong>Java</strong>: Available on Maven Central</li>
                <li><strong>.NET</strong>: Available via NuGet</li>
            </ul>
        </div>

        <div class="section">
            <h2>📋 Validation Requirements</h2>
            <p>Use the official requirements document to validate API functionality:</p>

            <div style="text-align: center; margin: 2rem 0; padding: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 12px; color: white;">
                <h3 style="margin-bottom: 1rem; font-size: 1.5rem;">📥 Download Testing Requirements</h3>
                <p style="margin-bottom: 1.5rem; opacity: 0.9;">Get the complete validation checklist and bug discovery guide</p>
                <a href="/docs/requirements" style="display: inline-block; background: white; color: #667eea; padding: 1rem 2rem; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 1.1rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
                    📥 Download Requirements Document
                </a>
                <p style="margin-top: 1rem; font-size: 0.9rem; opacity: 0.8;">
                    Downloads as: <code style="background: rgba(255,255,255,0.2); padding: 0.2rem 0.5rem; border-radius: 4px;">Student_API_Testing_Requirements.html</code>
                </p>
            </div>

            <div class="endpoint">
                <div class="endpoint-header">
                    <span class="method">GET</span>
                    <span class="endpoint-url">/docs/requirements</span>
                </div>
                <div class="endpoint-description">
                    Download the comprehensive API requirements and validation checklist.
                </div>
                <div class="code-block">curl https://student-api-rouge.vercel.app/docs/requirements</div>
                <p><strong>💡 Pro Tip:</strong> Save this document locally and use it to systematically test and validate the API against expected behavior.</p>
            </div>
        </div>

        <div class="section">
            <h2>🆘 Support</h2>
            <p>Need help? Here are your options:</p>

            <h3>Documentation</h3>
            <ul>
                <li><a href="#getting-started">Getting Started Guide</a></li>
                <li><a href="#endpoints">Complete API Reference</a></li>
                <li><a href="#validation-requirements">Validation Requirements</a></li>
                <li><a href="#errors">Error Handling Guide</a></li>
            </ul>

            <h3>Community</h3>
            <ul>
                <li><strong>GitHub Issues</strong>: Report bugs and request features</li>
                <li><strong>Stack Overflow</strong>: Ask questions with the <code>student-api</code> tag</li>
                <li><strong>Discord</strong>: Join our developer community</li>
            </ul>

            <h3>Contact</h3>
            <ul>
                <li><strong>Email</strong>: api-support@studentplatform.com</li>
                <li><strong>Status Page</strong>: status.studentplatform.com</li>
            </ul>
        </div>
    </div>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 Student Platform. All rights reserved.</p>
            <p>Built with ❤️ for developers, by developers.</p>
        </div>
    </footer>
</body>
</html>`;
  res.send(docsHtml);
});

// 1. MEDIUM – GET /students - BUG: Ignores active filter completely
router.get('/students', (req, res) => {
  const { active } = req.query;
  let students = studentModel.getAllStudents();

  // BUG: Active filter is completely ignored - always returns all students
  // Students will notice when they test ?active=true vs ?active=false
  // This teaches them about query parameter validation and filtering

  // Actually return students so students can learn API usage
  res.json(students);
});

// 2. EASY – GET /students/:id accepts string → 500
router.get('/students/:id', (req, res) => {
  const student = studentModel.getStudentById(req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.json(student);
});

// 3. MEDIUM – POST /students - BUG: Allows duplicate IDs and missing email
router.post('/students', (req, res) => {
  const { id, name, email } = req.body;

  // BUG: No validation - allows missing required fields
  if (!id || !name || !email) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'id, name, and email are required'
    });
  }

  // BUG: Allows duplicate student IDs - should return 409 Conflict
  const existingStudent = studentModel.getStudentById(id);
  if (existingStudent) {
    // This should return 409 but let's keep it as a bug for testing
    // Students will learn about duplicate prevention
  }

  const newStudent = {
    id: parseInt(id),
    name: name.trim(),
    email: email.toLowerCase(), // Normalize email
    role: req.body.role || 'student',
    enrolled_at: req.body.enrolled_at || new Date().toISOString().split('T')[0],
    active: req.body.active !== undefined ? req.body.active : true,
    team: req.body.team || 'Unassigned',
    github: req.body.github || ''
  };

  studentModel.addStudent(newStudent);
  res.status(201).json(newStudent);
});

// 5. MEDIUM – PATCH empty body → 400 (correct behavior)
router.patch('/students/:id', (req, res) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ error: 'Request body cannot be empty' });
  }

  const studentId = req.params.id;
  if (isNaN(studentId)) {
    return res.status(400).json({ error: 'Invalid student ID format' });
  }

  const updatedStudent = studentModel.updateStudent(studentId, req.body);
  if (!updatedStudent) {
    return res.status(404).json({ error: 'Student not found' });
  }

  res.json(updatedStudent);
});

// 6. MEDIUM – DELETE returns 204 even if not found (BUG)
router.delete('/students/:id', (req, res) => {
  const studentId = req.params.id;
  if (isNaN(studentId)) {
    return res.status(400).json({ error: 'Invalid student ID format' });
  }

  const deleted = studentModel.deleteStudent(studentId);
  // BUG: Always returns 204 even if student not found
  res.status(204).send();
});

// 7. HARD – Pagination returns full list + wrong total (BUGS)
router.get('/students/paginated', (req, res) => {
  const page = Math.max(1, parseInt(req.query.page) || 1);
  const size = Math.min(100, Math.max(1, parseInt(req.query.size) || 10));

  // BUG: Returns full list instead of paginated data
  const allStudents = studentModel.getAllStudents();
  const result = {
    page: page,
    size: size,
    data: allStudents, // BUG: Returns ALL students instead of paginated
    total: allStudents.length + 1 // BUG: Total count is off by one
  };

  res.json(result);
});

// 8. HARD – Search returns wrong field name + slow performance
router.get('/search', (req, res) => {
  const { q } = req.query;
  if (!q) {
    return res.status(400).json({ error: 'q parameter is required' });
  }

  const results = studentModel.searchStudents(q);

  // BUG: Artificial delay making search very slow (requirements specify < 500ms response time)
  setTimeout(() => {
    // BUG: Returns "results" field instead of "matches" (but still wrong according to docs)
    res.json({ results });
  }, 2500); // 2.5 second delay - much slower than requirement of < 500ms
});

module.exports = router;
