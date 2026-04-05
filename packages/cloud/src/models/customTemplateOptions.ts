import { z } from 'zod';

export const CustomTemplateOptionsSchema = z.object({
  /**
   * Enable screen delegated admin support for the template. This means screen and associated schemes will be copied
   * rather than referenced.
   */
  enableScreenDelegatedAdminSupport: z.boolean().optional(),
  /**
   * Enable workflow delegated admin support for the template. This means workflows and workflow schemes will be copied
   * rather than referenced.
   */
  enableWorkflowDelegatedAdminSupport: z.boolean().optional(),
});

export type CustomTemplateOptions = z.infer<typeof CustomTemplateOptionsSchema>;
