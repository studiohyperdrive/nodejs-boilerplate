import { Request, Response } from '@shared/shared.types';
import { version } from '@pkg';

export class StatusController {
	// Get status
	public static get(req: Request, res: Response): Response {
		return res.status(200).json({
			version,
			success: true,
		});
	}
}
