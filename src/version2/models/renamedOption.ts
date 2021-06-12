import { RenamedCascadingOption } from './renamedCascadingOption';

/** Details of a custom field option to rename. */
export interface RenamedOption {
  /** The current option value. */
  value: string;
  /** The new value of the option. */
  newValue: string;
  /** The new values for the cascading options of this option. Only used for Select List (cascading) fields. */
  cascadingOptions?: RenamedCascadingOption[];
}
