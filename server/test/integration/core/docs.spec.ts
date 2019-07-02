import { default as supertest } from 'supertest';

import { App, CONFIG } from '@app';
import { default as config } from '@config';

let api: supertest.SuperTest<supertest.Test>;

describe('[INTEGRATION - CORE] Docs route', () => {
	describe('Enabled', () => {
		beforeAll(() => {
			api = supertest(new App(false).app);
		});

		it('Should return the swagger documentation', (done: jest.DoneCallback) => {
			api.get('/docs')
				.redirects(1)
				.expect(200)
				.then((res: supertest.Response) => {
					expect(res.text).toBeString();
					expect(res.text).toContain('<!DOCTYPE html>');
					done();
				})
				.catch(done);
		});

		it('Should return the swagger documentation (JSON)', (done: jest.DoneCallback) => {
			api.get('/docs/json')
				.expect(200)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					done();
				})
				.catch(done);
		});
	});

	describe('Disabled', () => {
		beforeAll(() => {
			CONFIG.state.docs = false;
			api = supertest(new App(false).app);
		});

		it('Should return the fallback route on requesting the swagger documentation', (done: jest.DoneCallback) => {
			api.get('/docs')
				.expect(404)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					expect(res.body).toContainAllKeys([
						'host',
						'identifier',
						'timestamp',
						'status',
						'name',
						'message',
						'stack',
					]);
					expect(res.body.host).toEqual(config.server.host);
					expect(res.body.identifier).toBeString();
					expect(res.body.timestamp).toBeString();
					expect(res.body.status).toEqual(404);
					expect(res.body.name).toEqual('Not Found');
					expect(res.body.message).toEqual('Resource not found');
					expect(res.body.details).toBeUndefined();
					expect(res.body.stack).toBeArray();
					done();
				})
				.catch(done);
		});

		it('Should return the fallback route on requesting the swagger documentation (JSON)', (done: jest.DoneCallback) => {
			api.get('/docs/json')
				.expect(404)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					expect(res.body).toContainAllKeys([
						'host',
						'identifier',
						'timestamp',
						'status',
						'name',
						'message',
						'stack',
					]);
					expect(res.body.host).toEqual(config.server.host);
					expect(res.body.identifier).toBeString();
					expect(res.body.timestamp).toBeString();
					expect(res.body.status).toEqual(404);
					expect(res.body.name).toEqual('Not Found');
					expect(res.body.message).toEqual('Resource not found');
					expect(res.body.details).toBeUndefined();
					expect(res.body.stack).toBeArray();
					done();
				})
				.catch(done);
		});
	});
});
