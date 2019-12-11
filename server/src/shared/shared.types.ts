// Requests
import {
	Schema,
	ValidationOptions,
} from '@hapi/joi';
import {
	NextFunction,
	Request,
	Response,
} from 'express';
import { ISwaggerBuildDefinitionModel } from 'swagger-express-ts/swagger.builder';

import { CustomValidationError } from './helpers/error';
import { ValidationError } from './helpers/validation/error';

export interface IRequest extends Request {
	data?: {
		/* tslint:disable no-any */
		body: any;
		headers: any;
		params: any;
		query: any;
		/* tslint:enable no-any */
	};
}
export type IResponse = Response;
export type INext = NextFunction;

// Validation
export interface IValidationPreset {
	schema: Schema;
	options: ValidationOptions;
}
export type IValidationPresetFn = (_: any) => IValidationPreset; // tslint:disable-line no-any
export type IValidationOrigin = 'body' | 'headers' | 'params' | 'query';
export type IValidationError = ValidationError;

// Error handling
export type ICustomValidationError = CustomValidationError;

export interface ICustomErrorDetail {
	err: string;
}

export interface ICustomError extends Error {
	details?: ICustomErrorDetail[];
	host: string;
	identifier: string;
	message: string;
	name: string;
	stack?: string;
	status: number;
	timestamp: string;
}
export type IBodyError = ICustomError;
export type IHeadersError = ICustomError;
export type IParamsError = ICustomError;
export type IQueryError = ICustomError;
export type IUnauthorizedError = ICustomError;
export type IForbiddenError = ICustomError;
export type INotFoundError = ICustomError;
export type IConflictError = ICustomError;
export type IInternalServerError = ICustomError;
export type IErrors =
	ICustomError |
	IBodyError |
	IHeadersError |
	IParamsError |
	IQueryError |
	IUnauthorizedError |
	IForbiddenError |
	INotFoundError |
	IConflictError |
	IInternalServerError;

// Swagger
export interface ISwaggerModels {
	[key: string]: ISwaggerBuildDefinitionModel;
}
