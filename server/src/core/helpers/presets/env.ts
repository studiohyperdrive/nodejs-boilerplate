import { default as Joi } from 'joi';

import { allowUnknown } from '@shared/helpers/validation/options';
import { IValidationPreset } from '@shared/shared.types';

export const env: IValidationPreset = {
	options: allowUnknown,
	schema: Joi.object().required().keys({
		NODE_ENV: Joi.string().required().valid([
			'local',
			'test',
			'development',
			'staging',
			'production',
		]),
		STATE_DOCS: Joi.string().valid(['true', 'false']).default('false'),
		STATE_PRODUCTION: Joi.string().valid(['true', 'false']).default('false'),
		STATE_TEST: Joi.string().valid(['true', 'false']).default('false'),
		HOST: Joi.string().required(),
		PORT: Joi.string().required(),
		TZ: Joi.string().required(),
		LOGGING_PRESET: Joi.string().valid(['verbose', 'default', 'silent']).default('default'),
	}),
};
