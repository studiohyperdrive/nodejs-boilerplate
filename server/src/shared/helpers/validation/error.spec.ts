import { ValidationError } from './error';

describe('[UNIT - SHARED] Validation - Error', () => {
	const validation: any = { // tslint:disable-line no-any
		details: [{
			message: 'message',
			type: 'type',
			path: ['path'],
		}],
	};

	it('Should return a ValidationError', (done: jest.DoneCallback) => {
		const err: ValidationError = new ValidationError('Validation failed', validation);

		expect(err).toBeDefined();
		expect(err).toBeInstanceOf(ValidationError);
		expect(err.name).toEqual('ValidationError');
		expect(err.message).toEqual('Validation failed');
		expect(err.validation).toEqual(validation);
		expect(err.stack).toBeString();
		done();
	});
});
