import { z } from 'zod';
import { UpdateUiModificationDetailsSchema } from '../models';

export const UpdateUiModificationSchema = z
  .object({
    /** The ID of the UI modification. */
    uiModificationId: z.string(),
  })
  .extend(UpdateUiModificationDetailsSchema.shape);

export type UpdateUiModification = z.input<typeof UpdateUiModificationSchema>;
