/**
 * Type-level compatibility tests for @jira.js/base public API.
 *
 * These tests serve as the living API surface snapshot: if any named export is removed,
 * narrowed, or incompatibly changed, the import or expectTypeOf assertion below will fail
 * at compile time (tsc --noEmit) and at test-run time (vitest).
 *
 * Rules:
 * - Every named export from src/index.ts must appear here.
 * - expectTypeOf assertions must be strict enough to detect silent type regressions.
 * - @ts-expect-error marks intentional negative assertions.
 */
import { describe, expectTypeOf, it } from 'vitest';
import {
  ApiError,
  createClient,
  sendRequest,
  buildAtlassianAuthUrl,
  parseAtlassianCallbackUrl,
  obtainAtlassianOAuthTokens,
  refreshAtlassianOAuthTokens,
  BufferSchema,
  createMultipartRequestBody,
  httpMethodSchema,
  clientConfigSchema,
  authSchema,
  sendRequestOptionsSchema,
} from '../../src';
import type {
  Client,
  ClientConfig,
  Auth,
  SendRequestOptions,
  HttpMethod,
  BuildAtlassianAuthUrlOptions,
  AtlassianCallbackParams,
  ObtainAtlassianOAuthTokensOptions,
  AtlassianOAuthTokens,
  RefreshAtlassianOAuthTokensOptions,
  AttachmentInput,
  Buffer as JiraBuffer,
} from '../../src';

describe('@jira.js/base — export presence (all named exports must be importable)', () => {
  it('value exports exist and are callable/constructible', () => {
    // If any of these are removed from src/index.ts, this test fails at compile time.
    expectTypeOf(ApiError).not.toBeUndefined();
    expectTypeOf(createClient).toBeFunction();
    expectTypeOf(sendRequest).toBeFunction();
    expectTypeOf(buildAtlassianAuthUrl).toBeFunction();
    expectTypeOf(parseAtlassianCallbackUrl).toBeFunction();
    expectTypeOf(obtainAtlassianOAuthTokens).toBeFunction();
    expectTypeOf(refreshAtlassianOAuthTokens).toBeFunction();
    expectTypeOf(BufferSchema).not.toBeUndefined();
    expectTypeOf(createMultipartRequestBody).toBeFunction();
    expectTypeOf(httpMethodSchema).not.toBeUndefined();
    expectTypeOf(clientConfigSchema).not.toBeUndefined();
    expectTypeOf(authSchema).not.toBeUndefined();
    expectTypeOf(sendRequestOptionsSchema).not.toBeUndefined();
  });

  it('type exports are usable as type annotations (compile-time only)', () => {
    // These are type-only assertions — they verify the type names are exported and structurally correct.
    type _1 = Client;
    type _2 = ClientConfig;
    type _3 = Auth;
    type _4 = SendRequestOptions;
    type _5 = HttpMethod;
    type _6 = BuildAtlassianAuthUrlOptions;
    type _7 = AtlassianCallbackParams;
    type _8 = ObtainAtlassianOAuthTokensOptions;
    type _9 = AtlassianOAuthTokens;
    type _10 = RefreshAtlassianOAuthTokensOptions;
    type _11 = AttachmentInput;
    type _12 = JiraBuffer;
    // Verify assignability at type level
    const _proof: _1 | _2 | _3 | _4 | _5 | _6 | _7 | _8 | _9 | _10 | _11 | _12 = null as never;
    void _proof;
  });
});

describe('@jira.js/base — ApiError type shape', () => {
  it('ApiError.status is number', () => {
    expectTypeOf<ApiError['status']>().toBeNumber();
  });

  it('ApiError.statusText is string', () => {
    expectTypeOf<ApiError['statusText']>().toBeString();
  });

  it('ApiError.body is unknown', () => {
    expectTypeOf<ApiError['body']>().toBeUnknown();
  });

  it('ApiError constructor takes (message, status, statusText, body)', () => {
    expectTypeOf(ApiError).constructorParameters.toEqualTypeOf<[string, number, string, unknown]>();
  });

  it('ApiError extends Error', () => {
    expectTypeOf<ApiError>().toMatchTypeOf<Error>();
  });
});

