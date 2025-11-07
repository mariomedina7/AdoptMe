import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AdoptMe API',
      version: '1.0.0',
      description: 'API para la gestión de adopción de mascotas.',
    },
    servers: [
      {
        url: 'http://localhost:8085',
        description: 'Servidor local',
      },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: {
              type: 'string',
              example: '652a3d5baf8c2c0012e4f5a1',
            },
            first_name: {
              type: 'string',
              example: 'Mario',
            },
            last_name: {
              type: 'string',
              example: 'Medina',
            },
            email: {
              type: 'string',
              example: 'mario@example.com',
            },
            password: {
              type: 'string',
              example: '$2a$10$J9E6...',
            },
            role: {
              type: 'string',
              enum: ['user', 'admin'],
              example: 'user',
            },
            pets: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  _id: {
                    type: 'string',
                    example: '652a3d5baf8c2c0012e4f5a2',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [path.resolve("src/docs/**/*.yaml")]
};

const swaggerSpec = swaggerJSDoc(options);

export default (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};