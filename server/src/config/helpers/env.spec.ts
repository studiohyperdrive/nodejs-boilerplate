import { EnvHelper } from './env';

describe('[UNIT - CONFIG] EnvHelper', () => {
	describe('envToBoolean', () => {
		it('Should convert an environment variable to a boolean (true)', (done) => {
			process.env.CONVERT = 'true';

			const result: boolean = EnvHelper.envToBoolean(process.env.CONVERT);

			expect(result).toBeTrue();
			done();
		});

		it('Should convert an environment variable to a boolean (false)', (done) => {
			process.env.CONVERT = 'false';

			const result: boolean = EnvHelper.envToBoolean(process.env.CONVERT);

			expect(result).toBeFalse();
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done) => {
			expect(() => {
				EnvHelper.envToBoolean(process.env.CONVERT_UNDEFINED);
			}).toThrowError('Environment variable is not defined');
			done();
		});
	});

	describe('envToNumber', () => {
		it('Should convert an environment variable to a number', (done) => {
			process.env.CONVERT = '1';

			const result: number = EnvHelper.envToNumber(process.env.CONVERT);

			expect(result).toBeNumber();
			expect(result).toEqual(1);
			done();
		});

		it('Should convert an environment variable to a number', (done) => {
			process.env.CONVERT = 'invalid';

			const result: number = EnvHelper.envToNumber(process.env.CONVERT);

			expect(result).toBeNaN();
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done) => {
			expect(() => {
				EnvHelper.envToNumber(process.env.CONVERT_UNDEFINED);
			}).toThrowError('Environment variable is not defined');
			done();
		});
	});

	describe('envToArray', () => {
		it('Should convert an environment variable to an array', (done) => {
			process.env.CONVERT = 'one,two,three';

			const result: string[] = EnvHelper.envToArray(process.env.CONVERT);

			expect(result).toBeArrayOfSize(3);
			expect(result).toEqual(['one', 'two', 'three']);
			done();
		});

		it('Should convert an environment variable to an array (custom separator)', (done) => {
			process.env.CONVERT = 'one;two;three';

			const result: string[] = EnvHelper.envToArray(process.env.CONVERT, ';');

			expect(result).toBeArrayOfSize(3);
			expect(result).toEqual(['one', 'two', 'three']);
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done) => {
			expect(() => {
				EnvHelper.envToArray(process.env.CONVERT_UNDEFINED);
			}).toThrowError('Environment variable is not defined');
			done();
		});
	});

	describe('envToObject', () => {
		it('Should convert an environment variable to an object', (done) => {
			process.env.CONVERT = JSON.stringify({ key: 'value' });

			const result: object = EnvHelper.envToObject(process.env.CONVERT);

			expect(result).toBeObject();
			expect(result).toEqual({
				key: 'value',
			});
			done();
		});

		it('Should throw an error when the environment variable is not a valid JSON string', (done) => {
			process.env.CONVERT = 'invalid';

			expect(() => {
				EnvHelper.envToObject(process.env.CONVERT);
			}).toThrowError('Environment variable is not a valid JSON string');
			done();
		});

		it('Should throw an error when the environment variable is not defined', (done) => {
			expect(() => {
				EnvHelper.envToObject(process.env.CONVERT_UNDEFINED);
			}).toThrowError('Environment variable is not defined');
			done();
		});
	});
});
