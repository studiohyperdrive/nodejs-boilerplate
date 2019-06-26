import { ValidationError as JoiValidationError } from 'joi';

import { Config } from '@config/config.types';
import { default as config } from '@config';

import {
	CustomError,
	CustomValidationError,
	BodyError,
	HeadersError,
	ParamsError,
	QueryError,
	UnauthorizedError,
	ForbiddenError,
	NotFoundError,
	ConflictError,
	InternalServerError,
} from './error';
import { CustomErrorDetail } from '../shared.types';
import { ValidationError } from './validation/error';

const cfg: Config = config();

const validateError = <T>(err: CustomError, type: T, status: number, name: string, message: string, details?: CustomErrorDetail[]): void => {
	expect(err).toBeDefined();
	expect(err).toBeInstanceOf(type);
	expect(err.host).toEqual(cfg.server.host);
	expect(err.identifier).toBeString();
	expect(err.message).toEqual(message);
	expect(err.name).toEqual(name);
	expect(err.stack).toBeString();
	expect(err.status).toEqual(status);
	expect(err.timestamp).toBeString();

	if (details) {
		expect(err.details).toEqual(details);
	} else {
		expect(err.details).toBeUndefined();
	}
};

describe('[UNIT - SHARED] Errors', () => {
	const validation: any = { // tslint:disable-line no-any
		details: [{
			message: 'message',
			type: 'type',
			path: ['path'],
		}],
	};

	it('Should return a default CustomError', (done) => {
		const err: CustomError = new CustomError();

		validateError(err, CustomError, 500, 'Error', 'Something went wrong');
		done();
	});

	it('Should return a CustomError based on another error', (done) => {
		const err: CustomError = new CustomError(new TypeError('Invalid type'));

		validateError(err, CustomError, 500, 'TypeError', 'Invalid type');
		done();
	});

	it('Should return a default CustomValidationError', (done) => {
		const err: CustomValidationError = new CustomValidationError(new ValidationError('Validation failed', validation as JoiValidationError));

		validateError(err, CustomValidationError, 400, 'Bad Request', 'Invalid object', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a BodyError', (done) => {
		const err: BodyError = new BodyError(new ValidationError('body', validation as JoiValidationError));

		validateError(err, BodyError, 400, 'Bad Request', 'Invalid body', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a HeadersError', (done) => {
		const err: HeadersError = new HeadersError(new ValidationError('headers', validation as JoiValidationError));

		validateError(err, HeadersError, 400, 'Bad Request', 'Invalid headers', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a ParamsError', (done) => {
		const err: ParamsError = new ParamsError(new ValidationError('params', validation as JoiValidationError));

		validateError(err, ParamsError, 400, 'Bad Request', 'Invalid params', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a QueryError', (done) => {
		const err: QueryError = new QueryError(new ValidationError('query', validation as JoiValidationError));

		validateError(err, QueryError, 400, 'Bad Request', 'Invalid query', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a UnauthorizedError', (done) => {
		const err: UnauthorizedError = new UnauthorizedError();

		validateError(err, UnauthorizedError, 401, 'Unauthorized', 'Missing authorization');
		done();
	});

	it('Should return a ForbiddenError', (done) => {
		const err: ForbiddenError = new ForbiddenError();

		validateError(err, ForbiddenError, 403, 'Forbidden', 'Not allowed');
		done();
	});

	it('Should return a NotFoundError', (done) => {
		const err: NotFoundError = new NotFoundError();

		validateError(err, NotFoundError, 404, 'Not Found', 'Resource not found');
		done();
	});

	it('Should return a ConflictError', (done) => {
		const err: ConflictError = new ConflictError();

		validateError(err, ConflictError, 409, 'Conflict', 'The request could not be completed due to a conflict with the current state of the target resource');
		done();
	});

	it('Should return a InternalServerError', (done) => {
		const err: InternalServerError = new InternalServerError();

		validateError(err, InternalServerError, 500, 'Internal Server Error', 'Something went wrong');
		done();
	});
});
