import { default as Joi } from 'joi';
import { mockReq, mockRes } from 'sinon-express-mock';

import { Request, Response, Next, ValidationPreset } from '../shared.types';
import { DataMiddleware } from './data';
import { ValidationError } from '../helpers/validation/error';

describe('[UNIT - SHARED] DataMiddleware', () => {
	describe('Copy' , () => {
		it('Should copy all request data to req.data', (done: jest.DoneCallback) => {
			const req: Request = mockReq({
				body: {
					key: 'body',
				},
				headers: {
					key: 'headers',
				},
				params: {
					key: 'params',
				},
				query: {
					key: 'query',
				},
			});
			const res: Response = mockRes();

			DataMiddleware.copy(req, res, () => {
				expect(req.data).toBeDefined();
				expect(req.data).toBeObject();
				expect(req.data).toContainAllKeys([
					'body',
					'headers',
					'params',
					'query',
				]);
				expect(req.data).toEqual({
					body: {
						key: 'body',
					},
					headers: {
						key: 'headers',
					},
					params: {
						key: 'params',
					},
					query: {
						key: 'query',
					},
				});
				done();
			});
		});
	});

	describe('Validate', () => {
		const preset: ValidationPreset = {
			options: {},
			schema: Joi.object().required().keys({
				key: Joi.string().required().valid(['value']),
			}),
		};

		it('Should progress if there are no errors', (done: jest.DoneCallback) => {
			const req: Request = mockReq({
				data: {
					body: {
						key: 'value',
					},
				},
			});
			const res: Response = mockRes();

			DataMiddleware.validate('body', preset, req, res, (err: ValidationError) => {
				expect(err).toBeUndefined();
				expect(req.data.body).toBeDefined();
				expect(req.data.body).toBeObject();
				expect(req.data.body).toContainAllKeys([
					'key',
				]);
				expect(req.data.body).toEqual({
					key: 'value',
				});
				done();
			});
		});

		it('Should throw an error if there are errors', (done: jest.DoneCallback) => {
			const req: Request = mockReq({
				data: {
					body: {
						key: 'invalid',
					},
				},
			});
			const res: Response = mockRes();
			const next: Next = () => {};

			expect(() => {
				DataMiddleware.validate('body', preset, req, res, next);
			}).toThrowError('body');
			done();
		});

		it('Should throw an error if there if the data hasn\'t been cloned to req.data', (done: jest.DoneCallback) => {
			const req: Request = mockReq();
			const res: Response = mockRes();
			const next: Next = () => {};

			expect(() => {
				DataMiddleware.validate('body', preset, req, res, next);
			}).toThrowError('The request data has not been cloned');
			done();
		});
	});
});
