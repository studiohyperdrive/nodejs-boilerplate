import { default as supertest } from 'supertest';

import { App } from '@app';
import { Config } from '@config/config.types';
import { default as config } from '@config';

const cfg: Config = config();

describe('[INTEGRATION - CORE] Docs route', () => {
	describe('Enabled', () => {
		const api = supertest(new App(false).app);

		it('Should return the swagger documentation', (done) => {
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

		it('Should return the swagger documentation (JSON)', (done) => {
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
		process.env.STATE_DOCS = 'false';
		const api = supertest(new App(false).app);

		it('Should return the fallback route on requesting the swagger documentation', (done) => {
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
					expect(res.body.host).toEqual(cfg.server.host);
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

		it('Should return the fallback route on requesting the swagger documentation (JSON)', (done) => {
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
					expect(res.body.host).toEqual(cfg.server.host);
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
