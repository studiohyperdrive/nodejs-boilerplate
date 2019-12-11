import { default as Joi } from '@hapi/joi';

import { Envs, LoggerPresets } from '~config/config.types';
import { allowUnknown } from '~shared/helpers/validation/options';
import { IValidationPreset } from '~shared/shared.types';

export const env: IValidationPreset = {
	options: allowUnknown,
	schema: Joi.object().required().keys({
		NODE_ENV: Joi.string().required().valid(
			Envs.local,
			Envs.test,
			Envs.development,
			Envs.staging,
			Envs.production
		),
		STATE_DOCS: Joi.boolean().default(false),
		STATE_PRODUCTION: Joi.boolean().default(false),
		STATE_TEST: Joi.boolean().default(false),
		HOST: Joi.string().required(),
		PORT: Joi.number().required(),
		TZ: Joi.string().required(),
		LOGGING_PRESET: Joi.string().valid(
			LoggerPresets.default,
			LoggerPresets.verbose,
			LoggerPresets.silent,
			LoggerPresets.error
		).default(LoggerPresets.default),
	}),
};
