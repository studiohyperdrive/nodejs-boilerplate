import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant } from 'swagger-express-ts';

import { Request, Response } from '@shared/shared.types';
import { version } from '@pkg';

import { Status } from '../core.types';

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
	public get(req: Request, res: Response): Response {
		return res.status(200).json({
			version,
			success: true,
		} as Status);
	}
}
