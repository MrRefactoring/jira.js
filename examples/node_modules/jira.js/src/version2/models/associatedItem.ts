/** Details of an item associated with the changed record. */
export interface AssociatedItem {
  /** The ID of the associated record. */
  id?: string;
  /** The name of the associated record. */
  name?: string;
  /** The ID of the associated parent record. */
  parentId?: string;
  /** The name of the associated parent record. */
  parentName?: string;
  /** The type of the associated record. */
  typeName?: string;
}
