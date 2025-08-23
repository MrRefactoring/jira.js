import { z } from 'zod';

export const UpdateProjectEmailParametersSchema = z.object({
  /** The project ID. */
  projectId: z.number().int(),
  /** The email address. */
  emailAddress: z.string().optional(),
  /** When using a custom domain, the status of the email address. */
  emailAddressStatus: z.array(z.string()).optional(),
});

export type UpdateProjectEmailParameters = z.infer<typeof UpdateProjectEmailParametersSchema>;
