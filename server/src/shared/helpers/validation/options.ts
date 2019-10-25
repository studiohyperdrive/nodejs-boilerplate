import { ValidationOptions } from '@hapi/joi';

export const allowUnknown: ValidationOptions = {
	allowUnknown: true,
};

export const stripUnknown: ValidationOptions = {
	stripUnknown: true,
};
