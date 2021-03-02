import { OrderOfCustomFieldOptions } from '../models';

export interface ReorderCustomFieldOptions extends OrderOfCustomFieldOptions {
  /** The ID of the custom field. */
  fieldId: string;
  /** The ID of the context. */
  contextId: number;
}
