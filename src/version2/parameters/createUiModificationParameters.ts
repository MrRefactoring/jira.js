import { z } from 'zod';
import { UiModificationContextDetailsSchema } from './uiModificationContextDetails';

export const CreateUiModificationParametersSchema = z.object({
  /** List of contexts of the UI modification. The maximum number of contexts is 1000. */
  contexts: z.array(UiModificationContextDetailsSchema).optional(),
  /** The data of the UI modification. The maximum size of the data is 50000 characters. */
  data: z.string().optional(),
  /** The description of the UI modification. The maximum length is 255 characters. */
  description: z.string().optional(),
  /** The name of the UI modification. The maximum length is 255 characters. */
  name: z.string(),
});

export type CreateUiModificationParameters = z.infer<typeof CreateUiModificationParametersSchema>;
