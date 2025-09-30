import type { FastifyInstance } from 'fastify';
// import { UserController } from '../src/controllers/userController.js';
// import { UserController }  from '../'
import * as UserController from "../controllers/userController.js";

async function userRoutes(fastify: FastifyInstance) {
  // Get all users
  fastify.get('/users', {
    schema: {
      tags: ['Users'],
      summary: 'Get all users',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              first_name: { type: 'string' },
              last_name: { type: 'string' },
              email: { type: 'string' },
              created_at: { type: 'string' },
              updated_at: { type: 'string' },
              addresses: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    pincode: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, UserController.getUsers);

  // Get user by ID
  fastify.get('/users/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Get user by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        200: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' },
            addresses: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  street: { type: 'string' },
                  city: { type: 'string' },
                  state: { type: 'string' },
                  pincode: { type: 'string' }
                }
              }
            }
          }
        },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, UserController.getUserById);

  // Create user
  fastify.post('/users', {
    schema: {
      tags: ['Users'],
      summary: 'Create a new user',
      body: {
        type: 'object',
        required: ['first_name', 'last_name', 'email'],
        properties: {
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string' }
        }
      },
      response: {
        201: {
          type: 'object',
          properties: {
            id: { type: 'number' },
            first_name: { type: 'string' },
            last_name: { type: 'string' },
            email: { type: 'string' },
            created_at: { type: 'string' },
            updated_at: { type: 'string' }
          }
        },
        400: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, UserController.createUser);

  // Update user
// Full update user (PUT) – saari fields deni hongi
fastify.put('/users/:id', {
  schema: {
    tags: ['Users'],
    summary: 'Update user by ID',
    params: {
      type: 'object',
      properties: {
        id: { type: 'number' }
      }
    },
    body: {
      type: 'object',
      properties: {
        first_name: { type: 'string' },
        last_name: { type: 'string' },
        email: { type: 'string' }
      }
    },
    response: {
      200: {
        type: 'object',
        properties: {
          id: { type: 'number' },
          first_name: { type: 'string' },
          last_name: { type: 'string' },
          email: { type: 'string' },
          created_at: { type: 'string' },
          updated_at: { type: 'string' }
        }
      },
      404: {
        type: 'object',
        properties: {
          error: { type: 'string' }
        }
      }
    }
  }
}, UserController.updateUser);


// Partial update user (PATCH) – sirf jo field bhejoge wahi update hogi
// fastify.patch('/users/:id', {
//   schema: {
//     tags: ['Users'],
//     summary: 'Partially update user by ID',
//     params: {
//       type: 'object',
//       properties: {
//         id: { type: 'number' }
//       }
//     },
//     body: {
//       type: 'object',
//       properties: {
//         first_name: { type: 'string' },
//         last_name: { type: 'string' },
//         email: { type: 'string' }
//       }
//     },
//     response: {
//       200: {
//         type: 'object',
//         properties: {
//           id: { type: 'number' },
//           first_name: { type: 'string' },
//           last_name: { type: 'string' },
//           email: { type: 'string' },
//           created_at: { type: 'string' },
//           updated_at: { type: 'string' }
//         }
//       },
//       404: {
//         type: 'object',
//         properties: {
//           error: { type: 'string' }
//         }
//       }
//     }
//   }
// }, UserController.updateUser);



  // Delete user
  fastify.delete('/users/:id', {
    schema: {
      tags: ['Users'],
      summary: 'Delete user by ID',
      params: {
        type: 'object',
        properties: {
          id: { type: 'number' }
        }
      },
      response: {
        204: { type: 'null' },
        404: {
          type: 'object',
          properties: {
            error: { type: 'string' }
          }
        }
      }
    }
  }, UserController.deleteUser);

  // Get users with addresses
  fastify.get('/users-with-addresses', {
    schema: {
      tags: ['Users'],
      summary: 'Get all users with their addresses',
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              first_name: { type: 'string' },
              last_name: { type: 'string' },
              email: { type: 'string' },
              addresses: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'number' },
                    street: { type: 'string' },
                    city: { type: 'string' },
                    state: { type: 'string' },
                    pincode: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, UserController.getUsersWithAddresses);
}

export default userRoutes;