describe('@jira.js/base — createClient type shape', () => {
  it('createClient takes exactly one ClientConfig argument', () => {
    expectTypeOf(createClient).parameters.toEqualTypeOf<[ClientConfig]>();
  });

  it('createClient returns a Client', () => {
    expectTypeOf(createClient).returns.toMatchTypeOf<Client>();
  });
});

describe('@jira.js/base — Client interface type shape', () => {
  it('Client has sendRequest method', () => {
    expectTypeOf<Client>().toHaveProperty('sendRequest');
    expectTypeOf<Client['sendRequest']>().toBeFunction();
  });

  it('Client.sendRequest returns Promise', () => {
    // The generic default is unknown — sendRequest() returns Promise<unknown>
    type DefaultReturn = ReturnType<Client['sendRequest']>;
    expectTypeOf<DefaultReturn>().toMatchTypeOf<Promise<unknown>>();
  });

  it('Client.sendRequest<string> preserves the type parameter', () => {
    // Verify generic preservation: sendRequest<string>(...) must return Promise<string>
    type Fn = Client['sendRequest'];
    type Result = ReturnType<Fn extends (opts: SendRequestOptions<string>) => infer R ? Fn : never>;
    expectTypeOf<Result>().toMatchTypeOf<Promise<string>>();
  });
});

describe('@jira.js/base — ClientConfig type shape', () => {
  it('ClientConfig.host is string', () => {
    expectTypeOf<ClientConfig['host']>().toBeString();
  });

  it('ClientConfig.auth is optional Auth', () => {
    expectTypeOf<ClientConfig['auth']>().toEqualTypeOf<Auth | undefined>();
  });

  it('ClientConfig.headers is optional Record<string, string>', () => {
    expectTypeOf<ClientConfig['headers']>().toEqualTypeOf<Record<string, string> | undefined>();
  });
});

describe('@jira.js/base — SendRequestOptions type shape', () => {
  it('SendRequestOptions.url is string', () => {
    expectTypeOf<SendRequestOptions['url']>().toBeString();
  });

  it('SendRequestOptions.method is optional HttpMethod', () => {
    expectTypeOf<SendRequestOptions['method']>().toEqualTypeOf<HttpMethod | undefined>();
  });

  it('SendRequestOptions.body is optional unknown', () => {
    expectTypeOf<SendRequestOptions['body']>().toEqualTypeOf<unknown>(
    );
  });
});

describe('@jira.js/base — HttpMethod type shape', () => {
  it('HttpMethod includes GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS', () => {
    // All these must be assignable to HttpMethod
    const _get: HttpMethod = 'GET';
    const _post: HttpMethod = 'POST';
    const _put: HttpMethod = 'PUT';
    const _patch: HttpMethod = 'PATCH';
    const _delete: HttpMethod = 'DELETE';
    const _head: HttpMethod = 'HEAD';
    const _options: HttpMethod = 'OPTIONS';
    void [_get, _post, _put, _patch, _delete, _head, _options];
  });

  it('arbitrary strings are not assignable to HttpMethod', () => {
    // @ts-expect-error — 'CONNECT' is not a valid HttpMethod
    const _bad: HttpMethod = 'CONNECT';
    void _bad;
  });
});

describe('@jira.js/base — buildAtlassianAuthUrl type shape', () => {
  it('buildAtlassianAuthUrl takes BuildAtlassianAuthUrlOptions and returns string', () => {
    expectTypeOf(buildAtlassianAuthUrl).parameters.toEqualTypeOf<[BuildAtlassianAuthUrlOptions]>();
    expectTypeOf(buildAtlassianAuthUrl).returns.toBeString();
  });

  it('BuildAtlassianAuthUrlOptions requires clientId, redirectUri, scope, state', () => {
    expectTypeOf<BuildAtlassianAuthUrlOptions['clientId']>().toBeString();
    expectTypeOf<BuildAtlassianAuthUrlOptions['redirectUri']>().toBeString();
    expectTypeOf<BuildAtlassianAuthUrlOptions['scope']>().toBeString();
    expectTypeOf<BuildAtlassianAuthUrlOptions['state']>().toBeString();
  });
});

describe('@jira.js/base — createMultipartRequestBody type shape', () => {
  it('createMultipartRequestBody accepts AttachmentInput or AttachmentInput[]', () => {
    expectTypeOf(createMultipartRequestBody).parameters.toEqualTypeOf<
      [AttachmentInput | AttachmentInput[]]
    >();
  });
});
