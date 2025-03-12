import type { CustomerRequestAction } from './customerRequestAction';

export interface CustomerRequestActions {
  addAttachment?: CustomerRequestAction;
  addComment?: CustomerRequestAction;
  addParticipant?: CustomerRequestAction;
  removeParticipant?: CustomerRequestAction;
}
