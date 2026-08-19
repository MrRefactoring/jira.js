import { pageSchema, type Page } from './page';
import { SlaInformationSchema, type SlaInformation } from './slaInformation';

export const PagedSlaInformationSchema = pageSchema(SlaInformationSchema);

/**
 * @deprecated Use `Page<SlaInformation>`, which describes the same shape. This alias is removed in the next major
 *   version.
 */
export type PagedSlaInformation = Page<SlaInformation>;
