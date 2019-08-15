import { propOr } from 'ramda';

import { CustomError, BodyError, HeadersError, ParamsError, QueryError } from '@shared/helpers/error';
import { IRequest, IResponse, INext, ICustomError } from '@shared/shared.types';
import { ValidationError } from '@shared/helpers/validation/error';

export class ErrorMiddleware {
	public static handleError(err: string | Error | ICustomError | null | undefined, req: IRequest, res: IResponse, next: INext): IResponse | void {
		// Check if there is an error
		if (!err) {
			return next();
		}

		// Prevent sending multiple responses
		if (res.headersSent) {
			return next();
		}

		// Convert a string to an Error object
		if (typeof err === 'string') {
			err = new Error(err); // tslint:disable-line no-parameter-reassignment
		}

		// Convert a ValidationError object to a CustomError object
		if (err instanceof Error && err.name === 'ValidationError') {
			switch (err.message) {
				case 'body':
					err = new BodyError(err as ValidationError); // tslint:disable-line no-parameter-reassignment
					break;
				case 'headers':
					err = new HeadersError(err as ValidationError); // tslint:disable-line no-parameter-reassignment
					break;
				case 'params':
					err = new ParamsError(err as ValidationError); // tslint:disable-line no-parameter-reassignment
					break;
				case 'query':
					err = new QueryError(err as ValidationError); // tslint:disable-line no-parameter-reassignment
					break;
			}
		}

		// Convert an Error object to a CustomError object
		if (err instanceof Error) {
			err = new CustomError(err); // tslint:disable-line no-parameter-reassignment
		}

		return res.status((err as ICustomError).status).json({
			host: (err as ICustomError).host,
			identifier: (err as ICustomError).identifier,
			timestamp: (err as ICustomError).timestamp,
			status: (err as ICustomError).status,
			name: (err as ICustomError).name,
			message: (err as ICustomError).message,
			details: (err as ICustomError).details, // Optional
			stack: (propOr('', 'stack', err as ICustomError) as string).split(/\r?\n/), // Optional and only on local or test environment
		});
	}
}
