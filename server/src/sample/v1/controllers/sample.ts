import { ApiPath, ApiOperationGet, ApiOperationPost, SwaggerDefinitionConstant } from 'swagger-express-ts';

import { IRequest, IResponse, INext } from '~shared/shared.types';
import { NotFoundError, ConflictError } from '~shared/helpers/error';

import { ISample } from '../sample.types';

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
	public getAll(req: IRequest, res: IResponse, next: INext): IResponse | void {
		return res.status(200).json([{
			id: 1,
		}] as ISample[]);
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
	public getById(req: IRequest, res: IResponse, next: INext): IResponse | void {
		if (req.data.params.id !== 1) {
			return next(new NotFoundError());
		}

		return res.status(200).json({
			id: req.data.params.id,
		} as ISample);
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
	public create(req: IRequest, res: IResponse, next: INext): IResponse | void {
		if (req.data.body.id === 1) {
			return next(new ConflictError());
		}

		return res.status(201).json({
			id: req.data.body.id,
		} as ISample);
	}
}
