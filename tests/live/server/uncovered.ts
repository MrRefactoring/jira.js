import type { Uncovered } from '../../../scripts/lib/liveCoverage.ts';

export const UNCOVERED: Uncovered[] = [
  {
    endpoint: 'GET /api/2/customFields/{customFieldId}/options',
    reason: 'Needs a custom field of a type that has options, and Data Center has no REST endpoint that adds one.',
  },
  {
    endpoint: 'GET /api/2/customFieldOption/{id}',
    reason: 'An option id belongs to a custom field of a type that has options, which no REST endpoint creates.',
  },
  {
    endpoint: 'GET /api/2/dashboard/{dashboardId}/items/{itemId}/properties',
    reason: 'A dashboard item is a gadget, and Data Center exposes no REST endpoint that puts a gadget on a dashboard.',
  },
  {
    endpoint: 'GET /api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}',
    reason: 'Same as the property-keys endpoint beside it: no gadget can be created, so no item id exists.',
  },
  {
    endpoint: 'PUT /api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}',
    reason: 'Same as the reads: there is no item to hang a property on.',
  },
  {
    endpoint: 'DELETE /api/2/dashboard/{dashboardId}/items/{itemId}/properties/{propertyKey}',
    reason: 'Same as the reads: there is no item to hang a property on.',
  },
  {
    endpoint: 'GET /api/2/securitylevel/{id}',
    reason: 'Needs an issue security scheme with levels, which Data Center only lets an administrator create in the UI.',
  },
];
