import { EnvHelper } from './env';

describe('[UNIT - CONFIG] EnvHelper', () => {
	describe('envToBoolean', () => {
		it('Should convert an environment variable to a boolean (true)', (done: jest.DoneCallback) => {
			process.env.CONVERT = 'true';

			const result: boolean = EnvHelper.envToBoolean('CONVERT');

			expect(result).toBeTrue();
			done();
		});

		it('Should convert an environment variable to a boolean (false)', (done: jest.DoneCallback) => {
			process.env.CONVERT = 'false';

			const result: boolean = EnvHelper.envToBoolean('CONVERT');

			expect(result).toBeFalse();
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done: jest.DoneCallback) => {
			expect(() => {
				EnvHelper.envToBoolean('CONVERT_UNDEFINED');
			}).toThrowError('Environment variable CONVERT_UNDEFINED is not defined');
			done();
		});
	});

	describe('envToNumber', () => {
		it('Should convert an environment variable to a number', (done: jest.DoneCallback) => {
			process.env.CONVERT = '1';

			const result: number = EnvHelper.envToNumber('CONVERT');

			expect(result).toBeNumber();
			expect(result).toEqual(1);
			done();
		});

		it('Should convert an environment variable to a number', (done: jest.DoneCallback) => {
			process.env.CONVERT = 'invalid';

			const result: number = EnvHelper.envToNumber('CONVERT');

			expect(result).toBeNaN();
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done: jest.DoneCallback) => {
			expect(() => {
				EnvHelper.envToNumber('CONVERT_UNDEFINED');
			}).toThrowError('Environment variable CONVERT_UNDEFINED is not defined');
			done();
		});
	});

	describe('envToArray', () => {
		it('Should convert an environment variable to an array', (done: jest.DoneCallback) => {
			process.env.CONVERT = 'one,two,three';

			const result: string[] = EnvHelper.envToArray('CONVERT');

			expect(result).toBeArrayOfSize(3);
			expect(result).toEqual(['one', 'two', 'three']);
			done();
		});

		it('Should convert an environment variable to an array (custom separator)', (done: jest.DoneCallback) => {
			process.env.CONVERT = 'one;two;three';

			const result: string[] = EnvHelper.envToArray('CONVERT', ';');

			expect(result).toBeArrayOfSize(3);
			expect(result).toEqual(['one', 'two', 'three']);
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done: jest.DoneCallback) => {
			expect(() => {
				EnvHelper.envToArray('CONVERT_UNDEFINED');
			}).toThrowError('Environment variable CONVERT_UNDEFINED is not defined');
			done();
		});
	});

	describe('envToObject', () => {
		it('Should convert an environment variable to an object', (done: jest.DoneCallback) => {
			process.env.CONVERT = JSON.stringify({ key: 'value' });

			const result: object = EnvHelper.envToObject('CONVERT');

			expect(result).toBeObject();
			expect(result).toEqual({
				key: 'value',
			});
			done();
		});

		it('Should throw an error when the environment variable is not a valid JSON string', (done: jest.DoneCallback) => {
			process.env.CONVERT = 'invalid';

			expect(() => {
				EnvHelper.envToObject('CONVERT');
			}).toThrowError('Environment variable CONVERT is not a valid JSON string');
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done: jest.DoneCallback) => {
			expect(() => {
				EnvHelper.envToObject('CONVERT_UNDEFINED');
			}).toThrowError('Environment variable CONVERT_UNDEFINED is not defined');
			done();
		});
	});
});
