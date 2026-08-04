import type { z } from 'zod';
import { apiObject } from '#/core';

export const ProjectIdAssociationContextSchema = apiObject({});

export type ProjectIdAssociationContext = z.infer<typeof ProjectIdAssociationContextSchema>;
