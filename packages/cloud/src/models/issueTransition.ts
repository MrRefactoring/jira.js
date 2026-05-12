import { z } from 'zod';
import { StatusDetailsSchema } from '#/models/statusDetails';

/** Details of an issue transition. */
export const IssueTransitionSchema = z.object({
  /** Expand options that include additional transition details in the response. */
  expand: z.string().optional(),
  /**
   * Details of the fields associated with the issue transition screen. Use this information to populate `fields` and
   * `update` in a transition request.
   */
  fields: z.record(z.string(), z.any()).optional(),
  /** Whether there is a screen associated with the issue transition. */
  hasScreen: z.boolean().optional(),
  /** The ID of the issue transition. Required when specifying a transition to undertake. */
  id: z.string().optional(),
  /** Whether the transition is available to be performed. */
  isAvailable: z.boolean().optional(),
  /** Whether the issue has to meet criteria before the issue transition is applied. */
  isConditional: z.boolean().optional(),
  /** Whether the issue transition is global, that is, the transition is applied to issues regardless of their status. */
  isGlobal: z.boolean().optional(),
  /** Whether this is the initial issue transition for the workflow. */
  isInitial: z.boolean().optional(),
  looped: z.boolean().optional(),
  /** The name of the issue transition. */
  name: z.string().optional(),
  to: StatusDetailsSchema.optional(),
});

export type IssueTransition = z.infer<typeof IssueTransitionSchema>;
