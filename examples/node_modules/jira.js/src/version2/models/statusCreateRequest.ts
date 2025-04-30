import type { StatusCreate } from './statusCreate';
import type { StatusScope } from './statusScope';

/** Details of the statuses being created and their scope. */
export interface StatusCreateRequest {
  scope: StatusScope;
  /** Details of the statuses being created. */
  statuses: StatusCreate[];
}
