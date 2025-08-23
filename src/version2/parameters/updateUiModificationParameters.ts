import { z } from 'zod';
import { UiModificationContextDetailsSchema } from './uiModificationContextDetails';

export const UpdateUiModificationParametersSchema = z.object({
  /** The ID of the UI modification. */
  uiModificationId: z.string(),
  /**
   * List of contexts of the UI modification. The maximum number of contexts is 1000. If provided, replaces all existing
   * contexts.
   */
  contexts: z.array(UiModificationContextDetailsSchema).optional(),
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data: z.string().optional(),
  /** The description of the UI modification. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: z.string().optional(),
});

export type UpdateUiModificationParameters = z.infer<typeof UpdateUiModificationParametersSchema>;
