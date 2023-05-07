/** Details of an issue level security item. */
export interface SecurityLevel {
  /** The description of the issue level security item. */
  description?: string;
  /** The ID of the issue level security item. */
  id?: string;
  /** Whether the issue level security item is the default. */
  isDefault?: boolean;
  /** The ID of the issue level security scheme. */
  issueSecuritySchemeId?: string;
  /** The name of the issue level security item. */
  name?: string;
  /** The URL of the issue level security item. */
  self?: string;
}
