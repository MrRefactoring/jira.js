import { z } from 'zod';
import { ForgePanelProjectPinRequestSchema } from '../models';

export const BulkPinUnpinProjectsAsyncSchema = z.object({}).extend(ForgePanelProjectPinRequestSchema.shape);

export type BulkPinUnpinProjectsAsync = z.input<typeof BulkPinUnpinProjectsAsyncSchema>;
