import { default as uuid } from 'uuid';
import { pathOr } from 'ramda';
import { ValidationErrorItem } from 'joi';

import { default as config } from '@config';

import { CustomError as ICustomError, CustomErrorDetail as ICustomErrorDetail } from '../shared.types';
import { ValidationError } from './validation/error';

export class CustomError implements ICustomError {
	public details?: ICustomErrorDetail[];
	public host: string = config.server.host;
	public identifier: string = uuid();
	public message: string = 'Something went wrong';
	public name: string = 'Error';
	public stack?: string;
	public status: number = 500;
	public timestamp: string = new Date().toISOString();

	constructor(err?: Error) {
		Error.captureStackTrace(this, this.constructor);

		if (err) {
			this.message = err.message;
			this.name = err.name;
			this.stack = config.state.env === 'local' || config.state.env === 'test' ? err.stack : undefined;
		}
	}
}

export class CustomValidationError extends CustomError {
	public message: string = 'Invalid object';
	public name: string = 'Bad Request';
	public status: number = 400;

	constructor(err: ValidationError) {
		super();

		this.details = pathOr([], ['validation', 'details'], err).map((detail: ValidationErrorItem) => ({
			err: detail.message,
		}));
	}
}

export class BodyError extends CustomValidationError {
	public message: string = 'Invalid body';
}

export class HeadersError extends CustomValidationError {
	public message: string = 'Invalid headers';
}

export class ParamsError extends CustomValidationError {
	public message: string = 'Invalid params';
}

export class QueryError extends CustomValidationError {
	public message: string = 'Invalid query';
}

export class UnauthorizedError extends CustomError {
	public message: string = 'Missing authorization';
	public name: string = 'Unauthorized';
	public status: number = 401;
}

export class ForbiddenError extends CustomError {
	public message: string = 'Not allowed';
	public name: string = 'Forbidden';
	public status: number = 403;
}

export class NotFoundError extends CustomError {
	public message: string = 'Resource not found';
	public name: string = 'Not Found';
	public status: number = 404;
}

export class ConflictError extends CustomError {
	public message: string = 'The request could not be completed due to a conflict with the current state of the target resource';
	public name: string = 'Conflict';
	public status: number = 409;
}

export class InternalServerError extends CustomError {
	public message: string = 'Something went wrong';
	public name: string = 'Internal Server Error';
	public status: number = 500;
}
