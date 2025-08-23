import { z } from 'zod';

export const DeleteProjectPropertyParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The project property key. Use [Get project property keys](#api-rest-api-2-project-projectIdOrKey-properties-get) to
   * get a list of all project property keys.
   */
  propertyKey: z.string(),
});

export type DeleteProjectPropertyParameters = z.infer<typeof DeleteProjectPropertyParametersSchema>;
