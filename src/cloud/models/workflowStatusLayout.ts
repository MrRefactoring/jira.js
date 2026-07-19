import { z } from 'zod';
import { apiObject } from '#/core';
/** The x and y location of the status in the workflow. */

export const WorkflowStatusLayoutSchema = apiObject({
  /** The x axis location. */
  x: z.number().nullish(),
  /** The y axis location. */
  y: z.number().nullish(),
});

export type WorkflowStatusLayout = z.infer<typeof WorkflowStatusLayoutSchema>;
