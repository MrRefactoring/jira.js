import { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectDeleteInstructionsSchema = apiObject({
  grantsToDelete: z.array(z.number()).optional(),
});

export type ProjectDeleteInstructions = z.infer<typeof ProjectDeleteInstructionsSchema>;
