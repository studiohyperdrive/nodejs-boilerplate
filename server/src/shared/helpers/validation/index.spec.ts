import { default as Joi, ValidationResult } from 'joi';

import { allowUnknown, stripUnknown } from './options';
import { ValidationPreset } from '../../shared.types';
import { Validator } from './index';

describe('[UNIT - SHARED] Validation - Validator', () => {
	const preset: ValidationPreset = {
		options: {},
		schema: Joi.object().required().keys({
			key: Joi.string().required().valid(['value']),
		}),
	};

	it('Should return the object if there are no errors', (done) => {
		const result: ValidationResult<any> = Validator.validate({ key: 'value' }, preset, 'Validation failed'); // tslint:disable-line no-any

		expect(result).toBeDefined();
		expect(result).toBeObject();
		expect(result).toContainAllKeys([
			'key',
		]);
		expect(result).toEqual({
			key: 'value',
		});
		done();
	});

	it('Should return the object if there are no errors and allow unknown properties', (done) => {
		preset.options = allowUnknown;
		const result: ValidationResult<any> = Validator.validate({ key: 'value', unknown: true }, preset, 'Validation failed'); // tslint:disable-line no-any

		expect(result).toBeDefined();
		expect(result).toBeObject();
		expect(result).toContainAllKeys([
			'key',
			'unknown',
		]);
		expect(result).toEqual({
			key: 'value',
			unknown: true,
		});
		done();
	});

	it('Should return the object if there are no errors and strip unknown properties', (done) => {
		preset.options = stripUnknown;
		const result: ValidationResult<any> = Validator.validate({ key: 'value', unknown: false }, preset, 'Validation failed'); // tslint:disable-line no-any

		expect(result).toBeDefined();
		expect(result).toBeObject();
		expect(result).toContainAllKeys([
			'key',
		]);
		expect(result).toEqual({
			key: 'value',
		});
		done();
	});

	it('Should throw an error if there are errors', (done) => {
		expect(() => {
			Validator.validate({}, preset, 'Validation failed');
		}).toThrowError('Validation failed');
		done();
	});
});
