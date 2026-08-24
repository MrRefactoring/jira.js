import { z } from 'zod';
import { apiObject } from '#/core';
/** SCIM user name */

export const ScimUserNameSchema = apiObject({
  /** The full name, including all middle names, titles, and suffixes as appropriate, formatted for display. */
  formatted: z.string().optional(),
  /** The family name of the User. */
  familyName: z.string().optional(),
  /** The given name of the User. */
  givenName: z.string().optional(),
  /** The middle name(s) of the User. */
  middleName: z.string().optional(),
  /** The honorific prefix(es) of the User, or title in most Western languages. */
  honorificPrefix: z.string().optional(),
  /** The honorific suffix(es) of the User, or suffix in most Western languages. */
  honorificSuffix: z.string().optional(),
});

export type ScimUserName = z.infer<typeof ScimUserNameSchema>;
