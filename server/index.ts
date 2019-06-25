import { App } from './src/app';

const app: App = new App();

process.on('SIGINT', app.stop);
process.on('SIGTERM', app.stop);
