import { NodejsOptions } from '@studiohyperdrive/logger';

export type IEnvs = 'local' | 'test' | 'development' | 'staging' | 'production';
export type ILoggerConfig = NodejsOptions;
export type ILoggerPresets = 'default' | 'verbose' | 'silent';

export interface IStateConfig {
	env: IEnvs;
	docs: boolean;
	production: boolean;
	test: boolean;
}

export interface IServerConfig {
	host: string;
	port: number;
	timezone: string;
}

export interface IConfig {
	state: IStateConfig;
	server: IServerConfig;
	logger: ILoggerConfig;
}
