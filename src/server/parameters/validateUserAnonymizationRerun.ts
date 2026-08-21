import { z } from 'zod';

export const ValidateUserAnonymizationRerunSchema = z.object({
  /** Parameter used to include parts of the response. */
  expand: z.string().optional(),
  /**
   * User key before anonymization, only needed when current value is anonymized. If there is no old key, e.g. because
   * the user was already created using the new key generation strategy, provide a value equal to the current key.
   */
  oldUserKey: z.string().optional(),
  /**
   * User name before anonymization, only needed when the current value is anonymized. If there is no old name, provide
   * a value equal to the current name.
   */
  oldUserName: z.string().optional(),
  /** The key of the user to validate anonymization for. */
  userKey: z.string().optional(),
});

export type ValidateUserAnonymizationRerun = z.input<typeof ValidateUserAnonymizationRerunSchema>;
