import { isNil } from 'ramda';

export class EnvHelper {
	public static envToBoolean(envVar: string = ''): boolean {
		this.checkEmpty(envVar);

		return process.env[envVar] === 'true';
	}

	public static envToNumber(envVar: string = ''): number {
		this.checkEmpty(envVar);

		return parseInt(process.env[envVar], 10);
	}

	public static envToArray(envVar: string = '', separator: string = ','): string[] {
		this.checkEmpty(envVar);

		return process.env[envVar].split(separator);
	}

	public static envToObject(envVar: string = ''): object {
		this.checkEmpty(envVar);

		let obj: object;
		try {
			obj = JSON.parse(process.env[envVar]);
		} catch {
			throw new Error(`Environment variable ${envVar} is not a valid JSON string`);
		}

		return obj;
	}

	private static checkEmpty(envVar: string): void {
		if (isNil(process.env[envVar]) || process.env[envVar] === '') {
			throw new Error(`Environment variable ${envVar} is not defined`);
		}
	}
}
