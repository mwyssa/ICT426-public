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
                "login":
                {
                    "type": "object",
                    "properties":
                    {
                        "email": { "type": "string", "example" : "user@example.com", "description" : "Adresse email de l'utilisateur" },
                        "password": { "type": "string", "example" : "password123", "description" : "Mot de passe de l'utilisateur" }
                    },
                    required: ['email', 'password']
                },

                "postAccount":
                {
                    "type": "object",
                    "properties":
                    {
                        "name": { "type": "string", "example" :"Raiffeisen Camille", "description" : "nom du compte"  },
                        "type" : { "type": "string", "example" :"Compte Courant", "description" : "type du compte"  },
                        "balance" : { "type": "number", "example" : 1000.50, "description" : "solde du compte"  },
                    },
                    required: ['name', 'type', 'balance']
                },

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