import type { StatusCreate } from './statusCreate.mjs';
import type { StatusScope } from './statusScope.mjs';

/** Details of the statuses being created and their scope. */
export interface StatusCreateRequest {
  /** Details of the statuses being created. */
  statuses: StatusCreate[];
  scope: StatusScope;
}
