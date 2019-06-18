import 'jest-extended';

// Adding a sanity check since an empty spec file is disallowed,
// but this file allows us to only import jest-extended once
describe('[SETUP] Sanity check', () => {
	it('Should check if true equals true', () => {
		expect(true).toBeTrue();
	});
});
