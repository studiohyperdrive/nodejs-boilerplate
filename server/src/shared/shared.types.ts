// Requests
import {
	Request as ExpressRequest,
	Response as ExpressResponse,
	NextFunction as ExpressNextFunction,
} from 'express';

export interface Request extends ExpressRequest {
	data?: {
		/* tslint:disable no-any */
		body: any;
		headers: any;
		params: any;
		query: any;
		/* tslint:enable no-any */
	};
}
export type Response = ExpressResponse;
export type Next = ExpressNextFunction;

// Validation
import {
	Schema as JoiSchema,
	ValidationOptions as JoiValidationOptions,
} from 'joi';

export interface ValidationPreset {
	schema: JoiSchema;
	options: JoiValidationOptions;
}
export type ValidationOrigin = 'body' | 'headers' | 'params' | 'query';

// Error handling
export interface CustomErrorDetail {
	err: string;
}

export interface CustomError extends Error {
	details?: CustomErrorDetail[];
	host: string;
	identifier: string;
	message: string;
	name: string;
	stack?: string;
	status: number;
	timestamp: string;
}
export type BodyError = CustomError;
export type HeadersError = CustomError;
export type ParamsError = CustomError;
export type QueryError = CustomError;
export type UnauthorizedError = CustomError;
export type ForbiddenError = CustomError;
export type NotFoundError = CustomError;
export type InternalServerError = CustomError;
export type Errors =
	CustomError |
	BodyError |
	HeadersError |
	ParamsError |
	QueryError |
	UnauthorizedError |
	ForbiddenError |
	NotFoundError |
	InternalServerError;
