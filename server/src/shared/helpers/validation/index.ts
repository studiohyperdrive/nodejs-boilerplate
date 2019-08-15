import { curry } from 'ramda';
import { default as Joi, ValidationResult } from 'joi';

import { ICustomError, IValidationPreset } from '../../shared.types';
import { ValidationError } from './error';

export class Validator {
	public static validate = curry(Validator.runValidation);

	private static runValidation(obj: any, preset: IValidationPreset, err: string | ICustomError): any { // tslint:disable-line no-any
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
