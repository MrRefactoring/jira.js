import { z } from 'zod';
import { apiObject } from '#/core';
import { ScimUserEmailSchema } from './scimUserEmail';
import { ScimUserNameSchema } from './scimUserName';
import { ScimUserPhoneNumberSchema } from './scimUserPhoneNumber';
import { ScimMetadataSchema } from './scimMetadata';
import { ScimGroupForUserSchema } from './scimGroupForUser';
import { EnterpriseUserExtensionSchema } from './enterpriseUserExtension';
import { ExternalAtlassianScimExtensionSchema } from './externalAtlassianScimExtension';
/** SCIM user */

export const ScimUserSchema = apiObject({
  /**
   * SCIM schemas that define the attributes present in the current JSON structure This is a required field during user
   * creation or modification.
   */
  schemas: z.array(z.string()).optional(),
  /**
   * Unique identifier defined by the provisioning client. Atlassian SCIM service will verify the value and guarantee
   * its uniqueness. This is a required field during user creation or modification.
   */
  userName: z.string().optional(),
  /**
   * Email addresses of the User. This is a required field during user creation or modification. One value must be
   * marked as primary.
   */
  emails: z.array(ScimUserEmailSchema).optional(),
  /**
   * Unique identifier defined by Atlassian SCIM Service. CaseExact. This is a read-only field and will be disregarded
   * if included in the payload during user creation or modification..
   */
  id: z.string().optional(),
  /** Identifier defined by provisioning client. This is a case-sensitive field. Uniqueness is controlled by client. */
  externalId: z.string().optional(),
  name: ScimUserNameSchema.optional(),
  /** User's display name. */
  displayName: z.string().optional(),
  /** User's nickname. */
  nickName: z.string().optional(),
  /** User's title. */
  title: z.string().optional(),
  /** User's preferred language. */
  preferredLanguage: z.string().optional(),
  /** User's department. */
  department: z.string().optional(),
  /** User's organization. */
  organization: z.string().optional(),
  /** User's timezone. e.g. America/Los_Angeles . */
  timezone: z.string().optional(),
  /** Phone numbers of the user. */
  phoneNumbers: z.array(ScimUserPhoneNumberSchema).optional(),
  meta: ScimMetadataSchema.optional(),
  /** Groups to which the user is associated in SCIM. */
  groups: z.array(ScimGroupForUserSchema).optional(),
  'urn:ietf:params:scim:schemas:extension:enterprise:2.0:User': EnterpriseUserExtensionSchema.optional(),
  'urn:scim:schemas:extension:atlassian-external:1.0': ExternalAtlassianScimExtensionSchema.optional(),
  /** A boolean value indicating the user's administrative status. This value will default to true if not provided. */
  active: z.boolean().optional(),
});

export type ScimUser = z.infer<typeof ScimUserSchema>;
