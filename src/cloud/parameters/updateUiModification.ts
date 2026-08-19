import { z } from 'zod';
import { UpdateUiModificationDetailsSchema } from '../models';

export const UpdateUiModificationSchema = z.object(UpdateUiModificationDetailsSchema.shape).extend({
  /** The ID of the UI modification. */
  uiModificationId: z.string(),
});

export type UpdateUiModification = z.input<typeof UpdateUiModificationSchema>;
