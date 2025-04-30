import type { SecuritySchemeLevel } from './securitySchemeLevel';

export interface AddSecuritySchemeLevelsRequest {
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: SecuritySchemeLevel[];
}
