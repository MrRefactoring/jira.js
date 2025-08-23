import { z } from 'zod';
import { OldToNewSecurityLevelMappingsBeanSchema } from './oldToNewSecurityLevelMappingsBean';

/** Issue security scheme, project, and remapping details. */
export const AssociateSecuritySchemeWithProjectDetailsSchema = z.object({
  /** The list of scheme levels which should be remapped to new levels of the issue security scheme. */
  oldToNewSecurityLevelMappings: z.array(OldToNewSecurityLevelMappingsBeanSchema).optional(),
  /** The ID of the project. */
  projectId: z.string(),
  /** The ID of the issue security scheme. Providing null will clear the association with the issue security scheme. */
  schemeId: z.string(),
});

export type AssociateSecuritySchemeWithProjectDetails = z.infer<typeof AssociateSecuritySchemeWithProjectDetailsSchema>;
