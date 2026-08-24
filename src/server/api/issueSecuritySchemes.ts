import { SecuritySchemesJsonSchema, type SecuritySchemesJson } from '../models/securitySchemesJson';
import { SecuritySchemeJsonSchema, type SecuritySchemeJson } from '../models/securitySchemeJson';
import type { GetIssueSecurityScheme } from '../parameters/getIssueSecurityScheme';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/** Returns all issue security schemes that are defined. */
export async function getIssueSecuritySchemes(client: Client, options?: RequestOptions): Promise<SecuritySchemesJson> {
  const config: SendRequestOptions<SecuritySchemesJson> = {
    url: '/rest/api/2/issuesecurityschemes',
    method: 'GET',
    schema: SecuritySchemesJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Returns the issue security scheme along with that are defined. */
export async function getIssueSecurityScheme(
  client: Client,
  parameters: GetIssueSecurityScheme,
  options?: RequestOptions,
): Promise<SecuritySchemeJson> {
  const config: SendRequestOptions<SecuritySchemeJson> = {
    url: `/rest/api/2/issuesecurityschemes/${parameters.id}`,
    method: 'GET',
    schema: SecuritySchemeJsonSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
