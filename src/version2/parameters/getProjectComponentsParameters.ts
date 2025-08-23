import { z } from 'zod';

export const GetProjectComponentsParametersSchema = z.object({
  /** The project ID or project key (case sensitive). */
  projectIdOrKey: z.string(),
  /**
   * The source of the components to return. Can be `jira` (default), `compass` or `auto`. When `auto` is specified, the
   * API will return connected Compass components if the project is opted into Compass, otherwise it will return Jira
   * components. Defaults to `jira`.
   */
  componentSource: z.enum(['jira', 'compass', 'auto']).optional(),
});

export type GetProjectComponentsParameters = z.infer<typeof GetProjectComponentsParametersSchema>;
