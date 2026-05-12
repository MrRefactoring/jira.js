import { z } from 'zod';

export const ProjectIdAssociationContextSchema = z.object({});

export type ProjectIdAssociationContext = z.infer<typeof ProjectIdAssociationContextSchema>;
