import { default as Joi, ValidationResult } from '@hapi/joi';

import { IValidationPreset } from '../../shared.types';
import { CustomError } from '../error';
import { Validator } from './index';
import { allowUnknown, stripUnknown } from './options';

describe('[UNIT - SHARED] Validation - Validator', () => {
	const preset: IValidationPreset = {
		options: {},
		schema: Joi.object().required().keys({
			key: Joi.string().required().valid('value'),
		}),
	};

	it('Should return the object if there are no errors', (done: jest.DoneCallback) => {
		const result: ValidationResult = Validator.validate({ key: 'value' }, preset, 'Validation failed');

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

	it('Should return the object if there are no errors and allow unknown properties', (done: jest.DoneCallback) => {
		preset.options = allowUnknown;
		const result: ValidationResult = Validator.validate({ key: 'value', unknown: true }, preset, 'Validation failed');

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

	it('Should return the object if there are no errors and strip unknown properties', (done: jest.DoneCallback) => {
		preset.options = stripUnknown;
		const result: ValidationResult = Validator.validate({ key: 'value', unknown: false }, preset, 'Validation failed');

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

	it('Should throw a validation error if there are errors', (done: jest.DoneCallback) => {
		expect(() => {
			Validator.validate({}, preset, 'Validation failed');
		}).toThrowError('Validation failed');
		done();
	});

	it('Should throw a custom error if there are errors and a custom error is provided', (done: jest.DoneCallback) => {
		expect(() => {
			Validator.validate({}, preset, new CustomError());
		}).toThrowError('Something went wrong');
		done();
	});
});
