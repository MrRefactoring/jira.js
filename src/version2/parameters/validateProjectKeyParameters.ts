import { z } from 'zod';

export const ValidateProjectKeyParametersSchema = z.object({
  /** The project key. */
  key: z.string().optional(),
});

export type ValidateProjectKeyParameters = z.infer<typeof ValidateProjectKeyParametersSchema>;
