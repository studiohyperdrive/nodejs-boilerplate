import { curry } from 'ramda';
import { default as Joi, ValidationResult } from 'joi';

import { CustomError } from '../error';
import { ValidationError } from './error';
import { ValidationPreset } from '../../shared.types';

export class Validator {
	public static validate = curry(Validator.runValidation);

	private static runValidation(obj: any, preset: ValidationPreset, err: string | CustomError): any { // tslint:disable-line no-any
		const validation: ValidationResult<any> = Joi.validate(obj, preset.schema, { abortEarly: false, ...preset.options }); // tslint:disable-line no-any

		if (!validation.error) {
			// Return value from validation, for casting etc
			return validation.value;
		}

		if (typeof err === 'string') {
			throw new ValidationError(err, validation.error);
		}

		throw err;
	}
}
