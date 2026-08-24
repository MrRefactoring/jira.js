import { z } from 'zod';
import { RemoteReciprocalIssueLinkCreateRequestSchema } from '../models';

export const CreateReciprocalRemoteIssueLinkSchema = z.object(RemoteReciprocalIssueLinkCreateRequestSchema.shape);

export type CreateReciprocalRemoteIssueLink = z.input<typeof CreateReciprocalRemoteIssueLinkSchema>;
