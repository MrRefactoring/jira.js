import { z } from 'zod';

/** Request to fetch precomputations by ID. */
export const JqlFunctionPrecomputationGetByIdRequestSchema = z.object({
  precomputationIDs: z.array(z.string()).optional(),
});

export type JqlFunctionPrecomputationGetByIdRequest = z.infer<typeof JqlFunctionPrecomputationGetByIdRequestSchema>;
