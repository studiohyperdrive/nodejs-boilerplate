import { default as Joi } from 'joi';

import { allowUnknown } from '@shared/helpers/validation/options';
import { ValidationPreset } from '@shared/shared.types';

export const samplePreset: ValidationPreset = {
	options: allowUnknown,
	schema: Joi.object().required().keys({
		id: Joi.number().required(),
	}),
};
