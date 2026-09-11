import { z } from 'zod';
import { apiObject } from '#/core';
import { RemoteEntityLinkJsonSchema } from './remoteEntityLinkJson';

export const RemoteEntityLinksJsonSchema = apiObject({
  links: z.array(RemoteEntityLinkJsonSchema).optional(),
});

export type RemoteEntityLinksJson = z.infer<typeof RemoteEntityLinksJsonSchema>;
