import type { SecuritySchemeLevel } from './securitySchemeLevel.js';

export interface AddSecuritySchemeLevelsRequest {
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: SecuritySchemeLevel[];
}
