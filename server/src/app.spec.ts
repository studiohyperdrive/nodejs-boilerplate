import { logger } from '@shared/helpers/logger';
import { wait } from '@test/helpers/wait';

import { App } from './app';

describe('[UNIT - APP] Application', () => {
	let app: App;
	let closeServerSpy: jest.SpyInstance;
	let exitProcessSpy: jest.SpyInstance;
	let loggerErrorSpy: jest.SpyInstance;
	let loggerInfoSpy: jest.SpyInstance;

	beforeEach(() => {
		app = new App(false);

		exitProcessSpy = jest.spyOn(process, 'exit').mockImplementation();
		loggerErrorSpy = jest.spyOn(logger, 'error');
		loggerInfoSpy = jest.spyOn(logger, 'info');
	});

	afterEach(() => {
		exitProcessSpy.mockRestore();
		loggerErrorSpy.mockRestore();
		loggerInfoSpy.mockRestore();
	});

	it('Should start an Express server using the constructor', async (done: jest.DoneCallback) => {
		app = new App();

		await wait(500);

		expect(app).toBeDefined();
		expect(app.app).toBeDefined();
		expect(app.server).toBeDefined();
		expect(loggerInfoSpy).toHaveBeenCalledWith('Server running on test environment at port 3001');

		app.server.close();
		done();
	});

	it('Should start an Express server', async (done: jest.DoneCallback) => {
		app.start();

		await wait(500);

		expect(app).toBeDefined();
		expect(app.app).toBeDefined();
		expect(app.server).toBeDefined();
		expect(loggerInfoSpy).toHaveBeenCalledWith('Server running on test environment at port 3001');

		app.server.close();
		done();
	});

	it('Should start an Express server and error', async (done: jest.DoneCallback) => {
		const error: Error = new Error();
		app.app.listen = ((port: number, callback: (err?: Error) => void) => {
			callback(error);
		}) as any; // tslint:disable-line no-any
		app.start();

		await wait(500);

		expect(loggerErrorSpy).toHaveBeenCalledWith(error);
		expect(exitProcessSpy).toHaveBeenCalledWith(1);

		done();
	});

	it('Should stop the Express server on SIGTERM', async (done: jest.DoneCallback) => {
		app.start();

		await wait(500);

		closeServerSpy = jest.spyOn(app.server, 'close');

		app.stop('SIGTERM');

		await wait(500);

		expect(loggerInfoSpy).toHaveBeenCalledWith('Server stopped due to SIGTERM signal, graceful shutdown');
		expect(closeServerSpy).toHaveBeenCalled();
		expect(exitProcessSpy).toHaveBeenCalled();

		closeServerSpy.mockRestore();
		done();
	});

	it('Should stop the Express server on SIGTERM and error', async (done: jest.DoneCallback) => {
		app.start();
		const error: Error = new Error();
		const close: Function = app.server.close;
		app.server.close = ((callback: (err?: Error) => void) => {
			callback(error);
		}) as any; // tslint:disable-line no-any

		await wait(500);

		closeServerSpy = jest.spyOn(app.server, 'close');

		app.stop('SIGTERM');

		await wait(500);

		expect(loggerInfoSpy).toHaveBeenCalledWith('Server stopped due to SIGTERM signal, graceful shutdown');
		expect(closeServerSpy).toHaveBeenCalled();
		expect(loggerErrorSpy).toHaveBeenCalledWith(error);
		expect(exitProcessSpy).toHaveBeenCalledWith(1);

		closeServerSpy.mockRestore();
		app.server.close = close as any; // tslint:disable-line no-any
		app.server.close();
		done();
	});

	it('Should stop the Express server on SIGINT', async (done: jest.DoneCallback) => {
		app.start();

		await wait(500);

		closeServerSpy = jest.spyOn(app.server, 'close');

		app.stop('SIGINT');

		await wait(500);

		expect(loggerInfoSpy).toHaveBeenCalledWith('Server stopped due to SIGINT signal, graceful shutdown');
		expect(closeServerSpy).toHaveBeenCalled();
		expect(exitProcessSpy).toHaveBeenCalled();

		closeServerSpy.mockRestore();
		done();
	});

	it('Should stop the Express server on SIGINT and error', async (done: jest.DoneCallback) => {
		app.start();
		const error: Error = new Error();
		const close: Function = app.server.close;
		app.server.close = ((callback: (err?: Error) => void) => {
			callback(error);
		}) as any; // tslint:disable-line no-any

		await wait(500);

		closeServerSpy = jest.spyOn(app.server, 'close');

		app.stop('SIGINT');

		await wait(500);

		expect(loggerInfoSpy).toHaveBeenCalledWith('Server stopped due to SIGINT signal, graceful shutdown');
		expect(closeServerSpy).toHaveBeenCalled();
		expect(loggerErrorSpy).toHaveBeenCalledWith(error);
		expect(exitProcessSpy).toHaveBeenCalledWith(1);

		closeServerSpy.mockRestore();
		app.server.close = close as any; // tslint:disable-line no-any
		app.server.close();
		done();
	});
});
