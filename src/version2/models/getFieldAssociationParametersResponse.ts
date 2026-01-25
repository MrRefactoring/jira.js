import type { FieldAssociationParameters } from './fieldAssociationParameters';
import type { WorkTypeParameters } from './workTypeParameters';

/** Response object for getting field association parameters. */
export interface GetFieldAssociationParametersResponse {
  fieldId: string;
  parameters?: FieldAssociationParameters;
  workTypeParameters?: WorkTypeParameters[];
}
