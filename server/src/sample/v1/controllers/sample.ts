import { NotFoundError, ConflictError } from '@shared/helpers/error';
import { Request, Response } from '@shared/shared.types';

export class SampleController {
	// Get all samples
	public static getAll(req: Request, res: Response): Response {
		return res.status(200).json([{
			id: 1,
		}]);
	}

	// Get sample by id
	public static getById(req: Request, res: Response): Response {
		if (req.data.params.id !== 1) {
			throw new NotFoundError();
		}

		return res.status(200).json({
			id: req.data.params.id,
		});
	}

	// Create sample
	public static create(req: Request, res: Response): Response {
		if (req.data.body.id === 1) {
			throw new ConflictError();
		}

		return res.status(201).json({
			id: req.data.body.id,
		});
	}
}
