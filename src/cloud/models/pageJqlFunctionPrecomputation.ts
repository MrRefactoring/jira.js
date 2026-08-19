import { pageSchema, type Page } from './page';
import { JqlFunctionPrecomputationSchema, type JqlFunctionPrecomputation } from './jqlFunctionPrecomputation';

export const PageJqlFunctionPrecomputationSchema = pageSchema(JqlFunctionPrecomputationSchema);

/**
 * @deprecated Use `Page<JqlFunctionPrecomputation>`, which describes the same shape. This alias is removed in the next
 *   major version.
 */
export type PageJqlFunctionPrecomputation = Page<JqlFunctionPrecomputation>;
