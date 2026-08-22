import { CurrentUserSchema, type CurrentUser } from '../models/currentUser';
import { AuthSuccessSchema, type AuthSuccess } from '../models/authSuccess';
import type { Login } from '../parameters/login';
import type { Client, RequestOptions, SendRequestOptions } from '#/core';

/**
 * Returns information about the currently authenticated user's session. If the caller is not authenticated they will
 * get a 401 Unauthorized status code.
 */
export async function currentUser(client: Client, options?: RequestOptions): Promise<CurrentUser> {
  const config: SendRequestOptions<CurrentUser> = {
    url: '/rest/auth/1/session',
    method: 'GET',
    schema: CurrentUserSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/**
 * Creates a new session for a user in Jira. Once a session has been successfully created it can be used to access any
 * of Jira's remote APIs and also the web UI by passing the appropriate HTTP Cookie header. Note that it is generally
 * preferrable to use HTTP BASIC authentication with the REST API. However, this resource may be used to mimic the
 * behaviour of Jira's log-in page (e.g. to display log-in errors to a user).
 */
export async function login(client: Client, parameters: Login, options?: RequestOptions): Promise<AuthSuccess> {
  const config: SendRequestOptions<AuthSuccess> = {
    url: '/rest/auth/1/session',
    method: 'POST',
    body: {
      password: parameters.password,
      username: parameters.username,
    },
    schema: AuthSuccessSchema,
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}

/** Logs the current user out of Jira, destroying the existing session, if any. */
export async function logout(client: Client, options?: RequestOptions): Promise<void> {
  const config: SendRequestOptions<void> = {
    url: '/rest/auth/1/session',
    method: 'DELETE',
    signal: options?.signal,
  };

  return await client.sendRequest(config);
}
