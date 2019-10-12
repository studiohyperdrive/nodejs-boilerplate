import { Application } from 'express';
import { express as swaggerExpress, SwaggerDefinitionConstant } from 'swagger-express-ts';
import { serve as swaggerServe, setup as swaggerSetup } from 'swagger-ui-express';

import { default as config }  from '~config';
import { name, version } from '~pkg';
import { ISwaggerModels } from '~shared/shared.types';

export class SwaggerMiddleware {
	public static load(app: Application, models: ISwaggerModels): void {
		app.use(swaggerExpress({
			path: '/docs/json',
			definition: {
				models,
				info: {
					version,
					title: name,
				},
				host: config.server.host,
				responses: {
					500: {
						description: 'Internal Server Error',
						type: SwaggerDefinitionConstant.Response.Type.OBJECT,
						model: 'Error',
					},
				},
			},
		}));

		app.use('/docs', swaggerServe, swaggerSetup(
			null, // SwaggerDoc
			null, // SwaggerUiOptions
			null, // SwaggerOptions
			false, // Custom CSS
			false, // Custom favicon
			'/docs/json', // URL for swagger file
			name // Title for documentation page
		));
	}
}
