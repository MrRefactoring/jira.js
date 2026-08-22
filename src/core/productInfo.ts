/**
 * The handful of places where the shared core has to name its own product.
 *
 * This file is generated. Nothing else under `core/` names a product: whatever has to differ is read from here, so
 * a library can take a newer core without a rename. The libraries are not obliged to be on the same core generation,
 * and in practice they are not.
 */
export interface ProductInfo {
  packageName: string;
  gatewaySlug: string;
  scopeHint: string;
}

/** Typed as plain strings on purpose: a product may leave the optional fields empty, and the code must still check. */
export const PRODUCT: ProductInfo = {
  /** The npm package name, e.g. `confluence.js`. */
  packageName: 'jira.js',

  /**
   * The Atlassian gateway slug, as in `https://api.atlassian.com/ex/<slug>/{cloudId}`.
   *
   * Empty for products that are not behind the Atlassian gateway, where OAuth 2.0 (3LO) does not apply.
   */
  gatewaySlug: 'jira',

  /** Product-specific advice appended to a scope-mismatch 401, where the scope families differ per product. */
  scopeHint: 'Jira scopes are granted per operation rather than per API version — the scope the failing operation names in its API documentation is the one to add.',
};

/**
 * The package name reduced to something safe inside a multipart boundary and a symbol key.
 *
 * A boundary may not contain a dot without being quoted, and `confluence.js` has one.
 */
export const PRODUCT_SLUG = PRODUCT.packageName.replace(/[^a-zA-Z0-9]+/g, '-');
