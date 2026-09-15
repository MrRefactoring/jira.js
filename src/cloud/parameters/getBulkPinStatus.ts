import { z } from 'zod';
import { ForgePanelProjectPinStatusRequestSchema } from '../models';

export const GetBulkPinStatusSchema = z.object(ForgePanelProjectPinStatusRequestSchema.shape);

export type GetBulkPinStatus = z.input<typeof GetBulkPinStatusSchema>;
