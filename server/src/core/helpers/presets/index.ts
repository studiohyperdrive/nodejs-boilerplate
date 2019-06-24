import { ValidationPreset } from '@shared/shared.types';

import { envPreset } from './env';

export const presets: { [key: string]: ValidationPreset } = {
	env: envPreset,
};
