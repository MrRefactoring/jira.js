import { StatusCreate } from './statusCreate';
import { StatusScope } from './statusScope';

/** Details of the statuses being created and their scope. */
export interface StatusCreateRequest {
  /** Details of the statuses being created. */
  statuses: StatusCreate[];
  scope: StatusScope;
}
