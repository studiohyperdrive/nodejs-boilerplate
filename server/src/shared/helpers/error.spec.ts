import { ValidationError as JoiValidationError } from 'joi';

import { validateError } from '@test/helpers/error';

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
import {
	ICustomError,
	ICustomValidationError,
	IBodyError,
	IHeadersError,
	IParamsError,
	IQueryError,
	IUnauthorizedError,
	IForbiddenError,
	INotFoundError,
	IConflictError,
	IInternalServerError,
} from '../shared.types';
import { ValidationError } from './validation/error';

describe('[UNIT - SHARED] Errors', () => {
	const validation: any = { // tslint:disable-line no-any
		details: [{
			message: 'message',
			type: 'type',
			path: ['path'],
		}],
	};

	it('Should return a default CustomError', (done: jest.DoneCallback) => {
		const err: ICustomError = new CustomError();

		validateError(err, CustomError, 500, 'Error', 'Something went wrong');
		done();
	});

	it('Should return a CustomError based on another error', (done: jest.DoneCallback) => {
		const err: ICustomError = new CustomError(new TypeError('Invalid type'));

		validateError(err, CustomError, 500, 'TypeError', 'Invalid type');
		done();
	});

	it('Should return a default CustomValidationError', (done: jest.DoneCallback) => {
		const err: ICustomValidationError = new CustomValidationError(new ValidationError('Validation failed', validation as JoiValidationError));

		validateError(err, CustomValidationError, 400, 'Bad Request', 'Invalid object', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a BodyError', (done: jest.DoneCallback) => {
		const err: IBodyError = new BodyError(new ValidationError('body', validation as JoiValidationError));

		validateError(err, BodyError, 400, 'Bad Request', 'Invalid body', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a HeadersError', (done: jest.DoneCallback) => {
		const err: IHeadersError = new HeadersError(new ValidationError('headers', validation as JoiValidationError));

		validateError(err, HeadersError, 400, 'Bad Request', 'Invalid headers', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a ParamsError', (done: jest.DoneCallback) => {
		const err: IParamsError = new ParamsError(new ValidationError('params', validation as JoiValidationError));

		validateError(err, ParamsError, 400, 'Bad Request', 'Invalid params', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a QueryError', (done: jest.DoneCallback) => {
		const err: IQueryError = new QueryError(new ValidationError('query', validation as JoiValidationError));

		validateError(err, QueryError, 400, 'Bad Request', 'Invalid query', [{
			err: 'message',
		}]);
		done();
	});

	it('Should return a UnauthorizedError', (done: jest.DoneCallback) => {
		const err: IUnauthorizedError = new UnauthorizedError();

		validateError(err, UnauthorizedError, 401, 'Unauthorized', 'Missing authorization');
		done();
	});

	it('Should return a ForbiddenError', (done: jest.DoneCallback) => {
		const err: IForbiddenError = new ForbiddenError();

		validateError(err, ForbiddenError, 403, 'Forbidden', 'Not allowed');
		done();
	});

	it('Should return a NotFoundError', (done: jest.DoneCallback) => {
		const err: INotFoundError = new NotFoundError();

		validateError(err, NotFoundError, 404, 'Not Found', 'Resource not found');
		done();
	});

	it('Should return a ConflictError', (done: jest.DoneCallback) => {
		const err: IConflictError = new ConflictError();

		validateError(err, ConflictError, 409, 'Conflict', 'The request could not be completed due to a conflict with the current state of the target resource');
		done();
	});

	it('Should return a InternalServerError', (done: jest.DoneCallback) => {
		const err: IInternalServerError = new InternalServerError();

		validateError(err, InternalServerError, 500, 'Internal Server Error', 'Something went wrong');
		done();
	});
});
