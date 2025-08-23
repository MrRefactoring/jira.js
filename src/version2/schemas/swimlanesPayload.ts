import { z } from 'zod';
import { SwimlanePayloadSchema } from './swimlanePayload';

/** The payload for customising a swimlanes on a board */
export const SwimlanesPayloadSchema = z.object({
  /** The custom swimlane definitions. */
  customSwimlanes: z.array(SwimlanePayloadSchema).optional(),
  /** The name of the custom swimlane to use for work items that don't match any other swimlanes. */
  defaultCustomSwimlaneName: z.string().optional(),
  /** The swimlane strategy for the board. */
  swimlaneStrategy: z
    .enum([
      'none',
      'custom',
      'parentChild',
      'assignee',
      'assigneeUnassignedFirst',
      'epic',
      'project',
      'issueparent',
      'issuechildren',
      'request_type',
    ])
    .optional(),
});

export type SwimlanesPayload = z.infer<typeof SwimlanesPayloadSchema>;
