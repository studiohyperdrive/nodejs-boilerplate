import { ValidationError as JoiValidationError } from 'joi';

export class ValidationError extends Error {
	public validation?: JoiValidationError;

	constructor(message: string, validation?: JoiValidationError) {
		super();

		Error.captureStackTrace(this, this.constructor);
		this.name = this.constructor.name;
		this.message = message;
		this.validation = validation;
	}
}
