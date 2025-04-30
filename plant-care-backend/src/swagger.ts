import swaggerJsdoc from 'swagger-jsdoc';
import path from 'path';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Plant Care API',
      version: '1.0.0',
      description: 'API for managing plants and monitoring their health',
    },
    servers: [
      {
        url: '/',
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Plant: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the plant',
            },
            type: {
              type: 'string',
              description: 'Type of the plant',
            },
            weeklyWaterNeed: {
              type: 'number',
              description: 'Weekly water need in liters',
            },
            expectedHumidity: {
              type: 'number',
              description: 'Expected humidity percentage',
            },
            location: {
              type: 'string',
              description: 'Location of the plant',
            },
            latitude: {
              type: 'number',
              description: 'Latitude of the plant location',
            },
            longitude: {
              type: 'number',
              description: 'Longitude of the plant location',
            },
          },
          required: ['name', 'type', 'weeklyWaterNeed', 'expectedHumidity'],
        },
      },
    },
  },
  apis: [path.join(__dirname, './routes/*.ts')], // Path to the API routes
};

export const swaggerSpec = swaggerJsdoc(options); 