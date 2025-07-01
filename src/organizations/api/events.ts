import type { Client } from '../interfaces';

export class Events {
  constructor(private readonly client: Client) {}

  async getAuditLogEvents() {}

  async pollAuditLogEvents() {}

  async getEvent() {}

  async getEvents() {}
}
