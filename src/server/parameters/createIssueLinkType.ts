import { z } from 'zod';
import { IssueLinkTypeJsonSchema } from '../models';

export const CreateIssueLinkTypeSchema = z.object(IssueLinkTypeJsonSchema.shape);

export type CreateIssueLinkType = z.input<typeof CreateIssueLinkTypeSchema>;
