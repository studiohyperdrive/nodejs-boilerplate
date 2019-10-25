import { clone, curry } from 'ramda';

import { Validator } from '../helpers/validation';
import { ValidationError } from '../helpers/validation/error';
import { INext, IRequest, IResponse, IValidationOrigin, IValidationPreset } from '../shared.types';

export class DataMiddleware {
	public static validate = curry(DataMiddleware.runValidation);

	public static copy(req: IRequest, res: IResponse, next: INext): void {
		req.data = {
			body: clone(req.body),
			headers: clone(req.headers),
			params: clone(req.params),
			query: clone(req.query),
		};
		next();
	}

	private static runValidation(origin: IValidationOrigin, preset: IValidationPreset, req: IRequest, res: IResponse, next: INext): void {
		if (!req.data) {
			throw new ValidationError('The request data has not been cloned');
		}

		req.data[origin] = Validator.validate(req.data[origin], preset, origin);
		next();
	}
}
