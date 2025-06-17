import swaggerJSDoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API - Aula',
            version: '1.0.0',
            description: 'Documentação da API com autenticação JWT',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                UserInput: {
                    type: 'object',
                    required: ['nome', 'email', 'senha'],
                    properties: {
                        nome: {
                            type: 'string',
                            description: 'Nome do usuário',
                            example: 'Alan Jones'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário',
                            example: 'jones.jr@example.com'
                        },
                        senha: {
                            type: 'string',
                            minLength: 6,
                            description: 'Senha do usuário',
                            example: 'password123'
                        }
                    }
                },
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'ID único do usuário (MongoDB ObjectId)',
                            example: '60f7b3b3b3b3b3b3b3b3b3b3'
                        },
                        nome: {
                            type: 'string',
                            description: 'Nome do usuário',
                            example: 'Alan Jones'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email do usuário',
                            example: 'jones.jr@example.com'
                        },
                        createdAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de criação do usuário'
                        },
                        updatedAt: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Data de última atualização do usuário'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Mensagem de erro',
                            example: 'Erro interno do servidor'
                        },
                        error: {
                            type: 'string',
                            description: 'Tipo do erro',
                            example: 'ValidationError'
                        }
                    }
                }
            }
        },
        security: [{ bearerAuth: [] }],
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;