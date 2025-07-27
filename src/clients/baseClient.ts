/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from './client';
import type { Config } from '../config';
import { ConfigSchema } from '../config';
import { getAuthenticationToken } from '../services/authenticationService';
import type { Request } from '../request';
import { ZodError } from 'zod';
import { HttpException } from './httpException';

const STRICT_GDPR_FLAG = 'x-atlassian-force-account-id';
const ATLASSIAN_TOKEN_CHECK_FLAG = 'X-Atlassian-Token';
const ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE = 'no-check';

export class BaseClient extends Client {
  constructor(protected readonly config: Config) {
    super();

    try {
      this.config = ConfigSchema.parse(config);
    } catch (e) {
      if (e instanceof ZodError && e.errors[0].message === 'Invalid url') {
        throw new Error(
          'Couldn\'t parse the host URL. Perhaps you forgot to add \'http://\' or \'https://\' at the beginning of the URL?',
        );
      }

      throw e;
    }
  }

  protected paramSerializer(parameters: Record<string, any>): string {
    const parts: string[] = [];

    Object.entries(parameters).forEach(([key, value]) => {
      if (value === null || typeof value === 'undefined') {
        return;
      }

      if (Array.isArray(value)) {
        value = value.join(',');
      }

      if (value instanceof Date) {
        value = value.toISOString();
      } else if (value !== null && typeof value === 'object') {
        value = JSON.stringify(value);
      } else if (value instanceof Function) {
        const part = value();

        return part && parts.push(part);
      }

      parts.push(`${this.encode(key)}=${this.encode(value)}`);
    });

    return parts.join('&');
  }

  protected encode(value: string) {
    return encodeURIComponent(value)
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, '+')
      .replace(/%5B/gi, '[')
      .replace(/%5D/gi, ']');
  }

  protected removeUndefinedProperties(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj).reduce<Record<string, any>>((acc, [key, value]) => {
      if (value !== undefined) {
        acc[key] = value;
      }

      return acc;
    }, {});
  }

  async sendRequestWithRawResponse(request: Request): Promise<Response> {
    const url = new URL(request.url, this.config.host);

    url.search = this.paramSerializer(request.query ?? {});

    const { body, contentType } = this.prepareBodyPayload(request);

    const config: RequestInit = {
      method: request.method,
      headers: this.removeUndefinedProperties({
        [STRICT_GDPR_FLAG]: this.config.strictGDPR,
        [ATLASSIAN_TOKEN_CHECK_FLAG]: this.config.noCheckAtlassianToken
          ? ATLASSIAN_TOKEN_CHECK_NOCHECK_VALUE
          : undefined,
        Authorization: await getAuthenticationToken(this.config.authentication),
        'Content-Type': contentType,
        ...request.headers,
      }),
      body,
    };

    const response = await fetch(url, config);

    if (!response.ok) {
      await this.handleApiError(response);
    }

    return response;
  }

  private async handleApiError(response: Response) {
    const contentType = response.headers.get('content-type') || '';

    if (contentType.includes('application/json')) {
      const json = await response.json();

      throw new HttpException(json, response.status, { description: response.statusText });
    }

    const errorMessage = await response.text();

    throw new Error(errorMessage);
  }

  private prepareBodyPayload(request: Request): { body: BodyInit | null | undefined; contentType: string | undefined } {
    let body: BodyInit | object | undefined | null = request.body;
    let contentType: string | undefined = request.headers?.['Content-Type'] ?? request.headers?.['content-type'];

    if (request.body instanceof FormData) {
      body = request.body;
    } else if (request.body instanceof Blob) {
      body = request.body;
      contentType = request.body.type || 'application/octet-stream';
    } else if (request.body instanceof ArrayBuffer || ArrayBuffer.isView(request.body)) {
      body = request.body instanceof ArrayBuffer ? request.body : request.body.buffer;
      contentType = contentType || 'application/octet-stream';
    } else if (typeof request.body === 'object') {
      body = JSON.stringify(request.body);
      contentType = 'application/json';
    } else if (typeof request.body === 'string') {
      body = request.body;
      contentType = 'text/plain';
    }

    return {
      body,
      contentType,
    } as { body: BodyInit | null | undefined; contentType: string };
  }
}
