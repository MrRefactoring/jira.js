import { z } from 'zod';

/** Details of scheme and new default level. */
export const DefaultLevelValueSchema = z.object({
  /**
   * The ID of the issue security level to set as default for the specified scheme. Providing null will reset the
   * default level.
   */
  defaultLevelId: z.string(),
  /** The ID of the issue security scheme to set default level for. */
  issueSecuritySchemeId: z.string(),
});

export type DefaultLevelValue = z.infer<typeof DefaultLevelValueSchema>;
