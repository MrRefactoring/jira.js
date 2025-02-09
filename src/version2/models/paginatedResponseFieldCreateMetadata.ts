import { FieldCreateMetadata } from './fieldCreateMetadata';

export interface PaginatedResponseFieldCreateMetadata {
  maxResults?: number;
  results?: FieldCreateMetadata[];
  startAt?: number;
  total?: number;
}
