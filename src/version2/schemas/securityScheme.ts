import { z } from 'zod';
import { SecurityLevelSchema } from './securityLevel';

/** Details about a security scheme. */
export const SecuritySchemeSchema = z.object({
  /** The ID of the default security level. */
  defaultSecurityLevelId: z.number().int().optional(),
  /** The description of the issue security scheme. */
  description: z.string().optional(),
  /** The ID of the issue security scheme. */
  id: z.number().int().optional(),
  levels: z.array(SecurityLevelSchema).optional(),
  /** The name of the issue security scheme. */
  name: z.string().optional(),
  /** The URL of the issue security scheme. */
  self: z.string().optional(),
});

export type SecurityScheme = z.infer<typeof SecuritySchemeSchema>;
