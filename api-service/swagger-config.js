require('dotenv').config();
const swaggerAutogen = require('swagger-autogen')();

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/auth.js', './src/routes/stock.js'];

const doc = {
	info: {
		title: 'API',
		description: 'API documentation for API service',
		version: '1.0.0',
	},
	host: process.env.API_URL,
	basePath: '/',
	components: {
		securitySchemes: {
			bearerAuth: {
				type: 'http',
				scheme: 'bearer',
				bearerFormat: 'JWT'
			}
		},
		security: [
			{
				bearerAuth: []
			}
		]
	}
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
	console.log('Swagger documentation generated successfully');
}).catch((err) => {
	console.error('Error generating Swagger documentation', err);
});
