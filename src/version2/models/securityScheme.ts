import type { SecurityLevel } from './securityLevel';

/** Details about a security scheme. */
export interface SecurityScheme {
  /** The ID of the default security level. */
  defaultSecurityLevelId?: number;
  /** The description of the issue security scheme. */
  description?: string;
  /** The ID of the issue security scheme. */
  id?: number;
  levels?: SecurityLevel[];
  /** The name of the issue security scheme. */
  name?: string;
  /** The URL of the issue security scheme. */
  self?: string;
}
