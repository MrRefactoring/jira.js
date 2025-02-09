import { SecuritySchemeLevelBean } from './securitySchemeLevelBean';

export interface AddSecuritySchemeLevelsRequestBean {
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: SecuritySchemeLevelBean[];
}
