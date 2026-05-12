import { z } from 'zod';
import { CreateUiModificationDetailsSchema } from '../models';

export const CreateUiModificationSchema = z.object({}).extend(CreateUiModificationDetailsSchema.shape);

export type CreateUiModification = z.input<typeof CreateUiModificationSchema>;
