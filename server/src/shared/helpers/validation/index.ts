import { default as Joi, ValidationResult } from '@hapi/joi';
import { curry } from 'ramda';

import { ICustomError, IValidationPreset } from '../../shared.types';
import { ValidationError } from './error';

export class Validator {
	public static validate = curry(Validator.runValidation);

	private static runValidation(obj: any, preset: IValidationPreset, err: string | ICustomError): any { // tslint:disable-line no-any
		const validation: ValidationResult = preset.schema.validate(obj, { abortEarly: false, ...preset.options });

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
