/** A project's sender email address. */
export interface ProjectEmailAddress {
  /** The email address. */
  emailAddress?: string;
  /** When using a custom domain, the status of the email address. */
  emailAddressStatus?: string[];
}
