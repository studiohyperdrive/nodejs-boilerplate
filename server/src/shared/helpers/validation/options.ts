import { ValidationOptions } from 'joi';

export const allowUnknown: ValidationOptions = {
	allowUnknown: true,
};

export const stripUnknown: ValidationOptions = {
	stripUnknown: true,
};
