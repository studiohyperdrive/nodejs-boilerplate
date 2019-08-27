import { SwaggerDefinitionConstant } from 'swagger-express-ts';

import { ISwaggerModels } from '@shared/shared.types';

export const models: ISwaggerModels = {
	Error: {
		description: 'Error',
		properties: {
			host: {
				type: SwaggerDefinitionConstant.STRING,
				required: true,
				example: ['localhost'],
			},
			identifier: {
				type: SwaggerDefinitionConstant.STRING,
				required: true,
				format: 'uuid',
				example: ['005b3940-28f2-436e-b579-7ccca0ab7aec'],
			},
			timestamp: {
				type: SwaggerDefinitionConstant.STRING,
				required: true,
				format: 'date',
				example: ['2019-01-01T00:00:00.000Z'],
			},
			status: {
				type: SwaggerDefinitionConstant.NUMBER,
				required: true,
				example: [500],
			},
			name: {
				type: SwaggerDefinitionConstant.STRING,
				required: true,
				example: ['Error'],
			},
			message: {
				type: SwaggerDefinitionConstant.STRING,
				required: true,
				example: ['Something went wrong'],
			},
			details: {
				type: SwaggerDefinitionConstant.ARRAY,
				itemType: 'ErrorDetail',
				required: true,
				example: [[{ err: 'message' }]],
			},
			stack: {
				type: SwaggerDefinitionConstant.ARRAY,
				itemType: SwaggerDefinitionConstant.STRING,
				required: true,
				example: [['stack']],
			},
		},
	},
	ErrorDetail: {
		description: 'ErrorDetail',
		properties: {
			err: {
				type: SwaggerDefinitionConstant.STRING,
				required: true,
				example: ['message'],
			},
		},
	},
	Status: {
		description: 'Status',
		properties: {
			success: {
				type: SwaggerDefinitionConstant.BOOLEAN,
				required: true,
				example: [true],
			},
			version: {
				type: SwaggerDefinitionConstant.STRING,
				required: true,
				example: ['1.0.0'],
			},
		},
	},
};
