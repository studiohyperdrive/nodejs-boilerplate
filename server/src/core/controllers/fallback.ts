import { NotFoundError } from '~shared/helpers/error';
import { INext, IRequest, IResponse } from '~shared/shared.types';

export class FallbackController {
	// Get fallback
	public get(req: IRequest, res: IResponse, next: INext): IResponse | void {
		return next(new NotFoundError());
	}
}
