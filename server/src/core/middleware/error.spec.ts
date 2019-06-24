import { mockReq, mockRes } from 'sinon-express-mock';

import { default as config } from '@config';

import { CustomError, BodyError, HeadersError, ParamsError } from '../../shared/helpers/error';
import { ErrorMiddleware } from './error';
import { Request, Response, QueryError } from '../../shared/shared.types';
import { ValidationError } from '../../shared/helpers/validation/error';

describe.only('[UNIT - CORE] ErrorMiddleware', () => {
	const validation: any = { // tslint:disable-line no-any
		details: [{
			message: 'message',
			type: 'type',
			path: ['path'],
		}],
	};

	it('Should progress if there is no error', (done) => {
		const req: Request = mockReq();
		const res: Response = mockRes();

		ErrorMiddleware.handleError(null, req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should progress if a response is already sent', (done) => {
		const req: Request = mockReq();
		const res: Response = mockRes();
		res.headersSent = true;

		ErrorMiddleware.handleError(new CustomError(), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert a string error to a CustomError and return it', (done) => {
		const req: Request = mockReq();
		const res: Response = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(500);

				return {
					json: (body: CustomError) => {
						expect(body).toBeObject();
						expect(body).toContainAllKeys([
							'host',
							'identifier',
							'timestamp',
							'status',
							'name',
							'message',
							'details',
							'stack',
						]);
						expect(body.host).toEqual(config.server.host);
						expect(body.identifier).toBeString();
						expect(body.timestamp).toBeString();
						expect(body.status).toEqual(500);
						expect(body.name).toEqual('Error');
						expect(body.message).toEqual('error');
						expect(body.details).toBeUndefined();
						expect(body.stack).toBeArray();
						done();
					},
				};
			},
		}) as Response;

		ErrorMiddleware.handleError('error', req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an Error object error to a CustomError and return it', (done) => {
		const req: Request = mockReq();
		const res: Response = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(500);

				return {
					json: (body: CustomError) => {
						expect(body).toBeObject();
						expect(body).toContainAllKeys([
							'host',
							'identifier',
							'timestamp',
							'status',
							'name',
							'message',
							'details',
							'stack',
						]);
						expect(body.host).toEqual(config.server.host);
						expect(body.identifier).toBeString();
						expect(body.timestamp).toBeString();
						expect(body.status).toEqual(500);
						expect(body.name).toEqual('Error');
						expect(body.message).toEqual('error');
						expect(body.details).toBeUndefined();
						expect(body.stack).toBeArray();
						done();
					},
				};
			},
		}) as Response;

		ErrorMiddleware.handleError(new Error('error'), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object body error to a BodyError and return it', (done) => {
		const req: Request = mockReq();
		const res: Response = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: BodyError) => {
						expect(body).toBeObject();
						expect(body).toContainAllKeys([
							'host',
							'identifier',
							'timestamp',
							'status',
							'name',
							'message',
							'details',
							'stack',
						]);
						expect(body.host).toEqual(config.server.host);
						expect(body.identifier).toBeString();
						expect(body.timestamp).toBeString();
						expect(body.status).toEqual(400);
						expect(body.name).toEqual('Bad Request');
						expect(body.message).toEqual('Invalid body');
						expect(body.details).toEqual([{
							err: 'message',
						}]);
						expect(body.stack).toBeArray();
						done();
					},
				};
			},
		}) as Response;

		ErrorMiddleware.handleError(new ValidationError('body', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object headers error to a HeadersError and return it', (done) => {
		const req: Request = mockReq();
		const res: Response = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: HeadersError) => {
						expect(body).toBeObject();
						expect(body).toContainAllKeys([
							'host',
							'identifier',
							'timestamp',
							'status',
							'name',
							'message',
							'details',
							'stack',
						]);
						expect(body.host).toEqual(config.server.host);
						expect(body.identifier).toBeString();
						expect(body.timestamp).toBeString();
						expect(body.status).toEqual(400);
						expect(body.name).toEqual('Bad Request');
						expect(body.message).toEqual('Invalid headers');
						expect(body.details).toEqual([{
							err: 'message',
						}]);
						expect(body.stack).toBeArray();
						done();
					},
				};
			},
		}) as Response;

		ErrorMiddleware.handleError(new ValidationError('headers', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object params error to a ParamsError and return it', (done) => {
		const req: Request = mockReq();
		const res: Response = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: ParamsError) => {
						expect(body).toBeObject();
						expect(body).toContainAllKeys([
							'host',
							'identifier',
							'timestamp',
							'status',
							'name',
							'message',
							'details',
							'stack',
						]);
						expect(body.host).toEqual(config.server.host);
						expect(body.identifier).toBeString();
						expect(body.timestamp).toBeString();
						expect(body.status).toEqual(400);
						expect(body.name).toEqual('Bad Request');
						expect(body.message).toEqual('Invalid params');
						expect(body.details).toEqual([{
							err: 'message',
						}]);
						expect(body.stack).toBeArray();
						done();
					},
				};
			},
		}) as Response;

		ErrorMiddleware.handleError(new ValidationError('params', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object query error to a QueryError and return it', (done) => {
		const req: Request = mockReq();
		const res: Response = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: QueryError) => {
						expect(body).toBeObject();
						expect(body).toContainAllKeys([
							'host',
							'identifier',
							'timestamp',
							'status',
							'name',
							'message',
							'details',
							'stack',
						]);
						expect(body.host).toEqual(config.server.host);
						expect(body.identifier).toBeString();
						expect(body.timestamp).toBeString();
						expect(body.status).toEqual(400);
						expect(body.name).toEqual('Bad Request');
						expect(body.message).toEqual('Invalid query');
						expect(body.details).toEqual([{
							err: 'message',
						}]);
						expect(body.stack).toBeArray();
						done();
					},
				};
			},
		}) as Response;

		ErrorMiddleware.handleError(new ValidationError('query', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});
});
