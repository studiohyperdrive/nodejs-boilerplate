// Import the test.env environment file and override process.env
import { default as dotenv } from 'dotenv';
import { readFileSync } from 'fs';

const env = dotenv.parse(readFileSync('.env/test.env'));

for (const key in env) {
	process.env[key] = env[key];
}
