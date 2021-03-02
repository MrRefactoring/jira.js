import { ProjectIds } from '../models';

export interface AssignProjectsToCustomFieldContext extends ProjectIds {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
