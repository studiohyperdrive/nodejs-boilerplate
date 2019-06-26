import { mockReq, mockRes } from 'sinon-express-mock';

import { Config } from '@config/config.types';
import { CustomError, BodyError, HeadersError, ParamsError, QueryError } from '@shared/helpers/error';
import { default as config } from '@config';
import { Request, Response, CustomErrorDetail } from '@shared/shared.types';
import { ValidationError } from '@shared/helpers/validation/error';

import { ErrorMiddleware } from './error';

const cfg: Config = config();

const validateBody = (body: any, status: number, name: string, message: string, details?: CustomErrorDetail[]): void => { // tslint:disable-line no-any
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
	expect(body.host).toEqual(cfg.server.host);
	expect(body.identifier).toBeString();
	expect(body.timestamp).toBeString();
	expect(body.status).toEqual(status);
	expect(body.name).toEqual(name);
	expect(body.message).toEqual(message);
	expect(body.stack).toBeArray();

	if (details) {
		expect(body.details).toEqual(details);
	} else {
		expect(body.details).toBeUndefined();
	}
};

describe('[UNIT - CORE] ErrorMiddleware', () => {
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
						validateBody(body, 500, 'Error', 'error');
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
						validateBody(body, 500, 'Error', 'error');
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
						validateBody(body, 400, 'Bad Request', 'Invalid body', [{
							err: 'message',
						}]);
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
						validateBody(body, 400, 'Bad Request', 'Invalid headers', [{
							err: 'message',
						}]);
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
						validateBody(body, 400, 'Bad Request', 'Invalid params', [{
							err: 'message',
						}]);
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
						validateBody(body, 400, 'Bad Request', 'Invalid query', [{
							err: 'message',
						}]);
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
