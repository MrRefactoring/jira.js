/** Details of a field configuration. */
export interface FieldConfiguration {
    /** The ID of the field configuration. */
    id: number;
    /** The name of the field configuration. */
    name: string;
    /** The description of the field configuration. */
    description: string;
    /** Whether the field configuration is the default. */
    isDefault?: boolean;
}
