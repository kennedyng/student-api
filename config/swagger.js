// config/swagger.js - Swagger/OpenAPI configuration
const openapiSpec = {
  openapi: '3.0.3',
  info: {
    title: 'Student API',
    description: 'REST API for managing student records. Contains real data from 39 students across 14 teams (from GitHub Organization Assignment).',
    version: '1.1.0',
    contact: {
      name: 'API Testing Lab',
      email: 'lab@example.com'
    }
  },
  servers: [
    {
      url: 'http://localhost:3000',
      description: 'Local development server'
    }
  ],
  paths: {
    '/': {
      get: {
        summary: 'API root',
        responses: {
          '200': {
            description: 'Welcome message',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/RootResponse'
                }
              }
            }
          }
        }
      }
    },
    '/health': {
      get: {
        summary: 'Health check and system status',
        responses: {
          '200': {
            description: 'System health information',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/HealthResponse'
                }
              }
            }
          }
        }
      }
    },
    '/students': {
      get: {
        summary: 'List all students',
        parameters: [
          {
            name: 'active',
            in: 'query',
            schema: {
              type: 'boolean'
            },
            description: 'Filter by active status'
          }
        ],
        responses: {
          '200': {
            description: 'Array of all students',
            content: {
              'application/json': {
                schema: {
                  type: 'array',
                  items: {
                    $ref: '#/components/schemas/Student'
                  }
                },
                example: [
                  {
                    id: 2420983,
                    name: 'Mike Muyambango',
                    email: 'mike-muyambango@school.edu',
                    team: 'Group 22',
                    github: 'https://github.com/organizations/Software-Foundation-group-22/settings/profile'
                  }
                ]
              }
            }
          }
        }
      },
      post: {
        summary: 'Create a new student',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StudentCreate'
              }
            }
          }
        },
        responses: {
          '201': {
            description: 'Student created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student'
                }
              }
            }
          }
        }
      }
    },
    '/students/{id}': {
      get: {
        summary: 'Get student by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1
            }
          }
        ],
        responses: {
          '200': {
            description: 'Student found',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student'
                }
              }
            }
          },
          '404': {
            description: 'Student not found'
          }
        }
      },
      patch: {
        summary: 'Partially update a student',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1
            }
          }
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/StudentUpdate'
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'Student updated',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Student'
                }
              }
            }
          }
        }
      },
      delete: {
        summary: 'Delete a student',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              minimum: 1
            }
          }
        ],
        responses: {
          '204': {
            description: 'Student deleted successfully'
          }
        }
      }
    },
    '/search': {
      get: {
        summary: 'Search students by name',
        parameters: [
          {
            name: 'q',
            in: 'query',
            required: true,
            schema: {
              type: 'string',
              minLength: 1
            },
            example: 'phiri'
          }
        ],
        responses: {
          '200': {
            description: 'Search results',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    results: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/Student'
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/students/paginated': {
      get: {
        summary: 'Get paginated list of students',
        parameters: [
          {
            name: 'page',
            in: 'query',
            schema: {
              type: 'integer',
              minimum: 1,
              default: 1
            }
          },
          {
            name: 'size',
            in: 'query',
            schema: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 10
            }
          }
        ],
        responses: {
          '200': {
            description: 'Paginated response',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/PaginatedResponse'
                }
              }
            }
          }
        }
      }
    }
  },
  components: {
    schemas: {
      RootResponse: {
        type: 'object',
        properties: {
          api: {
            type: 'string',
            example: 'Student API'
          }
        }
      },
      HealthResponse: {
        type: 'object',
        properties: {
          status: {
            type: 'string',
            example: 'healthy'
          },
          timestamp: {
            type: 'string',
            format: 'date-time',
            example: '2025-11-06T12:00:00.000Z'
          },
          uptime: {
            type: 'number',
            example: 3600.5
          },
          version: {
            type: 'string',
            example: '1.0.0'
          },
          students: {
            type: 'object',
            properties: {
              total: {
                type: 'integer',
                example: 39
              },
              active: {
                type: 'integer',
                example: 39
              }
            }
          },
          endpoints: {
            type: 'array',
            items: {
              type: 'string'
            },
            example: [
              'GET /',
              'GET /health',
              'GET /docs',
              'GET /students',
              'POST /students'
            ]
          }
        }
      },
      Student: {
        type: 'object',
        required: ['id', 'name', 'email'],
        properties: {
          id: {
            type: 'integer',
            minimum: 1,
            example: 2420983
          },
          name: {
            type: 'string',
            minLength: 1,
            example: 'Mike Muyambango'
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'mike-muyambango@school.edu'
          },
          role: {
            type: 'string',
            enum: ['student', 'teacher', 'admin'],
            default: 'student'
          },
          enrolled_at: {
            type: 'string',
            format: 'date',
            example: '2025-01-01'
          },
          active: {
            type: 'boolean',
            default: true
          },
          team: {
            type: 'string',
            example: 'Group 22',
            description: 'Team name from GitHub assignment'
          },
          github: {
            type: 'string',
            format: 'uri',
            example: 'https://github.com/organizations/Software-Foundation-group-22/settings/profile',
            description: 'Team GitHub organization link'
          }
        }
      },
      StudentCreate: {
        allOf: [
          {
            $ref: '#/components/schemas/Student'
          }
        ],
        description: 'Full student object required on create'
      },
      StudentUpdate: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
            minLength: 1
          },
          email: {
            type: 'string',
            format: 'email'
          },
          active: {
            type: 'boolean'
          }
        }
      },
      PaginatedResponse: {
        type: 'object',
        properties: {
          page: {
            type: 'integer',
            example: 1
          },
          size: {
            type: 'integer',
            example: 10
          },
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Student'
            }
          },
          total: {
            type: 'integer',
            example: 39,
            description: 'Total number of students'
          }
        }
      }
    }
  }
};

module.exports = {
  openapiSpec
};
