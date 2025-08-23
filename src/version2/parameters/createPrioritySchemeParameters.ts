import { z } from 'zod';

export const CreatePrioritySchemeParametersSchema = z.object({
  /** The ID of the default priority for the priority scheme. */
  defaultPriorityId: z.number().int(),
  /** The description of the priority scheme. */
  description: z.string().optional(),
  /**
   * Instructions to migrate the priorities of issues.
   *
   * `in` mappings are used to migrate the priorities of issues to priorities used within the priority scheme.
   *
   * `out` mappings are used to migrate the priorities of issues to priorities not used within the priority scheme.
   *
   * - When **priorities** are **added** to the new priority scheme, no mapping needs to be provided as the new priorities
   *   are not used by any issues.
   * - When **priorities** are **removed** from the new priority scheme, no mapping needs to be provided as the removed
   *   priorities are not used by any issues.
   * - When **projects** are **added** to the priority scheme, the priorities of issues in those projects might need to be
   *   migrated to new priorities used by the priority scheme. This can occur when the current scheme does not use all
   *   the priorities in the project(s)' priority scheme(s).
   *
   *   - An `in` mapping must be provided for each of these priorities.
   * - When **projects** are **removed** from the priority scheme, no mapping needs to be provided as the removed projects
   *   are not using the priorities of the new priority scheme.
   *
   * For more information on `in` and `out` mappings, see the child properties documentation for the `PriorityMapping`
   * object below.
   */
  mappings: z.unknown().optional(),
  /** The name of the priority scheme. Must be unique. */
  name: z.string(),
  /** The IDs of priorities in the scheme. */
  priorityIds: z.array(z.number().int()),
  /** The IDs of projects that will use the priority scheme. */
  projectIds: z.array(z.number().int()).optional(),
});

export type CreatePrioritySchemeParameters = z.infer<typeof CreatePrioritySchemeParametersSchema>;
