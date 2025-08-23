import { z } from 'zod';

/** Identifiers for a UI modification. */
export const UiModificationIdentifiersSchema = z.object({
  /** The ID of the UI modification. */
  id: z.string(),
  /** The URL of the UI modification. */
  self: z.string(),
});

export type UiModificationIdentifiers = z.infer<typeof UiModificationIdentifiersSchema>;
