import { mockReq, mockRes } from 'sinon-express-mock';

import { CustomError } from '@shared/helpers/error';
import { IRequest, IResponse, ICustomError, IBodyError, IHeadersError, IParamsError, IQueryError } from '@shared/shared.types';
import { validateErrorBody } from '@test/helpers/error';
import { ValidationError } from '@shared/helpers/validation/error';

import { ErrorMiddleware } from './error';

describe('[UNIT - CORE] ErrorMiddleware', () => {
	const validation: any = { // tslint:disable-line no-any
		details: [{
			message: 'message',
			type: 'type',
			path: ['path'],
		}],
	};

	it('Should progress if there is no error', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = mockRes();

		ErrorMiddleware.handleError(null, req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should progress if a response is already sent', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = mockRes();
		res.headersSent = true;

		ErrorMiddleware.handleError(new CustomError(), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert a string error to a CustomError and return it', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(500);

				return {
					json: (body: ICustomError) => {
						validateErrorBody(body, 500, 'Error', 'error');
						done();
					},
				};
			},
		}) as IResponse;

		ErrorMiddleware.handleError('error', req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an Error object error to a CustomError and return it', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(500);

				return {
					json: (body: ICustomError) => {
						validateErrorBody(body, 500, 'Error', 'error');
						done();
					},
				};
			},
		}) as IResponse;

		ErrorMiddleware.handleError(new Error('error'), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object body error to a BodyError and return it', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: IBodyError) => {
						validateErrorBody(body, 400, 'Bad Request', 'Invalid body', [{
							err: 'message',
						}]);
						done();
					},
				};
			},
		}) as IResponse;

		ErrorMiddleware.handleError(new ValidationError('body', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object headers error to a HeadersError and return it', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: IHeadersError) => {
						validateErrorBody(body, 400, 'Bad Request', 'Invalid headers', [{
							err: 'message',
						}]);
						done();
					},
				};
			},
		}) as IResponse;

		ErrorMiddleware.handleError(new ValidationError('headers', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object params error to a ParamsError and return it', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: IParamsError) => {
						validateErrorBody(body, 400, 'Bad Request', 'Invalid params', [{
							err: 'message',
						}]);
						done();
					},
				};
			},
		}) as IResponse;

		ErrorMiddleware.handleError(new ValidationError('params', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});

	it('Should convert an ValidationError object query error to a QueryError and return it', (done: jest.DoneCallback) => {
		const req: IRequest = mockReq();
		const res: IResponse = ({
			status: (code: number) => {
				expect(code).toBeNumber();
				expect(code).toEqual(400);

				return {
					json: (body: IQueryError) => {
						validateErrorBody(body, 400, 'Bad Request', 'Invalid query', [{
							err: 'message',
						}]);
						done();
					},
				};
			},
		}) as IResponse;

		ErrorMiddleware.handleError(new ValidationError('query', validation), req, res, (err: Error) => {
			expect(err).toBeUndefined();
			done();
		});
	});
});
