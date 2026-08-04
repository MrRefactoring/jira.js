import { z } from 'zod';
import { IssueLinkTypeSchema } from '../models';

export const CreateIssueLinkTypeSchema = z.object({}).extend(IssueLinkTypeSchema.shape);

export type CreateIssueLinkType = z.input<typeof CreateIssueLinkTypeSchema>;
