import { z } from 'zod';

export const GetValidProjectKeyParametersSchema = z.object({
  /** The project key. */
  key: z.string().optional(),
});

export type GetValidProjectKeyParameters = z.infer<typeof GetValidProjectKeyParametersSchema>;
