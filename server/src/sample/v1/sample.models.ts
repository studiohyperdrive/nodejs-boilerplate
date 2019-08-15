import { SwaggerDefinitionConstant } from 'swagger-express-ts';

import { ISwaggerModels } from '@shared/shared.types';

export const models: ISwaggerModels = {
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
