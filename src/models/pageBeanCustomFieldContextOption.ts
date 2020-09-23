import { CustomFieldContextOption } from './customFieldContextOption';

export interface PageBeanCustomFieldContextOption {
  self: string;
  nextPage: string;
  maxResults: number;
  startAt: number;
  total: number;
  isLast: boolean;
  values: CustomFieldContextOption[];
}
