import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.4',
        info: {
            title: 'Gestion de Budget API',
            description: 'API REST pour la gestion de budget.',
            version: '1.0.0',
        },
        servers : [
            {
                url : 'http://localhost:3000/',
            },
        ],
        "components":
        {
            "schemas":
            {
                "getFamilyMembers":
                {
                    "type": "object",
                    "properties":
                    {
                        "name": { "type": "string", "example" :"Camille", "description" : "prénom du membre de la famille"  },
                        "role" : { "type": "string", "example" :"admin", "description" : "rôle du membre de la famille"  },
                    },
                    required: ['name', 'role']
                },

                "postNewFamily":
                {
                    "type": "object",
                    "properties":
                    {
                        "familyName": { "type": "string", "example" :"Bachmann", "description" : "nom de la famille"  },
                    },
                    required: ['familyName']
                },

                "putFamilyName":
                {
                    "type": "object",
                    "properties":
                    {
                        "familyName": { "type": "string", "example" :"Bachmann", "description" : "nom de la famille"  },
                    },
                    required: ['familyName']
                }
            }
        }
    },
    apis: ['./server/routes/*.js'], // where to find information to generate documentation
};

const openApiSpecification = swaggerJsdoc(options);
export {openApiSpecification};