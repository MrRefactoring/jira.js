import { Directory, Domains, Events, Groups, Organizations, Policies, Users, Workspaces } from './api';
import { type Config, ConfigSchema } from './config';
import type { Client, Request } from './interfaces';
import type { z, ZodSchema } from 'zod';

export class OrganizationsClient implements Client {
  directory = new Directory();
  domains = new Domains();
  events = new Events();
  groups = new Groups();
  organizations = new Organizations(this);
  policies = new Policies();
  users = new Users(this);
  workspaces = new Workspaces();

  private readonly baseUrl = 'https://api.atlassian.com/admin';
  readonly #config: Config;

  constructor(config: Config) {
    this.#config = ConfigSchema.parse(config);
  }

  async sendRequest<T extends ZodSchema>(request: Request, mapper: T): Promise<z.infer<T>> {
    const url = this.buildUrl(request.url);

    const headers = {
      Authorization: `Bearer ${this.#config.accessToken}`,
    };

    const response = await fetch(url, {
      method: request.method,
      headers: headers,
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    const json = await response.json();

    return mapper.parse(json);
  }

  private buildUrl(...pathSegments: string[]): URL {
    const url = new URL(this.baseUrl);

    for (const segment of pathSegments) {
      const cleanSegment = segment.replace(/^\/+|\/+$/g, '');

      if (cleanSegment) {
        url.pathname = `${url.pathname}/${cleanSegment}`.replace(/\/+/g, '/');
      }
    }

    return url;
  }
}
