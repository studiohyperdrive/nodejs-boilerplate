import { ValidationErrorItem } from '@hapi/joi';
import { pathOr } from 'ramda';
import { default as uuid } from 'uuid';

import { default as config } from '~config';
import { Envs } from '~config/config.types';

import { ICustomError, ICustomErrorDetail, IValidationError } from '../shared.types';

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
			/* istanbul ignore next */
			this.stack = [Envs.local, Envs.test].includes(config.state.env) ? err.stack : undefined;
		}
	}
}

export class CustomValidationError extends CustomError {
	public message: string = 'Invalid object';
	public name: string = 'Bad Request';
	public status: number = 400;

	constructor(err: IValidationError) {
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
