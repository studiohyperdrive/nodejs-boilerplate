import { default as config } from '@config';
import { ValidationError as JoiValidationError } from 'joi';

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
import { ValidationError } from './validation/error';

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

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(CustomError);
		expect(err.details).toBeUndefined();
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Something went wrong');
		expect(err.name).toEqual('Error');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(500);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a CustomError based on another error', (done) => {
		const err: CustomError = new CustomError(new TypeError('Invalid type'));

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(CustomError);
		expect(err.details).toBeUndefined();
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Invalid type');
		expect(err.name).toEqual('TypeError');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(500);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a default CustomValidationError', (done) => {
		const err: CustomValidationError = new CustomValidationError(new ValidationError('Validation failed', validation as JoiValidationError));

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(CustomValidationError);
		expect(err.details).toBeArrayOfSize(1);
		expect(err.details).toEqual([{
			err: 'message',
		}]);
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Invalid object');
		expect(err.name).toEqual('Bad Request');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(400);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a BodyError', (done) => {
		const err: BodyError = new BodyError(new ValidationError('body', validation as JoiValidationError));

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(BodyError);
		expect(err.details).toBeArrayOfSize(1);
		expect(err.details).toEqual([{
			err: 'message',
		}]);
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Invalid body');
		expect(err.name).toEqual('Bad Request');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(400);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a HeadersError', (done) => {
		const err: HeadersError = new HeadersError(new ValidationError('header', validation as JoiValidationError));

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(HeadersError);
		expect(err.details).toBeArrayOfSize(1);
		expect(err.details).toEqual([{
			err: 'message',
		}]);
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Invalid headers');
		expect(err.name).toEqual('Bad Request');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(400);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a ParamsError', (done) => {
		const err: ParamsError = new ParamsError(new ValidationError('params', validation as JoiValidationError));

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(ParamsError);
		expect(err.details).toBeArrayOfSize(1);
		expect(err.details).toEqual([{
			err: 'message',
		}]);
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Invalid params');
		expect(err.name).toEqual('Bad Request');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(400);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a QueryError', (done) => {
		const err: QueryError = new QueryError(new ValidationError('query', validation as JoiValidationError));

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(QueryError);
		expect(err.details).toBeArrayOfSize(1);
		expect(err.details).toEqual([{
			err: 'message',
		}]);
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Invalid query');
		expect(err.name).toEqual('Bad Request');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(400);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a UnauthorizedError', (done) => {
		const err: UnauthorizedError = new UnauthorizedError();

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(UnauthorizedError);
		expect(err.details).toBeUndefined();
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Missing authorization');
		expect(err.name).toEqual('Unauthorized');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(401);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a ForbiddenError', (done) => {
		const err: ForbiddenError = new ForbiddenError();

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(ForbiddenError);
		expect(err.details).toBeUndefined();
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Not allowed');
		expect(err.name).toEqual('Forbidden');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(403);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a NotFoundError', (done) => {
		const err: NotFoundError = new NotFoundError();

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(NotFoundError);
		expect(err.details).toBeUndefined();
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Resource not found');
		expect(err.name).toEqual('Not Found');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(404);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a ConflictError', (done) => {
		const err: ConflictError = new ConflictError();

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(ConflictError);
		expect(err.details).toBeUndefined();
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('The request could not be completed due to a conflict with the current state of the target resource');
		expect(err.name).toEqual('Conflict');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(409);
		expect(err.timestamp).toBeString();
		done();
	});

	it('Should return a InternalServerError', (done) => {
		const err: InternalServerError = new InternalServerError();

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(InternalServerError);
		expect(err.details).toBeUndefined();
		expect(err.host).toEqual(config.server.host);
		expect(err.identifier).toBeString();
		expect(err.message).toEqual('Something went wrong');
		expect(err.name).toEqual('Internal Server Error');
		expect(err.stack).toBeString();
		expect(err.status).toEqual(500);
		expect(err.timestamp).toBeString();
		done();
	});
});
