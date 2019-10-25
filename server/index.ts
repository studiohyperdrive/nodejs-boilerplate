import { App } from './src/app';
import { Envs } from './src/config/config.types';

const app: App = new App();

// ts-node-dev does not work well with graceful shutdown on SIGINT/SIGTERM
if (process.env.NODE_ENV !== Envs.local) {
	process.on('SIGINT', app.stop);
	process.on('SIGTERM', app.stop);
}
