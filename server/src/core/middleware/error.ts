import { CustomError, BodyError, HeadersError, ParamsError, QueryError } from '@shared/helpers/error';
import { Request, Response, Next } from '@shared/shared.types';
import { ValidationError } from '@shared/helpers/validation/error';

export class ErrorMiddleware {
	public static handleError(err: string | Error | CustomError | null | undefined, req: Request, res: Response, next: Next): Response | void {
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

		return res.status((err as CustomError).status).json({
			host: (err as CustomError).host,
			identifier: (err as CustomError).identifier,
			timestamp: (err as CustomError).timestamp,
			status: (err as CustomError).status,
			name: (err as CustomError).name,
			message: (err as CustomError).message,
			details: (err as CustomError).details, // Optional
			stack: ((err as CustomError).stack || '').split(/\r?\n/), // Optional and only on local or test environment
		});
	}
}
