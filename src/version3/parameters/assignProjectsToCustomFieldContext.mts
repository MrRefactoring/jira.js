import { ProjectIds } from '../models/index.mjs';

export interface AssignProjectsToCustomFieldContext extends ProjectIds {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
