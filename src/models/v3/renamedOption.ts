import { RenamedCascadingOption } from './renamedCascadingOption';

export interface RenamedOption {
  value: string;
  newValue: string;
  cascadingOptions?: RenamedCascadingOption[];
}
