import { clone, curry } from 'ramda';

import { Request, Response, Next, ValidationOrigin, ValidationPreset } from '../shared.types';
import { ValidationError } from '../helpers/validation/error';
import { Validator } from '../helpers/validation';

export class DataMiddleware {
	public static validate = curry(DataMiddleware.runValidation);

	public static copy(req: Request, res: Response, next: Next): void {
		req.data = {
			body: clone(req.body),
			headers: clone(req.headers),
			params: clone(req.params),
			query: clone(req.query),
		};
		next();
	}

	private static runValidation(origin: ValidationOrigin, preset: ValidationPreset, req: Request, res: Response, next: Next): void {
		if (!req.data) {
			throw new ValidationError('The request data has not been cloned');
		}

		req.data[origin] = Validator.validate(req.data[origin], preset, origin);
		next();
	}
}
