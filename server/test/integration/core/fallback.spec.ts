import { default as supertest } from 'supertest';

import { App } from '~app';

import { validateErrorBody } from '../../helpers/error';

const api = supertest(new App(false).app);

describe('[INTEGRATION - CORE] Fallback route', () => {
	it('Should return the fallback route', (done: jest.DoneCallback) => {
		api.get('/gibberish')
			.expect(404)
			.then((res: supertest.Response) => {
				validateErrorBody(res.body, 404, 'Not Found', 'Resource not found');
				done();
			})
			.catch(done);
	});
});
