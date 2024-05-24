import type { CustomerRequestAction } from './customerRequestAction.js';

export interface CustomerRequestActions {
  addAttachment?: CustomerRequestAction;
  addComment?: CustomerRequestAction;
  addParticipant?: CustomerRequestAction;
  removeParticipant?: CustomerRequestAction;
}
