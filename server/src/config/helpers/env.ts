import { isNil } from 'ramda';

export class EnvHelper {
	public static envToBoolean(env: string = ''): boolean {
		this.checkEmpty(env);

		return env === 'true';
	}

	public static envToNumber(env: string = ''): number {
		this.checkEmpty(env);

		return parseInt(env, 10);
	}

	public static envToArray(env: string = '', separator: string = ','): string[] {
		this.checkEmpty(env);

		return env.split(separator);
	}

	public static envToObject(env: string = ''): object {
		this.checkEmpty(env);

		let obj: object;
		try {
			obj = JSON.parse(env);
		} catch {
			throw new Error('Environment variable is not a valid JSON string');
		}

		return obj;
	}

	private static checkEmpty(env: string): void {
		if (isNil(env) || env === '') {
			throw new Error('Environment variable is not defined');
		}
	}
}
