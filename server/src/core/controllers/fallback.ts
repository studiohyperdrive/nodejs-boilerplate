import { IRequest, IResponse, INext } from '@shared/shared.types';
import { NotFoundError } from '@shared/helpers/error';

export class FallbackController {
	// Get fallback
	public get(req: IRequest, res: IResponse, next: INext): IResponse | void {
		return next(new NotFoundError());
	}
}
