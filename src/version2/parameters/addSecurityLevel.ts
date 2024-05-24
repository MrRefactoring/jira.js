import type { AddSecuritySchemeLevelsRequest } from '../models/index.js';

export interface AddSecurityLevel extends AddSecuritySchemeLevelsRequest {
  /** The ID of the issue security scheme. */
  schemeId: string;
}
