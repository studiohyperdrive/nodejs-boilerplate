import { default as supertest } from 'supertest';

import { App } from '@app';

const api = supertest(new App(false).app);

describe('[INTEGRATION - SAMPLE] Samples route', () => {
	describe('Get all samples', () => {
		it('Should return all samples', (done: jest.DoneCallback) => {
			api.get('/v1/samples')
				.expect(200)
				.then((res: supertest.Response) => {
					expect(res.body).toBeArrayOfSize(1);
					expect(res.body[0]).toBeObject();
					expect(res.body[0]).toContainAllKeys([
						'id',
					]);
					expect(res.body[0].id).toEqual(1);
					done();
				})
				.catch(done);
		});
	});

	describe('Get sample by id', () => {
		it('Should return a sample by it\'s id', (done: jest.DoneCallback) => {
			api.get('/v1/samples/1')
				.expect(200)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					expect(res.body).toContainAllKeys([
						'id',
					]);
					expect(res.body.id).toEqual(1);
					done();
				})
				.catch(done);
		});

		it('Should return 404 Not Found on an unknown id', (done: jest.DoneCallback) => {
			api.get('/v1/samples/2')
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
					expect(res.body.status).toEqual(404);
					expect(res.body.name).toEqual('Not Found');
					expect(res.body.message).toEqual('Resource not found');
					done();
				})
				.catch(done);
		});
	});

	describe('Create sample', () => {
		it('Should return a created sample', (done: jest.DoneCallback) => {
			api.post('/v1/samples')
				.send({
					id: 2,
				})
				.expect(201)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					expect(res.body).toContainAllKeys([
						'id',
					]);
					expect(res.body.id).toEqual(2);
					done();
				})
				.catch(done);
		});

		it('Should return 400 Bad Request on an invalid body', (done: jest.DoneCallback) => {
			api.post('/v1/samples')
				.expect(400)
				.then((res: supertest.Response) => {
					expect(res.body).toBeObject();
					expect(res.body).toContainAllKeys([
						'host',
						'identifier',
						'timestamp',
						'status',
						'name',
						'message',
						'details',
						'stack',
					]);
					expect(res.body.status).toEqual(400);
					expect(res.body.name).toEqual('Bad Request');
					expect(res.body.message).toEqual('Invalid body');
					done();
				})
				.catch(done);
		});

		it('Should return 409 Conflict on an existing sample', (done: jest.DoneCallback) => {
			api.post('/v1/samples')
				.send({
					id: 1,
				})
				.expect(409)
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
					expect(res.body.status).toEqual(409);
					expect(res.body.name).toEqual('Conflict');
					expect(res.body.message).toEqual('The request could not be completed due to a conflict with the current state of the target resource');
					done();
				})
				.catch(done);
		});
	});
});
