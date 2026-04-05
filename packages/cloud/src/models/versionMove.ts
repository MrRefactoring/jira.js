import { z } from 'zod';

export const VersionMoveSchema = z.object({
  /** The URL (self link) of the version after which to place the moved version. Cannot be used with `position`. */
  after: z.url().optional(),
  /** An absolute position in which to place the moved version. Cannot be used with `after`. */
  position: z.enum(['Earlier', 'Later', 'First', 'Last']).optional(),
});

export type VersionMove = z.infer<typeof VersionMoveSchema>;
