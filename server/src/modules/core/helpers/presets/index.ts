import { IValidationPreset } from '~shared/shared.types';

import { env } from './env';

interface IValidationPresets {
	env: IValidationPreset;
}

export const presets: IValidationPresets = {
	env,
};
