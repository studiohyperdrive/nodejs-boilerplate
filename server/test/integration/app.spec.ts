import { default as supertest } from 'supertest';

import { default as app } from '@app';
import { version } from '@pkg';

const api = supertest(app);

describe('[INTEGRATION] Status route', () => {
	it('Should return the server status', (done) => {
		api.get('/status')
			.expect(200)
			.then((res: supertest.Response) => {
				expect(res.body).toBeObject();
				expect(res.body).toContainAllKeys([
					'success',
					'version',
				]);
				expect(res.body.success).toBeBoolean();
				expect(res.body.success).toBeTrue();
				expect(res.body.version).toBeString();
				expect(res.body.version).toEqual(version);
				done();
			})
			.catch(done);
	});
});
