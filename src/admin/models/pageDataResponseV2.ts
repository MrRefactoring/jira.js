import { z } from 'zod';
import { apiObject } from '#/core';
import { WorkspaceModelSchema } from './workspaceModel';
import { LinkPageModelSchema } from './linkPageModel';
import { MetaV2Schema } from './metaV2';

export const PageDataResponseV2Schema = apiObject({
  data: z.array(WorkspaceModelSchema).optional(),
  links: LinkPageModelSchema.optional(),
  meta: MetaV2Schema.optional(),
});

export type PageDataResponseV2 = z.infer<typeof PageDataResponseV2Schema>;
