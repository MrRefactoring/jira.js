import { z } from 'zod';

export const RemoveModulesParametersSchema = z.object({
  /**
   * The key of the module to remove. To include multiple module keys, provide multiple copies of this parameter. For
   * example, `moduleKey=dynamic-attachment-entity-property&moduleKey=dynamic-select-field`. Nonexistent keys are
   * ignored.
   */
  moduleKey: z.array(z.string()).optional(),
});

export type RemoveModulesParameters = z.infer<typeof RemoveModulesParametersSchema>;
