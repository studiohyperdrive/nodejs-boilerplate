const { compilerOptions } = require('./tsconfig.base.json');
const { pathsToModuleNameMapper } = require('ts-jest/utils');

module.exports = {
	displayName: 'SERVER',
	rootDir: '.',
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	collectCoverageFrom: [
		'<rootDir>/src/**/*.ts',
	],
	coverageDirectory: './test/coverage',
	coverageReporters: [
		'lcov',
		'text',
	],
	coverageThreshold: {
		global: {
			branches: 80,
			functions: 80,
			lines: 80,
			statements: 80,
		},
	},
	moduleFileExtensions: [
		'js',
		'json',
		'ts',
	],
	moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
	transform: {
		'.*/.ts$': 'ts-jest',
	},
	testMatch: [
		'<rootDir>/src/**/*.spec.[jt]s',
		'<rootDir>/test/**/*.spec.[jt]s',
	],
	setupFiles: [
		'<rootDir>/test/index.ts',
	],
	setupFilesAfterEnv: [
		'jest-extended',
	],
};
