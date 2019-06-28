import { SwaggerDefinitionConstant } from 'swagger-express-ts';

import { SwaggerModels } from '@shared/shared.types';

export const models: SwaggerModels = {
	Sample: {
		description: 'Sample',
		properties: {
			id: {
				type: SwaggerDefinitionConstant.NUMBER,
				required: true,
				example: [1],
			},
		},
	},
};
