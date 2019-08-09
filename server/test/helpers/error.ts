import { ICustomError, ICustomErrorDetail } from '@shared/shared.types';
import { default as config } from '@config';

export const validateError = <T>(err: ICustomError, type: T, status: number, name: string, message: string, details?: ICustomErrorDetail[]): void => {
	expect(err).toBeDefined();
	expect(err).toBeInstanceOf(type);
	expect(err.host).toEqual(config.server.host);
	expect(err.identifier).toBeString();
	expect(err.message).toEqual(message);
	expect(err.name).toEqual(name);
	expect(err.stack).toBeString();
	expect(err.status).toEqual(status);
	expect(err.timestamp).toBeString();

	if (details) {
		expect(err.details).toEqual(details);
	} else {
		expect(err.details).toBeUndefined();
	}
};

export const validateErrorBody = (
	body: any, // tslint:disable-line no-any
	status: number,
	name: string,
	message: string,
	details?: ICustomErrorDetail[]
): void => {
	expect(body).toBeObject();
	expect(body).toContainKeys([
		'host',
		'identifier',
		'timestamp',
		'status',
		'name',
		'message',
		'stack',
	]);
	expect(body.host).toEqual(config.server.host);
	expect(body.identifier).toBeString();
	expect(body.timestamp).toBeString();
	expect(body.status).toEqual(status);
	expect(body.name).toEqual(name);
	expect(body.message).toEqual(message);
	expect(body.stack).toBeArray();

	if (details) {
		expect(body).toContainKey('details');
		expect(body.details).toEqual(details);
	} else {
		expect(body.details).toBeUndefined();
	}
};
