import { allowUnknown, stripUnknown } from './options';

describe('[UNIT - SHARED] Validation - Options', () => {
	it('Should export an instance of validation options (allowUnknown)', (done: jest.DoneCallback) => {
		expect(allowUnknown).toBeDefined();
		expect(allowUnknown).toEqual({
			allowUnknown: true,
		});
		done();
	});

	it('Should export an instance of validation options (stripUnknown)', (done: jest.DoneCallback) => {
		expect(stripUnknown).toBeDefined();
		expect(stripUnknown).toEqual({
			stripUnknown: true,
		});
		done();
	});
});
