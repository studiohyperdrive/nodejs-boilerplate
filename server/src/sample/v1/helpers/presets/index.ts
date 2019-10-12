import { IValidationPreset } from '@shared/shared.types';

import { sample } from './sample';

interface IValidationPresets {
	sample: IValidationPreset;
}

export const presets: IValidationPresets = {
	sample,
};
