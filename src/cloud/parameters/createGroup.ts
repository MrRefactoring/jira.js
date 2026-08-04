import { z } from 'zod';
import { AddGroupSchema } from '../models';

export const CreateGroupSchema = z.object({}).extend(AddGroupSchema.shape);

export type CreateGroup = z.input<typeof CreateGroupSchema>;
