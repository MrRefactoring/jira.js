import { z } from 'zod';
import { UiModificationContextDetailsSchema } from './uiModificationContextDetails';

/** The details of a UI modification. */
export const UiModificationDetailsSchema = z.object({
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts: z.array(UiModificationContextDetailsSchema).optional(),
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data: z.string().optional(),
  /** The description of the UI modification. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The ID of the UI modification. */
  id: z.string(),
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: z.string(),
  /** The URL of the UI modification. */
  self: z.string(),
});

export type UiModificationDetails = z.infer<typeof UiModificationDetailsSchema>;
