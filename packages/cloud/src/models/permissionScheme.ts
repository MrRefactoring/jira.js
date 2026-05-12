import { z } from 'zod';
import { PermissionGrantSchema } from '#/models/permissionGrant';
import { ScopeSchema } from '#/models/scope';

/** Details of a permission scheme. */
export const PermissionSchemeSchema = z.object({
  /** A description for the permission scheme. */
  description: z.string().optional(),
  /** The expand options available for the permission scheme. */
  expand: z.string().optional(),
  /** The ID of the permission scheme. */
  id: z.number().optional(),
  /** The name of the permission scheme. Must be unique. */
  name: z.string(),
  /**
   * The permission scheme to create or update. See [About permission schemes and
   * grants](https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-permission-schemes/#about-permission-schemes-and-grants)
   * for more information.
   */
  permissions: z.array(PermissionGrantSchema).optional(),
  scope: ScopeSchema.optional(),
  /** The URL of the permission scheme. */
  self: z.url().optional(),
});

export type PermissionScheme = z.infer<typeof PermissionSchemeSchema>;
