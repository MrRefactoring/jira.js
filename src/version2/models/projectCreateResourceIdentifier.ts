/**
 * Every project-created entity has an ID that must be unique within the scope of the project creation. PCRI (Project
 * Create Resource Identifier) is a standard format for creating IDs and references to other project entities. PCRI
 * format is defined as follows: pcri:[entityType]:[type]:[entityId] entityType - the type of an entity, e.g. status,
 * role, workflow type - PCRI type, either `id` - The ID of an entity that already exists in the target site, or `ref` -
 * A unique reference to an entity that is being created entityId - entity identifier, if type is `id` - must be an
 * existing entity ID that exists in the Jira site, if `ref` - must be unique across all entities in the scope of this
 * project template creation
 */
export interface ProjectCreateResourceIdentifier {
  anID?: boolean;
  areference?: boolean;
  entityId?: string;
  entityType?: string;
  id?: string;
  type?: 'id' | 'ref' | string;
}
