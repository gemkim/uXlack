import path from 'path'

import swaggerJsdoc from 'swagger-jsdoc'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'uXlack API 명세서',
      version: '1.0.0',
      description: 'uXlack API 명세서'
    },
    servers: [
      {
        url: 'http://localhost:4000',
        description: '서버'
      }
    ]
  },
  apis: [path.join(process.cwd(), 'backend/routes/*.js')]
}

const swaggerSpec = swaggerJsdoc(options)

export default swaggerSpec
