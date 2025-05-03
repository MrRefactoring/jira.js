import type { SecuritySchemeLevel } from './securitySchemeLevel';

/** Issue security scheme and it's details */
export interface CreateIssueSecuritySchemeDetails {
  /** The description of the issue security scheme. */
  description?: string;
  /** The list of scheme levels which should be added to the security scheme. */
  levels?: SecuritySchemeLevel[];
  /** The name of the issue security scheme. Must be unique (case-insensitive). */
  name: string;
}
