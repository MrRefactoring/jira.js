import type { StatusCreate } from './statusCreate.js';
import type { StatusScope } from './statusScope.js';

/** Details of the statuses being created and their scope. */
export interface StatusCreateRequest {
  scope: StatusScope;
  /** Details of the statuses being created. */
  statuses: StatusCreate[];
}
