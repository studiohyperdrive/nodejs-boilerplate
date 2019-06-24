import { NotFoundError } from '@shared/helpers/error';
import { Request, Response } from '@shared/shared.types';

export class FallbackController {
	// Get fallback
	public static get(req: Request, res: Response): Response {
		throw new NotFoundError();
	}
}
