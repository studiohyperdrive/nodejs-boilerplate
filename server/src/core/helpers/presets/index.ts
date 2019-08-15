import { IValidationPreset } from '@shared/shared.types';

import { env } from './env';

export const presets: { [key: string]: IValidationPreset } = {
	env,
};
