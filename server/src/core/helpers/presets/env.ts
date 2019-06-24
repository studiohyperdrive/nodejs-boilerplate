import { default as Joi } from 'joi';

import { allowUnknown } from '@shared/helpers/validation/options';
import { ValidationPreset } from '@shared/shared.types';

export const envPreset: ValidationPreset = {
	options: allowUnknown,
	schema: Joi.object().required().keys({
		NODE_ENV: Joi.string().required().valid([
			'local',
			'test',
			'development',
			'staging',
			'production',
		]),
		STATE_DOCS: Joi.string().required().valid(['true', 'false']),
		STATE_PRODUCTION: Joi.string().required().valid(['true', 'false']),
		STATE_TEST: Joi.string().required().valid(['true', 'false']),
		HOST: Joi.string().required(),
		PORT: Joi.string().required(),
		TZ: Joi.string().required(),
		LOGGING_PRESET: Joi.string().required().valid(['verbose', 'default', 'silent']),
	}),
};
