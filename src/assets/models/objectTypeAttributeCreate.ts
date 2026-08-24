import { z } from 'zod';
import { apiObject } from '#/core';
/** Input entity to create an object type attribute */

export const ObjectTypeAttributeCreateSchema = apiObject({
  name: z.string(),
  label: z.boolean().optional(),
  description: z.string().optional(),
  /**
   * | Value | Description      |
   * | ----- | ---------------- |
   * | 0     | Default          |
   * | 1     | Object reference |
   * | 2     | User             |
   * | 4     | Group            |
   * | 7     | Status           |
   */
  type: z.number(),
  /**
   * | Id  | Description (mandatory if type = Default) |
   * | --- | ----------------------------------------- |
   * | -1  | None                                      |
   * | 0   | Text                                      |
   * | 1   | Integer                                   |
   * | 2   | Boolean                                   |
   * | 3   | Double                                    |
   * | 4   | Date                                      |
   * | 5   | Time                                      |
   * | 6   | DateTime                                  |
   * | 7   | Url                                       |
   * | 8   | Email                                     |
   * | 9   | Textarea                                  |
   * | 10  | Select                                    |
   * | 11  | IP Address                                |
   */
  defaultTypeId: z.number().optional(),
  /** It is mandatory for Type = Object reference and should point to the referenced object type id */
  typeValue: z.string().optional(),
  /** Valid for Type User. The Jira groups to restrict selection to */
  typeValueMulti: z.array(z.string()).optional(),
  /**
   * Valid for Type Url, User, Object and Confluence. For Url (DISABLED, ENABLED), for Object (ReferenceTypeId), for
   * User (SHOW_PROFILE, HIDE_PROFILE), for Confluence (Confluence Space Id). It is mandatory for Type = Object
   * reference
   */
  additionalValue: z.string().optional(),
  /** Valid for Type Email, Select, Object, User, Group, Version and Project */
  minimumCardinality: z.number().optional(),
  /** Valid for Type Email, Select, Object, User, Group, Version and Project */
  maximumCardinality: z.number().optional(),
  /** Valid for Integer and Double object type attributes */
  suffix: z.string().optional(),
  /**
   * Valid for Type = Object reference and describes if children object types should be included in the selectable
   * objects as well
   */
  includeChildObjectTypes: z.boolean().optional(),
  /** Hide the object type attributes for Assets Users */
  hidden: z.boolean().optional(),
  /** Should the values be unique for object attributes associated with this object type attribute */
  uniqueAttribute: z.boolean().optional(),
  /** Valid for Type Integer and Double. Should a sum be included in the view */
  summable: z.boolean().optional(),
  /** Valid for Type Text and Email */
  regexValidation: z.string().optional(),
  /** Valid for Type object reference. Allows specifying an AQL query to restrict which objects are selectable. */
  qlQuery: z.string().optional(),
  /** Valid for Type Select. A comma separated list of all chosable options */
  options: z.string().optional(),
});

export type ObjectTypeAttributeCreate = z.infer<typeof ObjectTypeAttributeCreateSchema>;
