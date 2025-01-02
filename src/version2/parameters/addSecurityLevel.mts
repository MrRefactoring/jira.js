import { AddSecuritySchemeLevelsRequest } from '../models/index.mjs';

export interface AddSecurityLevel extends AddSecuritySchemeLevelsRequest {
  /** The ID of the issue security scheme. */
  schemeId: string;
}
