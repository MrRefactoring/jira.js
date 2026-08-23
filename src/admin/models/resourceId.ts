import { z } from 'zod';
/**
 * The resource ID from the role assignment relationship. The resource ID is in the Atlassian Resource Identifier (ARI)
 * format.
 */

export const ResourceIdSchema = z.string();

export type ResourceId = z.infer<typeof ResourceIdSchema>;
