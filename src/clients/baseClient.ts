/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client } from './client';
import type { Config } from '../config';
import { ConfigSchema } from '../config';
import { getAuthenticationToken } from '../services/authenticationService';
import type { Request } from '../request';
import { ZodError } from 'zod';

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

    // console.log('content-type', contentType);

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

    // console.log(url.toString());
    // console.log(config);

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

      throw new Error(JSON.stringify(json));
    }

    const errorMessage = await response.text();

    console.error(response.status);
    console.error(response.statusText);

    throw new Error(errorMessage);
  }

  // handleSuccessResponse<T>(response: any): T {
  //   this.config.middlewares?.onResponse?.(response.data);
  //
  //   return response;
  // }
  //
  // handleFailedResponse(e: unknown): JiraError {
  //   const err = this.buildErrorHandlingResponse(e);
  //
  //   this.config.middlewares?.onError?.(err);
  //
  //   return err;
  // }
  //
  // private buildErrorHandlingResponse(e: unknown): JiraError {
  //   if (axios.isAxiosError(e) && e.response) {
  //     return new HttpException(
  //       {
  //         code: e.code,
  //         message: e.message,
  //         data: e.response.data,
  //         status: e.response.status,
  //         statusText: e.response.statusText,
  //       },
  //       e.response.status,
  //       { cause: e },
  //     );
  //   }
  //
  //   if (axios.isAxiosError(e)) {
  //     return e;
  //   }
  //
  //   if (isObject(e) && isObject((e as Record<string, any>).response)) {
  //     return new HttpException((e as Record<string, any>).response);
  //   }
  //
  //   if (e instanceof Error) {
  //     return new HttpException(e);
  //   }
  //
  //   return new HttpException('Unknown error occurred.', 500, { cause: e });
  // }

  private prepareBodyPayload(request: Request) {
    let body: string | Blob | FormData | undefined = request.body;
    let contentType: string | undefined = undefined;

    if (request.body instanceof FormData) {
      body = request.body;
    } else if (request.body instanceof Blob) {
      body = request.body;
      contentType = request.body.type || 'application/octet-stream';
    } else if (typeof request.body === 'object') {
      body = JSON.stringify(request.body);
      contentType = 'application/json';
    } else if (typeof request.body === 'string') {
      body = request.body;
      contentType = 'text/plain';
    } else if (request.body instanceof URLSearchParams) {
      body = request.body.toString();
      contentType = 'application/x-www-form-urlencoded';
    }

    return {
      body,
      contentType,
    };
  }
}
