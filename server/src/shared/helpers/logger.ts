// Temporary require statement: @studiohyperdrive/logger should export an ESModule bundle for Node.js
const Logger = require('@studiohyperdrive/logger'); // tslint:disable-line variable-name

import { Config } from '@config/config.types';
import { default as config } from '@config';

const cfg: Config = config();

export const logger = new Logger(cfg.logger);
