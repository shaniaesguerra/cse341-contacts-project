const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'CSE 341: Week 02 Contacts Project'
    },
    host: 'localhost:3000',
    schemes: ['http', 'https']
};

const outpuFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//Generate Swagger.json
swaggerAutogen(outpuFile, endpointsFiles, doc);