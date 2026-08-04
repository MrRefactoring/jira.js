import { z } from 'zod';
import { apiObject } from '#/core';
import { ScopeSchema } from './scope';
/** Details about an issue type. */

export const IssueTypeDetailsSchema = apiObject({
  /** The ID of the issue type's avatar. */
  avatarId: z.number().optional(),
  /** The description of the issue type. */
  description: z.string().optional(),
  /** Unique ID for next-gen projects. */
  entityId: z.string().optional(),
  /** Hierarchy level of the issue type. */
  hierarchyLevel: z.number().optional(),
  /** The URL of the issue type's avatar. */
  iconUrl: z.string().optional(),
  /** The ID of the issue type. */
  id: z.string().optional(),
  /** The name of the issue type. */
  name: z.string().optional(),
  scope: ScopeSchema.optional(),
  /** The URL of these issue type details. */
  self: z.string().optional(),
  /** Whether this issue type is used to create subtasks. */
  subtask: z.boolean().optional(),
  untranslatedName: z.string().optional(),
});

export type IssueTypeDetails = z.infer<typeof IssueTypeDetailsSchema>;
