import { z } from 'zod';
import { apiObject, openEnum } from '#/core';
/** SCIM metadata */

export const ScimMetadataSchema = apiObject({
  /** The name of the resource type of the resource. This is a read-only and case-sensitive field. */
  resourceType: openEnum(['USER', 'GROUP', 'DIRECTORY']).optional(),
  /** The URI of the resource being returned. This is a read-only field. */
  location: z.string().optional(),
  /** The most recent DateTime that the details of this resource were updated. This is a read-only field. */
  lastModified: z.coerce.date().optional(),
  /** The DateTime that the resource was added to Atlassian SCIM service. This is a read-only field. */
  created: z.coerce.date().optional(),
});

export type ScimMetadata = z.infer<typeof ScimMetadataSchema>;
