import { z } from 'zod';

export const VersionMoveBeanSchema = z.object({
  /** The URL (self link) of the version after which to place the moved version. Cannot be used with `position`. */
  after: z.string().optional(),
  /** An absolute position in which to place the moved version. Cannot be used with `after`. */
  position: z.enum(['Earlier', 'Later', 'First', 'Last']).optional(),
});

export type VersionMoveBean = z.infer<typeof VersionMoveBeanSchema>;
