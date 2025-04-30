import type { AddSecuritySchemeLevelsRequest } from '../models';

export interface AddSecurityLevel extends AddSecuritySchemeLevelsRequest {
  /** The ID of the issue security scheme. */
  schemeId: string;
}
