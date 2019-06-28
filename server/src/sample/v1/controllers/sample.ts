import { ApiPath, ApiOperationGet, ApiOperationPost, SwaggerDefinitionConstant } from 'swagger-express-ts';

import { NotFoundError, ConflictError } from '@shared/helpers/error';
import { Request, Response } from '@shared/shared.types';

import { Sample } from '../sample.types';

@ApiPath({
	name: 'Sample',
	path: '/v1/samples',
})
export class SampleController {
	@ApiOperationGet({
		description: 'Get samples',
		summary: 'Get all samples',
		responses: {
			200: {
				description: 'OK',
				type: SwaggerDefinitionConstant.Response.Type.ARRAY,
				model: 'Sample',
			},
			404: {
				description: 'Not Found',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Error',
			},
		},
	})
	public getAll(req: Request, res: Response): Response {
		return res.status(200).json([{
			id: 1,
		}] as Sample[]);
	}

	@ApiOperationGet({
		path: '/{id}',
		description: 'Get sample',
		summary: 'Get sample by id',
		parameters: {
			path: {
				id: {
					description: 'id',
					required: true,
					type: SwaggerDefinitionConstant.Response.Type.NUMBER,
				},
			},
		},
		responses: {
			200: {
				description: 'OK',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Sample',
			},
			404: {
				description: 'Not Found',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Error',
			},
		},
	})
	public getById(req: Request, res: Response): Response {
		if (req.data.params.id !== 1) {
			throw new NotFoundError();
		}

		return res.status(200).json({
			id: req.data.params.id,
		} as Sample);
	}

	@ApiOperationPost({
		description: 'Create sample',
		summary: 'Create sample',
		parameters: {
			body: {
				description: 'Sample',
				required: true,
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Sample',
			},
		},
		responses: {
			200: {
				description: 'OK',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Sample',
			},
			400: {
				description: 'Bad Request',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Error',
			},
			409: {
				description: 'Conflict',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Error',
			},
		},
	})
	public create(req: Request, res: Response): Response {
		if (req.data.body.id === 1) {
			throw new ConflictError();
		}

		return res.status(201).json({
			id: req.data.body.id,
		} as Sample);
	}
}
