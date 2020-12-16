import { SecurityLevel } from './securityLevel';

/**
 * Details about a security scheme. */
export interface SecurityScheme {
  /** The URL of the issue security scheme. */
  self?: string;
  /** The ID of the issue security scheme. */
  id?: number;
  /** The name of the issue security scheme. */
  name?: string;
  /** The description of the issue security scheme. */
  description?: string;
  /** The ID of the default security level. */
  defaultSecurityLevelId?: number;
  levels?: SecurityLevel[];
}
