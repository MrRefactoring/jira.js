import { z } from 'zod';
import { apiObject } from '#/core';
/** The input attribute values */

export const ObjectAttributeValueInSchema = apiObject({
  /**
   * | Type (of the object type attribute) | Description                                                                                                                                                                                    |
   * | ----------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   * | Default                             | The value must be of a valid format based on the additional type of the object type attribute, like Text, Integer, URL, Email etc. for date and datetime the value should be in ISO8601 format |
   * | Object                              | The value is the Object Key to set                                                                                                                                                             |
   * | User                                | The value is the Jira User key to set                                                                                                                                                          |
   * | Group                               | The value is the Jira Group key to set                                                                                                                                                         |
   * | Status                              | The value is the Status ID in Assets                                                                                                                                                           |
   */
  value: z.string(),
});

export type ObjectAttributeValueIn = z.infer<typeof ObjectAttributeValueInSchema>;
