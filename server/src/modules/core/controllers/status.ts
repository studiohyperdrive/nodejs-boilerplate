import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant } from 'swagger-express-ts';

import { IRequest, IResponse, INext } from '@shared/shared.types';
import { version } from '@pkg';

import { IStatus } from '../core.types';

@ApiPath({
	name: 'status',
	path: '/status',
})
export class StatusController {
	@ApiOperationGet({
		description: 'Get status',
		summary: 'Get server status',
		responses: {
			200: {
				description: 'OK',
				type: SwaggerDefinitionConstant.Response.Type.OBJECT,
				model: 'Status',
			},
		},
	})
	public get(req: IRequest, res: IResponse, next: INext): IResponse | void {
		return res.status(200).json({
			version,
			success: true,
		} as IStatus);
	}
}
